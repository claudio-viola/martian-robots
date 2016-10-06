import grid from '../mars/grid';
import { InvalidRobotOrientationError } from '../errors/errors';
import d from 'debug';
const debug = d('robot_logic');

const orientation = { 0: "N", 1: "E", 2: "S", 3: "W"  };
const oMap = { "N": 0,  "E": 1, "S": 2, "W": 3  };

/**
 * [rotateRight Rotates position 90 degrees to the right]
 * @param  {[Object]}  pos [Position object e.g. { x: 1, y: 3, o: "N" } ]
 * @return {[Object]}      [Position object e.g. { x: 1, y: 3, o: "E" } ]
 */
export function rotateRight(pos) {
  debug('Rotating right', pos);
  let z = oMap[pos.o];
  z = z === 3 ? 0 : z + 1;
  return {
    o: orientation[z],
    x: pos.x,
    y: pos.y
  };
}

/**
 * [rotateLeft Rotates position 90 degrees to the left]
 * @param  {[Object]}  pos [Position object e.g. { x: 1, y: 3, o: "N" } ]
 * @return {[Object]}      [Position object e.g. { x: 1, y: 3, o: "W" } ]
 */
export function rotateLeft(pos) {
  debug('Rotating left', pos);
  let z = oMap[pos.o];
  z = z === 0 ? 3 : z - 1;
  return {
    o: orientation[z],
    x: pos.x,
    y: pos.y
  };
}
/**
 * [moveForward Moves position forward according to the orientation]
 * @param  {[Object]}  pos [Position object e.g. { x: 1, y: 3, o: "N" } ]
 * @return {[Object]}      [Position object e.g. { x: 1, y: 4, o: "N" }]
 */
export function moveForward(pos) {
  debug('Moving Forward', pos);
  if (grid.hasScent(pos)) {
    return Object.assign({}, pos);
  }
  let newy = pos.y;
  let newx = pos.x;
  if (pos.o === "N") {
    newy = pos.y + 1;
  }
  else if (pos.o === "E") {
    newx = pos.x + 1;
  }
  else if (pos.o === "S") {
    newy = pos.y - 1;
  }
  else if (pos.o === "W") {
    newx = pos.x - 1;
  }
  else {
    throw new InvalidRobotOrientationError(pos.o);
  }
  return {
    x: newx,
    y: newy,
    o: pos.o
  };
}
