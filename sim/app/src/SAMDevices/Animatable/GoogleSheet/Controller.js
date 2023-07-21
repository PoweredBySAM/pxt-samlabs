import BaseController from "./BaseController";
import {
  GCP_APP_ID,
  GCP_CLIENT_ID,
  GCP_SHEETS_API_KEY,
  SHEETS_DISCOVERY_DOCS,
} from "./gcpConfig";
import {
  A1ToColumnIndex,
  cleanValues,
  getRange,
  validateValues,
  ignoreRangeError,
  getEnsureValueRange,
  validateColumn,
  validateRow,
  validateSheet,
} from "./utilities";

// TODO Object for get query params is duplicated
// TODO improve error handling, error handling code is duplicated
// TODO duplicate json in Blocks.js for the useSheetName dropdown

class Controller extends BaseController {
  constructor(appManager) {
    super(appManager, {
      type: "SPREADSHEETS",
      apiKey: GCP_SHEETS_API_KEY,
      clientId: GCP_CLIENT_ID,
      appId: GCP_APP_ID,
      discoveryDocs: SHEETS_DISCOVERY_DOCS,
    });

    this._appManager = appManager;
    this._dismissAlert;
    this._client;
    this._resetCounter = 1;
    this._requestInFlight = false;
    this._requestQueue = [];
  }

  // Called when program execution stops.
  reset = () => {
    this._resetCounter++;
    this._requestInFlight = false;
    this._requestQueue = [];
    if (this._dismissAlert) {
      this._dismissAlert();
      this._dismissAlert = null;
    }
  };

  _addToQueue = (method, params, parseResponse, callback, handleError) => {
    this._requestQueue.push({
      method: method,
      params: params,
      parseResponse: parseResponse,
      callback: callback,
      handleError: handleError,
    });

    this._processQueueItem();
  };

  _processQueueItem = () => {
    if (this._requestInFlight) return;
    if (this._requestQueue.length === 0) return;

    this._requestInFlight = true;
    var request = this._requestQueue.shift();
    var currentResetCounter = this._resetCounter;

    request
      .method(...request.params)
      .then((response) => {
        // If the reset counter has been updated, don't do anything..
        if (currentResetCounter !== this._resetCounter) return;

        if (this._dismissAlert) {
          this._dismissAlert();
          this._dismissAlert = null;
        }

        try {
          request.callback(
            undefined,
            request.parseResponse && request.parseResponse(response)
          );
        } catch (err) {
          console.error(err);
        }
        this._requestInFlight = false;
        this._processQueueItem();
      })
      .catch((err) => {
        // If the reset counter has been updated, don't do anything..
        if (currentResetCounter !== this._resetCounter) return;

        // If the quota has been reached, wait a second and try again.
        if (err.status === 429) {
          if (!this._dismissAlert) {
            this._dismissAlert = this._appManager.viewStore.createAlert(
              "Google Sheets quota exceeded. Will keep retrying..."
            );
          }

          this._requestQueue.unshift(request);
          setTimeout(() => {
            this._requestInFlight = false;
            this._processQueueItem();
          }, 1000);
        } else {
          request.handleError(err, request.callback);
        }

        this._requestInFlight = false;
        this._processQueueItem();
      });
  };

  _ensureConnected = (callback) => {
    if (!this._isConnected) {
      this._client = undefined;
      callback(new Error("No spreadsheet connected"));

      return false;
    }

    this._client = window.gapi.client.sheets;

    return true;
  };

  _buildError = (message, value) => {
    var err;

    try {
      err = new Error(message + JSON.stringify(value));
    } catch (e) {
      err = new Error(message + value);
    }

    return err;
  };

  _handleError = (defaultError) => (err, callback) => {
    if (!err) {
      callback();
    } else if (err.status === 404) {
      var error = new Error(this._name + " is not available");
      error.goToTop = true;
      callback(error);
    } else {
      try {
        var errorMessage = err.result.error.message;

        // TODO I don't like using a regex to determine the sheet name here,
        // but it will work for now.
        if (errorMessage.startsWith("Unable to parse range")) {
          var sheetName = errorMessage.match(/'(.*)'!/)[1];
          var e = new Error('Unable to find sheet: "' + sheetName + '"');
          e.goToTop = true;
          callback(e);
        } else {
          callback(new Error(err.result.error.message));
        }
      } catch (e) {
        callback(defaultError);
      }
    }
  };

