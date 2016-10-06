import commands from '../commands/commands';
import grid from '../mars/grid';
import { InvalidRobotPositionError } from '../errors/errors';
import config from 'config';
import d from 'debug';
const debug = d('robot_controller');

const MAX_LENGTH_INSTRUCTIONGS = config.get('instructions.max_length');

function executeCommands(args) {
  if (!grid.hasPosition(args.initialPos)) {
    throw new InvalidRobotPositionError(args.initialPos.x, args.initialPos.y);
  }
  let oldPos = Object.assign({}, args.initialPos);
  let newPos = oldPos;
  let i = 0;
  while (i  < args.inst.length && i < MAX_LENGTH_INSTRUCTIONGS) {
    const cmd = args.inst[i];
    if (commands[cmd] !== undefined) {
      const command = commands[cmd];
      newPos = command(oldPos);
      debug('oldPos:', oldPos, ' cmd:', cmd, ' newPos:', newPos);
      if (!grid.hasPosition(newPos)) {
        debug('Leaving scent at', oldPos);
        grid.leaveScent(oldPos);
        return {
          isLost: true,
          x: oldPos.x,
          y: oldPos.y,
          o: oldPos.o
        };
      }
    }
    else {
      debug('ignoring invalid Robot Instruction/Command , ', cmd);
    }
    i = i+1;
    oldPos = newPos;
  }
  return newPos;
}
/**
 * [executeInstructions Execute a list of instructions]
 * @param  {[Object]} args [ e.g. {  inst: "FLRLF", initialPos: { x: 1,y:1,o:"N" } }]
 * @return {[Object]}      [Position object after executing all instructions ]
 */
export function executeInstructions(args) {
  return executeCommands({
    initialPos: args.initialPos,
    inst: args.inst
  });
}


/**
 * [executeAllInstructions Execute all instructions]
 * @param  {[Object]} robotsInstructions[Object containing robots instructions { initialPos: { x:x,y:y}, inst:"FLFLR" }]
 * @return {[Array]}                    [Array containing  robot positions]
 */
export function executeAllInstructions(robotsInstructions)  {
  return robotsInstructions.reduce((acc, instructions) => {
    acc.push(executeInstructions(instructions));
    return acc;
  }, []);
}
