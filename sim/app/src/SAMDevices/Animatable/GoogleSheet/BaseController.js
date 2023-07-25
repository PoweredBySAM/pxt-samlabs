import EventEmitter from "event-emitter";
import {
  loadGoogleAPI,
  connect,
  showPicker,
  showNewOrExisting,
  showCreateNew,
  createEntity,
  loadGIS,
  loadLibraries,
} from "./utilities";
import { SCOPES } from "src/SAMDevices/Animatable/GoogleSheet/gcpConfig";

export default class BaseController extends EventEmitter {
  constructor(appManager, initOptions) {
    super();
    this.initGapi();
    this._appManager = appManager;
    this._type = initOptions.type;
    this._clientId = initOptions.clientId;
    this._apiKey = initOptions.apiKey;
    this._appId = initOptions.appId;
    this._discoveryDocs = initOptions.discoveryDocs;
    this._initOptions = initOptions;
    this._isConnected = false;
    this._isConnecting = false;
    this._name;
    this._id;
    this._url;
    this._currentUserListenerRemove;
    this._cancelConnection;
    this._gisTokenClient = null;
    this._isSignedIn = false;
  }

  getMeta = () => ({
    url: this._url,
    name: this._name,
  });

  initGapi = () => {
    loadGoogleAPI()
      .then(loadGIS)
      .then(loadLibraries)
      .then(() => {
        this._gisTokenClient = google.accounts.oauth2.initTokenClient({
          client_id: this._clientId,
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
        this._isSignedIn = !!window.gapi.client.getToken();
        console.log(this._isSignedIn, "this._isSignedIn");
      })
      .then((resp) => {
        console.log(google.accounts, "22222 accounts");
        console.log(resp, "33333 resp");
        resp.requestAccessToken({ prompt: "" });
      });
  };

  connect = (callback) => {
    if (window.cordova) {
      const err = new Error("Google Sheets is unavailable on iOS.");
      err.displayToUser = true;

      return callback(err);
    }

    if (this._isConnected || this._isConnecting) return callback();

    this.emit("connecting");
    this._isConnecting = true;

    // connect(
    //   this._clientId,
    //   this._apiKey,
    //   this._discoveryDocs,
    //   (err, userId) => {
    // if (err || !userId) {
    //   if (!err) err = null;
    //   else if (err.error === "popup_closed_by_user") err = null;
    //   else if (err.message === "popup_closed_by_user") err = null;
    //   else if (err.message === "access_denied") err = null;
    //   else if (err.error === "popup_blocked_by_browser") {
    //     err = new Error(
    //       "Your pop up blocker stopped your log in. Please try again. If this continues, click to allow at the top of the page or in your browser settings."
    //     );
    //     err.displayToUser = true;
    //   }
    //   this.disconnect();
    //
    //   return callback(err || new Error("No userId"));
    // }

    // this._userId = userId;
    //
    // this._currentUserListenerRemove = window.gapi.auth2
    //   .getAuthInstance()
    //   .currentUser.listen((user) => {
    //     if (user.getId() !== this._userId || !user.isSignedIn()) {
    //       if (this._cancelConnection) this._cancelConnection();
    //       else this.disconnect();
    //     }
    //   }).remove;

    // this._cancelConnection = showNewOrExisting(
    //   this._appManager,
    //   this._type,
    //   (newOrExisting) => {
    //     if (newOrExisting === "existing") {
    //       this._cancelConnection = showPicker(
    //         this._type,
    //         this._appId,
    //         (err, doc) => {
    //           if (err) {
    //             this.disconnect();
    //
    //             return callback(err);
    //           }
    //
    //           this._onDocSelected(doc, callback);
    //         }
    //       );
    //     } else if (newOrExisting === "new") {
    //       this._cancelConnection = showCreateNew(
    //         this._appManager,
    //         this._type,
    //         (name) => {
    //           if (!name) {
    //             this.disconnect();
    //             callback();
    //           } else {
    //             createEntity(name, this._type, (err, doc) => {
    //               if (err) {
    //                 this.disconnect();
    //
    //                 return callback(err);
    //               }
    //
    //               this._onDocSelected(doc, callback);
    //             });
    //           }
    //         }
    //       );
    //     } else {
    //       this.disconnect();
    //       callback();
    //     }
    //   }
    // );
  };

  disconnect = () => {
    this._name = undefined;
    this._id = undefined;
    this._url = undefined;
    this._isConnected = false;
    this._isConnecting = false;
    this._userId = undefined;
    this._currentUserListenerRemove && this._currentUserListenerRemove();
    this._cancelConnection && this._cancelConnection();
    this._currentUserListenerRemove = undefined;
    this._cancelConnection = undefined;
    this.emit("disconnected");
  };

  _onDocSelected = (doc, callback) => {
    if (doc) {
      this._name = doc.name;
      this._url = doc.url;
      this._id = doc.id;
      this._isConnected = true;
      this._isConnecting = false;
      this._cancelConnection = undefined;
      this.emit("connected");
      callback();
    } else {
      this.disconnect();
      callback();
    }
  };
}