  _renameSheet = (sheetId, newName, callback) => {
    if (!this._ensureConnected(callback)) return;

    this._addToQueue(
      this._client.spreadsheets.batchUpdate,
      [
        {
          spreadsheetId: this._id,
        },
        {
          requests: [
            {
              updateSheetProperties: {
                properties: {
                  sheetId: sheetId,
                  title: newName,
                },
                fields: "title",
              },
            },
          ],
        },
      ],
      null,
      callback,
      this._handleError(new Error("Unable to update name of sheet name"))
    );
  };

  _getSheets = (callback) => {
    this._addToQueue(
      this._client.spreadsheets.get,
      [
        {
          spreadsheetId: this._id,
        },
      ],
      (response) => {
        var sheets = response.result.sheets;

        return sheets;
      },
      callback,
      this._handleError(new Error("Reading from " + this._name + " failed."))
    );
  };

  copySheet = (sheetToCopy, newName, callback) => {
    if (!this._ensureConnected(callback)) return;
    if (!validateSheet(sheetToCopy, false))
      return callback(new Error("Sheet name to copy must be text"));
    if (!validateSheet(newName, true))
      return callback(new Error("Name of copied sheet must be text"));

    // We allow sheet names to be numbers, but here we're going to call toLowerCase on them,
    // so we need to make sure they're strings.
    // If sheetToCopy is undefined, that means we copy the first visible sheet.
    if (sheetToCopy !== undefined) sheetToCopy += "";
    newName += "";

    var getSheetIdAndEnsureUniqueCopyName = (sheetName, newName, callback) => {
      this._getSheets((err, sheets) => {
        if (err)
          return callback(
            err.goToTop
              ? err
              : new Error('Unable to get index of sheet "' + sheetName + '"')
          );

        var existingNewName = sheets.find(
          (sheet) =>
            sheet.properties.title.toLowerCase() === newName.toLowerCase()
        );

        if (existingNewName)
          return callback(
            new Error('Sheet name "' + newName + '" is already taken.')
          );

        var matchingSheet;
        if (sheetToCopy === undefined) {
          matchingSheet = sheets.find((sheet) => !sheet.properties.hidden);
        } else {
          matchingSheet = sheets.find(
            (sheet) =>
              sheet.properties.title.toLowerCase() === sheetName.toLowerCase()
          );
        }

        callback(
          undefined,
          matchingSheet ? matchingSheet.properties.sheetId : -1
        );
      });
    };

    getSheetIdAndEnsureUniqueCopyName(sheetToCopy, newName, (err, id) => {
      if (err) return callback(err);
      if (id === -1)
        return callback(
          new Error('Unable to find sheet named "' + sheetToCopy + '"')
        );

      this._addToQueue(
        this._client.spreadsheets.sheets.copyTo,
        [
          {
            spreadsheetId: this._id,
            sheetId: id,
          },
          {
            destinationSpreadsheetId: this._id,
          },
        ],
        (response) => response,
        (err, response) => {
          if (err) return callback(err);
          this._renameSheet(response.result.sheetId, newName, (err) => {
            callback(
              err
                ? new Error('Copying sheet "' + sheetToCopy + '" failed')
                : undefined
            );
          });
        },
        this._handleError(
          new Error('Copying sheet "' + sheetToCopy + '" failed')
        )
      );
    });
  };

  getSheetNames = (visibleOnly, callback) => {
    if (!this._ensureConnected(callback)) return;

    this._getSheets((err, sheets) => {
      if (err) return callback(err);

      if (visibleOnly) {
        sheets = sheets.filter((sheet) => !sheet.properties.hidden);
      }

      callback(
        undefined,
        sheets.map((sheet) => sheet.properties.title)
      );
    });
  };

  getCell = (row, col, sheet, callback) => {
    if (!validateRow(row, true))
      return callback(this._buildError("Invalid row provided: ", row));
    if (!validateColumn(col, true))
      return callback(this._buildError("Invalid column provided: ", col));
    if (!validateSheet(sheet, false))
      return callback(this._buildError("Invalid sheet provided: ", sheet));
    if (!this._ensureConnected(callback)) return;

    var rangeStart = {
      row: row,
      col: col,
    };

    var range = getRange(rangeStart, rangeStart, sheet);

    this._addToQueue(
      this._client.spreadsheets.values.get,
      [
        {
          spreadsheetId: this._id,
          range: range,
        },
        {
          valueRenderOption: "UNFORMATTED_VALUE",
          dateTimeRenderOption: "FORMATTED_STRING",
        },
      ],
      (response) => {
        var value;

        try {
          value = response.result.values[0][0];
        } catch (err) {
          value = "";
        }

        return value;
      },
      callback,
      this._handleError(new Error("Reading from " + this._name + " failed."))
    );
  };

