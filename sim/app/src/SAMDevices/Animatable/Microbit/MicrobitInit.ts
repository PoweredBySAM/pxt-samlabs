import Controller from "./Controller";
import VirtualController from "./VirtualController";
import Microbit from "../Microbit/Microbit";

interface IMicrobitInit {
  id: string;
  Controller: any;
  VirtualController: any;
  VirtualInteractionComponent: any;

  meta: {
    hue: string;
    description: string;
    bluetooth: boolean;
  };
}
const MicrobitInit: IMicrobitInit = {
  id: "Microbit",
  Controller: Controller,
  VirtualController: VirtualController,
  VirtualInteractionComponent: Microbit,
  meta: {
    hue: "#08d0c4",
    description:
      "A light that can flash, stay on, dim, or cycle through any colour.",
    bluetooth: true,
  },
};

export default MicrobitInit;
