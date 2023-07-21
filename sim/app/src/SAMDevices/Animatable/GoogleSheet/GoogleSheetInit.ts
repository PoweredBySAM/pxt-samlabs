import Controller from "./Controller";
import GoogleSheet from "./GoogleSheet";

interface IGoogleSheetInit {
  id: string;
  Controller: any;
  VirtualInteractionComponent: any;
  VirtualController: any;
  meta: {
    hue: string;
    description: string;
    bluetooth: boolean;
  };
}

const GoogleSheetInit: IGoogleSheetInit = {
  id: "GoogleSheet",
  Controller: Controller,
  VirtualController: Controller,
  VirtualInteractionComponent: GoogleSheet,
  meta: {
    hue: "#08d0c4",
    description: "Read from and write to Google Sheets",
    bluetooth: false,
  },
};
export default GoogleSheetInit;
