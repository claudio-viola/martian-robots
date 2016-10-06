import { InvalidMarsGridsCoordinateError } from '../errors/errors';
import config from 'config';

const grid = {
  ux: config.get('mars.grid.ux'),
  uy: config.get('mars.grid.uy'),
  lx: config.get('mars.grid.lx'),
  ly: config.get('mars.grid.ly'),
  scents: new Set()
};

/**
* [setUpperRightCoordinates Sets the upper right coordinates of the grid]
* @param {[Number]} x [The x upper right coordinate]
* @param {[Number]} y [The y upper right ordinate]
*/
grid.setUpperRightCoordinates = function (x, y) {
  //max of 50 for both coordinates
  if (x > 0 && x <= config.get('mars.grid.max_x') && y > 0 && y <= config.get('mars.grid.max_y')) {
    grid.ux = x;
    grid.uy = y;
  }
  else {
    throw new InvalidMarsGridsCoordinateError(x, y);
  }
};

/**
* [hasPosition  Checks whether position is inside the grid]
* @param  {[Object]}  pos [Position object e.g. { x: 1, y: 3} ]
* @return {Boolean}     [True if position is within the grid otherwise false]
*/
grid.hasPosition = function (pos) {
  return pos.x <= grid.ux && pos.x >= grid.lx &&
  pos.y <= grid.uy && pos.y >= grid.ly;
};

/**
* [hasScent Checks whether position within the grid contains a scent]
* @param  {[Object]}  pos [Position object e.g. { x: 1, y: 3} ]
* @return {Boolean}     [description]
*/
grid.hasScent = function (pos) {
  return grid.scents.has(`${pos.x}${pos.y}${pos.o}`);
};

/**
* [leaveScent Insert a scent in the grid at position provided]
* @param  {[Object]}  pos [Position object e.g. { x: 1, y: 3} ]
* @return {[Boolean]}     [description]
*/
grid.leaveScent = function (pos) {
  if (pos.x <= config.get('mars.grid.max_x') && pos.y <= config.get('mars.grid.max_y')) {
    return grid.scents.add(`${pos.x}${pos.y}${pos.o}`);
  }
};

export default grid;
