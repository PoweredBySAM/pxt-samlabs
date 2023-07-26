import { SCOPES } from "./gcpConfig";
//
// import { promptType } from "../../ui/components/prompt/prompt";
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
function getOAuthToken() {
  return window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()
    .access_token;
}

export function loadGoogleAPI() {
  return new Promise((resolve, reject) => {
    if (window.gapi) return resolve();

    var id = "google-apis-script";

    var script = document.createElement("script");
    script.id = id;
    script.onload = function () {
      resolve();
    };
    script.onerror = function () {
      reject(new Error("No internet connection"));
    };
    script.src = "https://apis.google.com/js/api.js";

    document.head.appendChild(script);
  });
}

export function loadLibraries() {
  return new Promise((resolve, reject) => {
    window.gapi.load("client", {
      callback: () => {
        window.gapi.client.init({}).then(() => {
          console.log("gapi client loaded.");
          resolve();
        });
      },
      onerror: (err) => {
        console.error("gapi load error.", err);
        reject();
      },
      timeout: 10000,
      ontimeout: () => {
        console.error("gapi load timed out.");
        reject();
      },
    });
  });
}

export function loadGIS() {
  return new Promise((resolve, reject) => {
    const id = "GIS-google-script";
    const script = document.createElement("script");
    script.id = id;
    script.onload = function () {
      resolve();
    };
    script.onerror = function () {
      reject(new Error("No internet connection"));
    };
    script.src = "https://accounts.google.com/gsi/client";

    document.head.appendChild(script);
  });
}

// NOTE: In SAMStudio we have an option to sign in with google, so the user should always be aware of
// who they are signed in as.
// TODO the current behavior is that on the first connection attempt, if there is a logged in user
// we log them out.  This forces the user to always have to select an account from the start.
// A better approach would probably be to show the user who they are logged in as, and give them the option to signout.
// Maybe, when the user hits connect for the first time and if they are logged in, prompt them to see if they want to stay logged in.

// When a user signs out, all of their connected sheets need to be disconnected.

/**
 * Connects to a Google Drive document. This handles making sure the required google
 * libraries are downloaded, and making sure the user is signed in.
 */
export function connect(clientId, apiKey, discoveryDocs, callback = () => {}) {
  loadGoogleAPI()
    .then(loadGIS)
    .then(loadLibraries)
    .then(() => {
      // var options = {
      //   apiKey: apiKey,
      //   discoveryDocs: discoveryDocs,
      //   clientId: clientId,
      //   scope: SCOPES,
      // };
      // console.log("Google API loaded : ", window.gapi.client.init(options));
      // return window.gapi.client.init(options);
      return google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: SCOPES,
        // apiKey: apiKey,
        // discoveryDocs: discoveryDocs,
        callback: (resp) => {
          console.log(resp, "111111");
          if (resp.error !== undefined) {
            throw resp;
          }
        },
      });
    })
    .then((resp) => {
      console.log(google.accounts, "22222 accounts");
      console.log(resp, "33333 resp");
      // var authInstance = window.gapi.auth2.getAuthInstance();
      //
      // console.log("authInstance", authInstance);
      //
      // if (!authInstance.isSignedIn.get()) {
      //   return authInstance.signIn({
      //     prompt: "select_account",
      //   });
      // }
    })
    .then(() =>
      callback(
        undefined,
        window.gapi.auth2.getAuthInstance().currentUser.get().getId()
      )
    )
    .catch(callback);
}

export function showPicker(type, appId, callback) {
  var picker = new window.google.picker.PickerBuilder()
    .addView(window.google.picker.ViewId[type])
    .setOAuthToken(getOAuthToken())
    .setAppId(appId)
    .setCallback((result) => {
      // It is important to dispose the picker when we are done with it.
      // It isn't documented anywhere, but if we don't dispose the picker
      // Blockly will crash when it is next injected.
      if (
        result[window.google.picker.Response.ACTION] ===
        window.google.picker.Action.PICKED
      ) {
        picker.dispose();
        var doc = result.docs[0];
        if (!doc) return callback();
        // For some reason, adding the spreadsheet view lets a user select a form.
        // Because of this, I need to make sure that the user really did select a spreadsheet.
        if (
          type === "SPREADSHEETS" &&
          doc.mimeType !== "application/vnd.google-apps.spreadsheet"
        ) {
          var error = new Error("A spreadsheet must be selected.");
          error.displayToUser = true;

          return callback(error);
        }

        callback(undefined, doc);
      } else if (
        result[window.google.picker.Response.ACTION] ===
        window.google.picker.Action.CANCEL
      ) {
        picker.dispose();
        callback();
      }
    })
    .build();

  picker.setVisible(true);

  return () => picker.dispose();
}

