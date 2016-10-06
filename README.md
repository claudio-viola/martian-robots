## Martian Robots

The surface of Mars can be modeled by a rectangular grid around which robots are able to move according to instructions provided from Earth. You are to write a program that determines each sequence of robot positions and reports the final position of the robot

### Dependencies:
- NodeJS > 0.12
- Babel (ES6 transpiler via npm)

### Using

Install dependencies
```
npm install
```

Add instructions to input.txt file

The first line of input is the upper-right coordinates of the rectangular world, the lower-left coordinates are assumed to be 0, 0.
The remaining input consists of a sequence of robot positions and instructions (two lines per robot). A position consists of two integers specifying the initial coordinates of the robot and an orientation (N, S, E, W), all separated by whitespace on one line. A robot instruction is a string of the letters “L”, “R”, and “F” on one line.
Each robot is processed sequentially, i.e., finishes executing the robot instructions before the next robot begins execution.
The maximum value for any coordinate is 50.
All instruction strings will be less than 100 characters in length
```
$ <editor> instructions/input.txt
```

Start

```
$ npm start
$ npm start -- -i pathtoinputfile 
```

See results in output file in
```
$ <editor> instructions/output.txt
```

Test
```
// unit tests
$ npm test
```