  getFullRow = (row, sheet, callback) => {
    if (!validateRow(row, true))
      return callback(this._buildError("Invalid row provided: ", row));
    if (!validateSheet(sheet, false))
      return callback(this._buildError("Invalid sheet provided: ", sheet));
    this.getRowRange(row, undefined, undefined, sheet, callback);
  };

  getFullColumn = (col, sheet, callback) => {
    if (!validateColumn(col, true))
      return callback(this._buildError("Invalid column provided: ", col));
    if (!validateSheet(sheet, false))
      return callback(this._buildError("Invalid sheet provided: ", sheet));
    this.getColumnRange(col, undefined, undefined, sheet, callback);
  };

  getRowRange = (row, colStart, colEnd, sheet, callback) => {
    if (!validateRow(row, true))
      return callback(this._buildError("Invalid row provided: ", row));
    if (!validateColumn(colStart, false))
      return callback(
        this._buildError("Invalid start column provided: ", colStart)
      );
    if (!validateColumn(colEnd, false))
      return callback(
        this._buildError("Invalid end column provided: ", colEnd)
      );
    if (!validateSheet(sheet, false))
      return callback(this._buildError("Invalid sheet provided: ", sheet));
    if (!this._ensureConnected(callback)) return;

    var rangeStart = {
      row: row,
      col: colStart,
    };

    var rangeEnd = {
      row: row,
      col: colEnd,
    };

    var range = getRange(rangeStart, rangeEnd, sheet);

    this._addToQueue(
      this._client.spreadsheets.values.get,
      [
        {
          spreadsheetId: this._id,
          range: range,
        },
        {
          valueRenderOption: "UNFORMATTED_VALUE",
          dateTimeRenderOption: "FORMATTED_STRING",
        },
      ],
      (response) => {
        response.result.values = response.result.values || [[]];

        return response.result.values[0];
      },
      callback,
      this._handleError(new Error("Reading from " + this._name + " failed."))
    );
  };

  getColumnRange = (col, rowStart, rowEnd, sheet, callback) => {
    if (!validateColumn(col, true))
      return callback(this._buildError("Invalid column provided: ", col));
    if (!validateRow(rowStart, false))
      return callback(
        this._buildError("Invalid start row provided: ", rowStart)
      );
    if (!validateRow(rowEnd, false))
      return callback(this._buildError("Invalid end row provided: ", rowEnd));
    if (!validateSheet(sheet, false))
      return callback(this._buildError("Invalid sheet provided: ", sheet));
    if (!this._ensureConnected(callback)) return;

    var rangeStart = {
      col: col,
      row: rowStart,
    };

    var rangeEnd = {
      col: col,
      row: rowEnd,
    };

    var range = getRange(rangeStart, rangeEnd, sheet);

    this._addToQueue(
      this._client.spreadsheets.values.get,
      [
        {
          spreadsheetId: this._id,
          range: range,
        },
        {
          valueRenderOption: "UNFORMATTED_VALUE",
          dateTimeRenderOption: "FORMATTED_STRING",
        },
      ],
      (response) => {
        response.result.values = response.result.values || [];

        return response.result.values.map((row) => row[0]);
      },
      callback,
      this._handleError(new Error("Reading from " + this._name + " failed."))
    );
  };

  appendRow = (col, row, sheet, values, callback) => {
    if (!validateColumn(col, true))
      return callback(this._buildError("Invalid column provided: ", col));
    if (!validateRow(row, true))
      return callback(this._buildError("Invalid row provided: ", row));
    if (!validateSheet(sheet, false))
      return callback(this._buildError("Invalid sheet provided: ", sheet));
    if (!this._ensureConnected(callback)) return;
    values = cleanValues(values);
    if (!validateValues(values, callback)) return;

    var rangeStart = {
      col: col,
      row: row,
    };

    var rangeEnd = {
      col: col,
      row: row,
    };

    var range = getRange(rangeStart, rangeEnd, sheet);

    this._addToQueue(
      this._client.spreadsheets.values.append,
      [
        {
          spreadsheetId: this._id,
          range: range,
          valueInputOption: "USER_ENTERED",
        },
        {
          values: [values],
        },
      ],
      null,
      callback,
      this._handleError(new Error("Writing to " + this._name + " failed."))
    );
  };