export function showNewOrExisting(appManager, type, callback) {
  appManager.addPrompt(
    {
      message: "New Or Existing Spreadsheet",
      type: "SELECT",
      options: [
        {
          label: "New Spreadsheet",
          value: "new",
        },
        {
          label: "Existing Spreadsheet",
          value: "existing",
        },
      ],
    },
    callback
  );
}

export function showCreateNew(appManager, type, callback) {
  appManager.addPrompt(
    {
      message: "Create New Spreadsheet",
      type: "TEXT",
      placeholder: "Spreadsheet Name",
    },
    callback
  );
}

export function createEntity(name, type, callback) {
  // TODO switch on type
  window.gapi.client.sheets.spreadsheets
    .create(
      {},
      {
        properties: {
          title: name,
        },
      }
    )
    .then((response) => {
      callback(undefined, {
        id: response.result.spreadsheetId,
        url: response.result.spreadsheetUrl,
        name: name,
      });
    })
    .catch((err) => {
      callback(new Error("Failed to create new spreadsheet"));
    });
}

export function validateColumn(col, required) {
  if (typeof col === "undefined" && !required) return true;
  if (typeof col !== "string") return false;
  if (!/^[a-zA-Z]+$/.test(col)) return false;

  return true;
}

export function validateRow(row, required) {
  if (typeof row === "undefined" && !required) return true;
  if (!Number.isInteger(row)) return false;
  if (row < 1) return false;

  return true;
}

export function validateSheet(sheet, required) {
  if (typeof sheet === "undefined" && !required) return true;

  return typeof sheet === "string" || typeof sheet === "number";
}

export function getRange(start, end, sheet) {
  var range = "";
  if (sheet) range += "'" + sheet + "'" + "!";
  if (start.col) range += start.col;
  if (start.row) range += start.row;
  if (end) {
    range += ":";
    if (end.col) range += end.col;
    if (end.row) range += end.row;
  }

  return range;
}

export function validateValues(values, callback) {
  if (!Array.isArray(values)) values = [values];

  var invalidValue = values.find((v) => typeof v === "object");

  if (invalidValue) {
    callback(new Error("Invalid values provided"));

    return false;
  }

  return true;
}

export function cleanValues(values) {
  if (!Array.isArray(values)) values = [values];

  return values.map((v) => (v === undefined || v === null ? "" : v));
}

export function A1ToColumnIndex(A1) {
  var finalIndex = 0;
  var error = !!A1.split("")
    .reverse()
    .find((value, index) => {
      var alphabetIndex = alphabet.findIndex(
        (letter) => letter.toLowerCase() === value.toLowerCase()
      );

      if (alphabetIndex === -1) return true;

      finalIndex += (alphabetIndex + 1) * Math.pow(alphabet.length, index);
    });

  if (error) return NaN;

  return finalIndex;
}

export function ignoreRangeError(err) {
  try {
    if (err.result.error.message.startsWith("Range")) err = null;
  } catch (err) {
    // no-op
  }

  return err;
}

export function getEnsureValueRange(cellRow, cellCol, sheet) {
  if (!validateColumn(cellCol, true))
    throw new Error("Invalid cell column provided to getEnsureValueRange");
  if (!validateRow(cellRow))
    throw new Error("Invalid cell row provided to getEnsureValueRange");

  var colIndex = A1ToColumnIndex(cellCol);

  var ensureRangeStart = {
    row: 1,
    col: "a",
  };

  var ensureRangeEnd = {
    row: cellRow,
    col: cellCol,
  };

  var ensureRange = getRange(ensureRangeStart, ensureRangeEnd, sheet);

  var ensureValues = new Array(cellRow).fill(undefined);
  ensureValues = ensureValues.map(() =>
    new Array(colIndex || 0).fill(undefined)
  );
  ensureValues[cellRow - 1][colIndex - 1] = "";

  return {
    range: ensureRange,
    values: ensureValues,
  };
}
