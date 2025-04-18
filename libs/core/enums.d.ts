declare const enum Direction {
  //% block=left
  Left,
  //% block=right
  Right,
}



declare const enum Hop {
  //% block=short
  Short,
  //% block=long
  Long,
  //% block=silly
  Silly,
  //% block=wow
  Incredible,
  //% block="to the moon!"
  Astronomical,
}

declare const enum MicrobitButtonOptions {
  A,

  B,
}

declare const enum MicrobitAccelerometerAxisOptions {
  X,

  Y,

  Z,
}

declare const enum MicrobitPinOptions {
  P0,
  P1,
  P2,
  P3,
  P4,
  P5,
  P6,
  P7,
  P8,
  P9,
  P10,
  P11,
  P12,
  P13,
  P14,
  P15,
  P16,
}

declare const enum MicrobitAnalogPinOptions {
  P0,
  P1,
  P2,
}

declare const enum MicrobitLEDShapes {
  Heart,
  SmallHeart,
  Yes,
  No,
  Happy,
  Sad,
  Confused,
  Angry,
  Asleep,
  Surprised,
  Silly,
  Fabulous,
  Meh,
  TShirt,
  Rollerskate,
  Duck,
  House,
  Tortoise,
  Butterfly,
  StickFigure,
  Ghost,
  Sword,
  Giraffe,
  Skull,
  Umbrella,
  Snake,
}
declare const enum samLedColors {
Red=1,
Green=2,
Blue=3,
Yellow=4,
Orange=5,
Purple=6,
White=7,
Black=8,
}

declare const enum NumberFormat {
  Int8LE = 1,
  UInt8LE = 2,
  Int16LE = 3,
  UInt16LE = 4,
  Int32LE = 5,
  Int8BE = 6,
  UInt8BE = 7,
  Int16BE = 8,
  UInt16BE = 9,
  Int32BE = 10,

  UInt32LE = 11,
  UInt32BE = 12,
  Float32LE = 13,
  Float64LE = 14,
  Float32BE = 15,
  Float64BE = 16,
  }
