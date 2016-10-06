export class InvalidRobotOrientationError {
  constructor(orientation) {
    this.name = this.constructor.name;
    this.message = `Invalid Robot Orientation ${orientation}`;
    this.stack = (new Error()).stack;
  }
}
export class InvalidRobotPositionError {
  constructor(x, y) {
    this.name = this.constructor.name;
    this.message = `Invalid Robot Position (${x},${y})`;
    this.stack = (new Error()).stack;
  }
}

export class InvalidMarsGridsCoordinateError {
  constructor(x, y) {
    this.name = this.constructor.name;
    this.message = `Invalid Mars Upper right coordinates (${x},${y})`;
    this.stack = (new Error()).stack;
  }
}

// etc..