  setCell = (col, row, sheet, value, callback) => {
    if (!validateColumn(col, true))
      return callback(this._buildError("Invalid column provided: ", col));
    if (!validateRow(row, true))
      return callback(this._buildError("Invalid row provided: ", row));
    if (!validateSheet(sheet, false))
      return callback(this._buildError("Invalid sheet provided: ", sheet));
    if (!this._ensureConnected(callback)) return;
    this._setRowRange(row, col, sheet, [value], (err) => {
      if (err) {
        callback(err.goToTop ? err : new Error("Unable to set cell"));
      } else {
        callback();
      }
    });
  };

  setRow = (row, sheet, values, callback) => {
    if (!validateRow(row, true))
      return callback(this._buildError("Invalid row provided: ", row));
    if (!validateSheet(sheet, false))
      return callback(this._buildError("Invalid sheet provided: ", sheet));
    this.setRowRange(row, undefined, sheet, values, callback);
  };

  setColumn = (col, sheet, values, callback) => {
    if (!validateColumn(col, true))
      return callback(this._buildError("Invalid column provided: ", col));
    if (!validateSheet(sheet, false))
      return callback(this._buildError("Invalid sheet provided: ", sheet));
    if (!this._ensureConnected(callback)) return;
    this.setColumnRange(col, undefined, sheet, values, callback);
  };

  setRowRange = (row, colStart, sheet, values, callback) => {
    if (!validateRow(row, true))
      return callback(this._buildError("Invalid row provided: ", row));
    if (!validateColumn(colStart, false))
      return callback(
        this._buildError("Invalid start column provided: ", colStart)
      );
    if (!validateSheet(sheet, false))
      return callback(this._buildError("Invalid sheet provided: ", sheet));
    if (!this._ensureConnected(callback)) return;
    this.clearRowRange(row, colStart, undefined, sheet, (err) => {
      if (err)
        return callback(
          err.goToTop
            ? err
            : new Error("Setting row " + row + " in " + this._name + " failed.")
        );

      this._setRowRange(row, colStart, sheet, values, callback);
    });
  };

  _setRowRange = (row, colStart, sheet, values, callback) => {
    if (!this._ensureConnected(callback)) return;
    values = cleanValues(values);
    var colIndex;
    // If a colStart value is provided, use that value
    // to insert the correct amount of undefineds into the
    // values array. This is important because without it
    // the user may receive range errors.
    if (colStart) {
      colIndex = A1ToColumnIndex(colStart);
      if (isNaN(colIndex)) {
        return callback(new Error("Invalid start column"));
      }

      for (var i = 1; i < colIndex; i++) {
        values.unshift(undefined);
      }
    } else {
      // Otherwise set these default values
      colStart = "a";
      colIndex = 1;
    }

    if (!validateValues(values, callback)) return;

    var rangeStart = {
      row: row,
    };

    var rangeEnd = {
      row: row,
    };

    var range = getRange(rangeStart, rangeEnd, sheet);

    this._addToQueue(
      this._client.spreadsheets.values.batchUpdate,
      [
        {
          spreadsheetId: this._id,
        },
        {
          valueInputOption: "USER_ENTERED",
          data: [
            getEnsureValueRange(row, colStart, sheet),
            {
              range: range,
              values: [values],
            },
          ],
        },
      ],
      null,
      callback,
      this._handleError(new Error("Writing to " + this._name + " failed."))
    );
  };

  setColumnRange = (col, rowStart, sheet, values, callback) => {
    if (!validateColumn(col, true))
      return callback(this._buildError("Invalid column provided: ", col));
    if (!validateRow(rowStart, false))
      return callback(this._buildError("Invalid row provided: ", rowStart));
    if (!validateSheet(sheet, false))
      return callback(this._buildError("Invalid sheet provided: ", sheet));
    if (!this._ensureConnected(callback)) return;
    this.clearColumnRange(col, rowStart, undefined, sheet, (err) => {
      if (err)
        return callback(
          err.goToTop
            ? err
            : new Error(
                "Setting column " + col + " in " + this._name + " failed."
              )
        );

      this._setColumnRange(col, rowStart, sheet, values, callback);
    });
  };

