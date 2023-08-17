import Controller from "./Controller";
import BaseController from "../../../Utils/Controllers/BaseController";
import VirtualController from "../../../Utils/Controllers/VirtualController";
import Tilt from "./Tilt";
import TiltDevice from "../../../Store/TiltDevice";

interface ITiltInit {
  id: string;
  Controller: any;
  VirtualController: any;
  VirtualInteractionComponent: ({
    device,
  }: {
    device: TiltDevice;
  }) => JSX.Element;
  meta: {
    hue: string;
    description: string;
    bluetooth: boolean;
    sensorData?: {
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

const TiltInit: ITiltInit = {
  id: "Tilt",
  Controller: Controller(BaseController),
  VirtualController: Controller(VirtualController),
  VirtualInteractionComponent: Tilt,
  meta: {
    hue: "#08d0c4",
    description: "Detect motion and tell other devices how to react",
    bluetooth: true,

    sensorData: [
      {
        items: [
          {
            title: "Value",
            subscribeInfo: {
              fn: "getValue",
              events: ["valueChanged"],
            },
          },
        ],
      },
    ],
  },
};

export default TiltInit;
