export interface Color {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface CommonProp {
  wireFrame?: boolean;
  getColor?: () => Color | undefined;
  getBatteryLevel?: () => number | undefined;
}

export interface IButton extends CommonProp {
  buttonPressed?: boolean;
}

export interface IBuzzer extends CommonProp {
  getIsActive?: () => boolean;
}

export interface IDCMotor extends CommonProp {
  getMotorSpeed?: () => number;
}
export interface IDimmer extends CommonProp {
  getValue: () => number;
}

export interface ILED extends CommonProp {
  colorIndicator?: {
    color: string;
    opacity: number;
  };
}

export interface IServo extends CommonProp {
  getPosition: () => number;
}

export interface ISlider extends CommonProp {
  getValue: () => number;
}

export interface ITilt extends CommonProp {
  getIsTilted?: () => boolean;
}
