import Controller from "./Controller";
import BaseController from "src/Utils/Controllers/BaseController";
import VirtualController from "src/Utils/Controllers/VirtualController";
import Button from "./Button";
// import VirtualInteraction from './VirtualInteraction'

interface IButtonInit {
  id: string;
  Controller: any;
  VirtualController: any;
  VirtualInteractionComponent: any;

  meta: {
    hue: string;
    description: string;
    bluetooth: boolean;
    possibleStates: string[];
    defaultState: string;
    eventLog: {
      name: string;
      event: string;
    }[];
    sensorData: {
      items: {
        title: string;
        subscribeInfo: {
          fn: string;
          events: string[];
        };
      }[];
    }[];
  };
}

const ButtonInit: IButtonInit = {
  id: "Button",
  Controller: Controller(BaseController),
  VirtualController: Controller(VirtualController),
  VirtualInteractionComponent: Button,
  meta: {
    hue: "#08d0c4",
    description:
      "Make a tune on a Buzzer, turn it to a smart doorbell or build an instant pizza button.",
    bluetooth: true,
    possibleStates: ["pressed", "released"],
    defaultState: "released",
    eventLog: [
      {
        name: "Pressed",
        event: "pressed",
      },
      {
        name: "Released",
        event: "released",
      },
    ],
    sensorData: [
      {
        items: [
          {
            title: "Pressed",
            subscribeInfo: {
              fn: "getIsPressed",
              events: ["pressed", "released"],
            },
          },
        ],
      },
    ],
  },
};
export default ButtonInit;
