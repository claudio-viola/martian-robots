import * as robotLogic from '../logic/robot_logic';

const commands = {
  "R": robotLogic.rotateRight,
  "L": robotLogic.rotateLeft,
  "F": robotLogic.moveForward
  // additional commands..
};


export default commands;
