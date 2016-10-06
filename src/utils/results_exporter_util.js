import fs from 'fs';
import config from 'config';

const IS_LOST = 'LOST';

export function writeResults(results) {
  const outputFile =  `${config.get('instructions.output')}`;
  fs.truncateSync(outputFile);
  results.forEach(result => {
    const lineOutput = `${result.x} ${result.y} ${result.o}${result.isLost?` ${IS_LOST}`:''}`;
    console.log(lineOutput);
    fs.appendFileSync(outputFile, `${lineOutput}\n`);
  });
  console.log('Results saved to: ', outputFile);
}