  _setColumnRange = (col, rowStart, sheet, values, callback) => {
    if (!this._ensureConnected(callback)) return;
    values = cleanValues(values);
    // If a rowStart value is provided, use that value
    // to insert the correct amount of undefineds into the
    // values array. This is important because without it
    // the user may receive range errors.
    if (rowStart) {
      for (var i = 1; i < rowStart; i++) {
        values.unshift(undefined);
      }
    } else {
      // Otherwise set this default value
      rowStart = 1;
    }

    if (!validateValues(values, callback)) return;

    var rangeStart = {
      col: col,
    };

    var rangeEnd = {
      col: col,
    };

    var range = getRange(rangeStart, rangeEnd, sheet);

    this._addToQueue(
      this._client.spreadsheets.values.batchUpdate,
      [
        {
          spreadsheetId: this._id,
        },
        {
          valueInputOption: "USER_ENTERED",
          data: [
            getEnsureValueRange(rowStart, col, sheet),
            {
              range: range,
              values: [values],
              majorDimension: "COLUMNS",
            },
          ],
        },
      ],
      null,
      callback,
      this._handleError(new Error("Writing to " + this._name + " failed."))
    );
  };

  // TODO I think I should consider this a private method for now
  // so I don't need to deal with the logic to validate parameters...
  clearRange = (rowStart, colStart, rowEnd, colEnd, sheet, callback) => {
    if (!validateColumn(colStart, false))
      return callback(
        this._buildError("Invalid start column provided: ", colStart)
      );
    if (!validateRow(rowStart, false))
      return callback(
        this._buildError("Invalid start row provided: ", rowStart)
      );
    if (!validateColumn(colEnd, false))
      return callback(
        this._buildError("Invalid end column provided: ", colEnd)
      );
    if (!validateRow(rowEnd, false))
      return callback(this._buildError("Invalid end row provided: ", rowEnd));
    if (!validateSheet(sheet, false))
      return callback(this._buildError("Invalid sheet provided: ", sheet));
    if (!this._ensureConnected(callback)) return;

    var rangeStart = {
      col: colStart,
      row: rowStart,
    };

    var rangeEnd = {
      col: colEnd,
      row: rowEnd,
    };

    var range = getRange(rangeStart, rangeEnd, sheet);

    this._addToQueue(
      this._client.spreadsheets.values.clear,
      [
        {
          spreadsheetId: this._id,
          range: range,
        },
      ],
      null,
      callback,
      (err, callback) => {
        // Ignore range errors here, because in those
        // cases the values are already empty.
        err = ignoreRangeError(err);
        this._handleError(
          new Error("Clearing range in " + this._name + " failed.")
        )(err, callback);
      }
    );
  };

  clearRow = (row, sheet, callback) => {
    if (!validateRow(row, true))
      return callback(this._buildError("Invalid row provided: ", row));
    if (!validateSheet(sheet, false))
      return callback(this._buildError("Invalid sheet provided: ", sheet));
    this.clearRange(row, undefined, row, undefined, sheet, callback);
  };

  clearColumn = (col, sheet, callback) => {
    if (!validateColumn(col, true))
      return callback(this._buildError("Invalid column provided: ", col));
    if (!validateSheet(sheet, false))
      return callback(this._buildError("Invalid sheet provided: ", sheet));
    this.clearRange(undefined, col, undefined, col, sheet, callback);
  };

  clearRowRange = (row, colStart, colEnd, sheet, callback) => {
    if (!validateColumn(colStart, false))
      return callback(
        this._buildError("Invalid start column provided: ", colStart)
      );
    if (!validateColumn(colEnd, false))
      return callback(
        this._buildError("Invalid end column provided: ", colEnd)
      );
    if (!validateRow(row, true))
      return callback(this._buildError("Invalid row provided: ", row));
    if (!validateSheet(sheet, false))
      return callback(this._buildError("Invalid sheet provided: ", sheet));
    this.clearRange(row, colStart, row, colEnd, sheet, callback);
  };

  clearColumnRange = (col, rowStart, rowEnd, sheet, callback) => {
    if (!validateColumn(col, true))
      return callback(this._buildError("Invalid column provided: ", col));
    if (!validateRow(rowStart, false))
      return callback(
        this._buildError("Invalid start row provided: ", rowStart)
      );
    if (!validateRow(rowEnd, false))
      return callback(this._buildError("Invalid end row provided: ", rowEnd));
    if (!validateSheet(sheet, false))
      return callback(this._buildError("Invalid sheet provided: ", sheet));
    this.clearRange(rowStart, col, rowEnd, col, sheet, callback);
  };
}

export default Controller;
