import { expect } from 'chai';
import { describe, it, afterEach, beforeEach } from 'mocha';
import simple from 'simple-mock';
import proxyquire from 'proxyquire';

describe('Robot Controller', () => {

  let robotCommands;
  let marsGrid;
  let robotController;

  beforeEach(done => {

    //we are stubbing all the object attributes
    robotCommands = {
      "F": simple.stub(),
      "R": simple.stub(),
      "L": simple.stub()
    };
    marsGrid = {
      hasPosition: simple.stub(),
      leaveScent: simple.stub(),
      setUpperRightCoordinates: simple.stub()
    };

    robotController = proxyquire
    .noCallThru()
    .load('../../../src/controller/robot_controller', {
      '../mars/grid': marsGrid,
      '../commands/commands': robotCommands
    });
    done();
  });

  afterEach(done => {
    simple.restore();
    done();
  });


  describe('executeInstructions', () => {

    it('execute a list of instructions', (done) => {
      try {
        const input = {
          inst: "LF",
          initialPos: { x: 0, y: 3, o: "W" }
        };
        const expected = {
          x: 1,
          y: 1,
          o: "W"
        };
        const mockRotateLeftPosition = {
          x: 1,
          y: 2,
          o: "W"
        };
        robotCommands.L.returnWith(mockRotateLeftPosition);
        robotCommands.F.returnWith(expected);
        marsGrid.hasPosition.returnWith(true);
        marsGrid.hasPosition.returnWith(true);

        const newPos = robotController.executeInstructions(input);
        expect(robotCommands.L.callCount).to.equal(1);
        expect(robotCommands.L.firstCall.args[0]).to.deep.equal(input.initialPos);
        expect(robotCommands.F.callCount).to.equal(1);
        expect(robotCommands.F.firstCall.args[0]).to.deep.equal(mockRotateLeftPosition);
        expect(marsGrid.hasPosition).to.be.called;
        expect(marsGrid.hasPosition.firstCall.args[0]).to.deep.equal(input.initialPos);
        expect(marsGrid.hasPosition.calls[1].args[0]).to.deep.equal(mockRotateLeftPosition);
        expect(marsGrid.leaveScent).to.not.be.called;

        expect(newPos).to.deep.equal(expected);
        done();
      }
      catch (err) {
        done(err);
      }

    });

  });

});
