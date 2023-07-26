namespace pxsim.GoogleSheets {
  //% blockId="create_google_sheet" block="Create new Google Sheet"
  //% variable.defl="GoogleSheet 1"
  export function createGoogleSheets(): pxsim.GoogleSheet {
    return new pxsim.GoogleSheet();
  }
}

namespace pxsim {
  /**
   * A GoogleSheet.
   */
  //%
  export class GoogleSheet {
    gisTokenClient: any;
    isSignedIn: any;

    constructor() {
      this.initGapi();
      this.gisTokenClient = null;
      this.isSignedIn = false;
    }

    loadGoogleAPI() {
      return new Promise<void>((resolve, reject) => {
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
    loadGIS() {
      return new Promise<void>((resolve, reject) => {
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
    loadLibraries() {
      return new Promise<void>((resolve, reject) => {
        window.gapi.load("client", {
          callback: () => {
            window.gapi.client.init({}).then(() => {
              console.log("gapi client loaded.");
              resolve();
            });
          },
          onerror: (err: any) => {
            window.console.error("gapi load error.", err);
            reject();
          },
          timeout: 10000,
          ontimeout: () => {
            window.console.error("gapi load timed out.");
            reject();
          },
        });
      });
    }

    private initGapi = () => {
      this.loadGoogleAPI()
        .then(this.loadGIS)
        .then(this.loadLibraries)
        .then(() => {
          this.gisTokenClient = google.accounts.oauth2.initTokenClient({
            client_id:
              "43567632176-5rrbuhfh76mb38vinq12nlosqu1tujhg.apps.googleusercontent.com",
            scope: "https://www.googleapis.com/auth/drive.file",
            // apiKey: apiKey,
            // discoveryDocs: discoveryDocs,
            callback: (resp) => {
              window.console.log(resp, "111111");
              if (resp.error !== undefined) {
                throw resp;
              }
              this.isSignedIn = !!window.gapi.client.getToken();
            },
          });

          window.console.log(this.isSignedIn, "this.isSignedIn");
          window.console.log(this.gisTokenClient, "gisTokenClient 2");
        })
        .then(() => this.gisTokenClient.requestAccessToken({ prompt: "" }));
    };
  }
}
