import * as robotController from './controller/robot_controller';
import { readInstructionsFromFile } from './utils/instructions_reader_util';
import { writeResults } from './utils/results_exporter_util';
import grid from './mars/grid';
import config from 'config';

let inputFilename = `${config.get('instructions.input')}`;
const args = process.argv;
if (args.indexOf('-i') > -1) {
  inputFilename = process.argv[args.indexOf('-i') + 1];
}
console.log('**********************');
console.log('Reading Input in', inputFilename);
readInstructionsFromFile(inputFilename)
.then(input => {
  grid.setUpperRightCoordinates(input.gridUpperRightCoordinates.x, input.gridUpperRightCoordinates.y);
  const results = robotController.executeAllInstructions(input.robotsInstructions);
  console.log('**********************');
  console.log('RESULTS');

  writeResults(results);
  console.log('**********************');
  console.log('Scents', grid.scents);
})
.catch(err => {
  console.log('Something went wrong', err);
});
