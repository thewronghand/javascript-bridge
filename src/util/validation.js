const { NUMBER } = require('./constant/number');
const { KEY } = require('./constant/value');

const validate = {
  size(input) {
    const size = Number(input);
    if (isNaN(size) || size === undefined || !Number.isInteger(size)) {
      throw new Error();
    }
    if (size < NUMBER.minBridgeSize || size > NUMBER.maxBridgeSize) {
      throw new Error();
    }
  },

  move(input) {
    if (input !== KEY.up && input !== KEY.down) {
      throw new Error();
    }
  },

  command(input) {
    if (input !== KEY.retry && input !== KEY.quit) {
      throw new Error();
    }
  },
};

module.exports = validate;
