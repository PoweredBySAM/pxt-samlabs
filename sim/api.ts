/// <reference path="../libs/core/enums.d.ts"/>

async function delay<T>(duration: number, value: T | Promise<T>): Promise<T>;
async function delay(duration: number): Promise<void>;
async function delay<T>(duration: number, value?: T | Promise<T>): Promise<T> {
  // eslint-disable-next-line
  const output = await value;
  await new Promise<void>((resolve) => setTimeout(() => resolve(), duration));
  return output;
}

// namespace pxsim.hare {
//     /**
//      * This is hop
//      */
//     //% blockId="sampleHop" block="hop %hop on color %color=colorNumberPicker"
//     //% hop.fieldEditor="gridpicker"
//     export function hop(hop: Hop, color: number) {

//     }

//     //% blockId=sampleOnLand block="on land"
//     //% optionalVariableArgs
//     export function onLand(handler: (height: number, more: number, most: number) => void) {

//     }
// }

// namespace pxsim.turtle {
//     /**
//      * Moves the sprite forward
//      * @param steps number of steps to move, eg: 1
//      */
//     //% weight=90
//     //% blockId=sampleForward block="forward %steps"
//     export function forwardAsync(steps: number) {
//         return board().sprite.forwardAsync(steps)
//     }

//     /**
//      * Moves the sprite forward
//      * @param direction the direction to turn, eg: Direction.Left
//      * @param angle degrees to turn, eg:90
//      */
//     //% weight=85
//     //% blockId=sampleTurn block="turn %direction|by %angle degrees"
//     //% angle.min=-180 angle.max=180
//     export function turnAsync(direction: Direction, angle: number) {
//         let b = board();

//         if (direction == Direction.Left)
//             b.sprite.angle -= angle;
//         else
//             b.sprite.angle += angle;
//         return delay(400)
//     }

//     /**
//      * Triggers when the turtle bumps a wall
//      * @param handler
//      */
//     //% blockId=onBump block="on bump"
//     export function onBump(handler: RefAction) {
//         let b = board();

//         b.bus.listen("Turtle", "Bump", handler);
//     }
// }

namespace pxsim.loops {
  // /**
  //  * Repeats the code forever in the background. On each iteration, allows other code to run.
  //  * @param body the code to repeat
  //  */
  // //% help=functions/forever weight=55 blockGap=8
  // //% blockId=device_forever block="forever"
  // export function forever(body: RefAction): void {
  //     thread.forever(body)
  // }

  /**
   * Pause for the specified time in milliseconds
   * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
   */
  //% help=functions/pause weight=54
  //% block="pause (ms) %pause" blockId=device_pause
  export function pauseAsync(ms: number) {
    return delay(ms);
  }
}

function logMsg(m: string) {
  console.log(m, "msg in api.ts");
}

namespace pxsim.console {
  /**
   * Print out message
   */
  //%
  export function log(msg: string, testString?: string) {
    logMsg("CONSOLE: " + msg + " " + testString);
    // why doesn't that work?
    board().writeSerial(msg + "\n");
  }
}

namespace pxsim {
  /**
   * A ghost on the screen.
   */
  //%
  export class Sprite {
    /**
     * The X-coordiante
     */
    //%
    public x = 100;
    /**
     * The Y-coordiante
     */
    //%
    public y = 100;
    public angle = 90;

    constructor() {}

    private foobar() {}

    /**
     * Move the thing forward
     */
    //%
    public forwardAsync(steps: number) {
      let deg = (this.angle / 180) * Math.PI;
      this.x += Math.cos(deg) * steps * 10;
      this.y += Math.sin(deg) * steps * 10;
      board().updateView();

      if (this.x < 0 || this.y < 0) board().bus.queue("TURTLE", "BUMP");

      return delay(400);
    }
  }

  export enum MotorProperties {
    Speed = "speed",
    Direction = "direction",
    // Add more properties as required
  }
}
// namespace pxsim.sprites {
//     /**
//      * Creates a new sprite
//      */
//     //% blockId="sampleCreate" block="createSprite"
//     export function createSprite(): Sprite {
//         return new Sprite();
//     }
// }

namespace samlabs {
  export enum samSimEvents {
    TOSIM_EDITOR_GOT_CONSOLE_LOG = "TOSIM_EDITOR_GOT_CONSOLE_LOG",
    FROMSIM_EDITOR_GOT_PROMOPT = "FROMSIM_EDITOR_GOT_PROMOPT",
    TOSIM_EDITOR_GENERAL_STORE_CREATED = "TOSIM_EDITOR_GENERAL_STORE_CREATED",
    TOSIM_DEVICE_VALUE_CHANGED = "TOSIM_DEVICE_VALUE_CHANGED",
    TOSIM_DEVICE_CREATED = "TOSIM_EDITOR_DEVICE_CREATED",
    FROMSIM_DEVICE_VALUE_CHANGED = "FROMSIM_DEVICE_VALUE_CHANGED",
  }
  export class SimulatorQueue {
    private items: any[];
    constructor() {
      this.items = [];
    }

    enqueue(element: string) {
      this.items.push(element);
    }

    dequeue() {
      if (this.isEmpty()) throw "Underflow";
      return this.items.shift();
    }

    isEmpty() {
      return this.items.length === 0;
    }

    peek() {
      if (this.isEmpty()) throw "No elements in Queue";
      return this.items[0];
    }
  }

  export class WindowEventService {
    private static instance: WindowEventService;

    private constructor() {}

    sendEvent(eventName: any, payload: any) {
      const event = new CustomEvent(eventName, {
        detail: { ...payload },
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
    }

    receiveEvent(eventName: any, callback: (detail?: any) => void) {
      window.addEventListener(eventName, (event: CustomEvent) => {
        callback(event);
      });
    }

    public static getInstance(): WindowEventService {
      if (!WindowEventService.instance) {
        WindowEventService.instance = new WindowEventService();
      }
      return WindowEventService.instance;
    }
  }
  export function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        let r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
  export function hexColorFromCode(colorCode: number) {
    switch (colorCode) {
      case 1:
        return "#FF0000"; // Red
      case 2:
        return "#00FF00"; // Green
      case 3:
        return "#0000FF"; // Blue
      case 4:
        return "#FFFF00"; // Yellow
      case 5:
        return "#FFA500"; // Orange
      case 6:
        return "#800080"; // Purple
      case 7:
        return "#FFFFFF"; // White
      case 8:
        return "#000000"; // Black
      default:
        return "#ffffff";
    }
  }
  export function buildEventName(eventName: string, deviceId: string) {
    return `${eventName}_${deviceId}`;
  }
  export class SamSimDataService {
    private devicesKey: string = "sam_devices_state";
    public static instance: SamSimDataService;

    private constructor() {}

    public static getInstance(): SamSimDataService {
      if (!SamSimDataService.instance) {
        SamSimDataService.instance = new SamSimDataService();
      }
      return SamSimDataService.instance;
    }

    private loadDevices(): Array<any> {
      const devices = localStorage.getItem(this.devicesKey);
      return devices ? JSON.parse(devices) : [];
    }

    public getDeviceProps(id: string): any {
      const devices = this.loadDevices();
      return devices.find((device) => device.deviceId === id);
    }
  }
}
