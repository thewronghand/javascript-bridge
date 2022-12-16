const { Console } = require('@woowacourse/mission-utils');
const { MESSAGE } = require('../util/constant/message');

const InputView = {
  readBridgeSize(callback) {
    Console.readLine(MESSAGE.readBridgeSize, (input) => {
      callback(input);
    });
  },

  readMoving(callback) {
    Console.readLine(MESSAGE.readMove, (input) => {
      callback(input);
    });
  },

  readGameCommand(callback) {
    Console.readLine(MESSAGE.readCommand, (input) => {
      callback(input);
    });
  },
};

module.exports = InputView;
