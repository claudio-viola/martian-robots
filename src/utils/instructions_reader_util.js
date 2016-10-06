import fs from 'fs';
import readline from 'readline';
import d from 'debug';
const debug = d('reader');

/**
 * [readInstructionsFromFile Reads robots instruction from file]
 * @param  {[String]} filepath [Filepath File location as string]
 * @return {[Object]}          [Returns an object representing the instructions read from the file
 * {
 *  gridUpperRightCoordinates: { x: x, y: y },
 *  robotsInstructions: [ { initialPos: {x: x,y:y,o: "N" } } ]
 * }]
 */
export function readInstructionsFromFile(filepath) {
  return new Promise((resolve) => {
    const input = {};
    input.robotsInstructions = [];

    const stream = readline.createInterface({
      input: fs.createReadStream(filepath),
      output: null
    });

    let shouldReadGridCoordinates = true;
    let shouldReadInitialPos = false;
    let robot;
    stream.on('close',  () => {
      debug('Read Input', input);
      resolve(input);
    });

    stream.on('line', (l) => {
      debug('Reading Input: ', l);
      if (l.length === 0) {
        debug('empty line, skipping');
        return;
      }
      const strs = l.split(/\s+/);
      //first line defines the grid upper/right coordinates
      if (shouldReadGridCoordinates) {
        debug('Read upper right coordinates', strs[0], strs[1] );
        input.gridUpperRightCoordinates = {
          x: parseInt(strs[0]),
          y: parseInt(strs[1])
        };
        shouldReadInitialPos = true;
        shouldReadGridCoordinates = false;
      }
      //second line represent the initial robot position
      else if (shouldReadInitialPos) {
        robot = {
          initialPos: {
            x: parseInt(strs[0]),
            y: parseInt(strs[1]),
            o: strs[2]
          }
        };
        debug('Read initial Robot position', robot.initialPos);
        shouldReadInitialPos = false;
      }
      //third line represent robot instructions/commands
      else {
        robot.inst = l;
        debug('Read Robot instructions', robot.inst);
        input.robotsInstructions.push(robot);
        shouldReadInitialPos = true;
      }
    });
  });
}
