const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it('constructor sets position and default values for mode and generatorWatts.', function() {
    let rover = new Rover(98382);
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110)
  })

  it('response returned by receiveMessage contains name of message', function() {
    let rover = new Rover();
    let testCommands = [new Command("STATUS_CHECK")];
    let testMessage = new Message('Test message', testCommands);
    expect(rover.receiveMessage(testMessage).message).toEqual("Test message")
  })

  it('response returned by receiveMessage includes two results if two commands are sent in the message', function() {
    let rover = new Rover(20);
    let testCommands = [new Command('MOVE', 20), new Command("STATUS_CHECK")];
    let testMessage = new Message('Test message', testCommands);
    let testResponse = rover.receiveMessage(testMessage);
    expect(testResponse.results.length).toEqual(2)
  })

  it('responds correctly to status check command', function() {
    let rover = new Rover(20);
    let testCommands = [new Command("STATUS_CHECK")];
    let testMessage = new Message('Test message', testCommands);
    let testResponse = rover.receiveMessage(testMessage);
    expect(testResponse.results).toEqual([{completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 20}}])
  })

  it('responds correctly to mode change command', function() {
    let rover = new Rover(20);
    let testCommands = [new Command("MODE_CHANGE", 'LOW_POWER')];
    let testMessage = new Message('Test message', testCommands);
    let testResponse = rover.receiveMessage(testMessage);
    expect(testResponse.results).toEqual([{completed: true}]);
    expect(rover.mode).toEqual('LOW_POWER')
  })

  it('responds with false completed value when attempting to move in LOW_POWER mode', function() {
    let rover = new Rover(20);
    rover.mode = 'LOW_POWER';
    let testCommands = [new Command('MOVE', 20)]
    let testMessage = new Message('Test message', testCommands);
    let testResponse = rover.receiveMessage(testMessage);
    expect(testResponse.results).toEqual([{completed: false}]);
  })

  it('responds with position for move command', function() {
    let rover = new Rover(10);
    let testCommands = [new Command('MOVE', 20)]
    let testMessage = new Message('Test message', testCommands);
    rover.receiveMessage(testMessage);
    expect(rover.position).toEqual(20);
  })


});


