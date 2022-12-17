const bridgeRandomNumberGenerator = require('./util/BridgeRandomNumberGenerator');
const bridgeMaker = require('./BridgeMaker');
const { SIGN, KEY, STATUS } = require('./util/constant/value');

class BridgeGame {
  #bridge;
  #playerAt = 0;
  #bridgeUpper = [];
  #bridgeLower = [];
  #moveResult;
  #gameStatus;
  #trialCount = 1;

  constructor(size) {
    this.#bridge = bridgeMaker.makeBridge(
      size,
      bridgeRandomNumberGenerator.generate
    );
  }

  getTrialCount() {
    return this.#trialCount;
  }

  getGameStatus() {
    return this.#gameStatus;
  }

  getBridgeForm() {
    return [this.#bridgeUpper, this.#bridgeLower];
  }

  move(input) {
    this.#checkMove(input, this.#bridge, this.#playerAt);
    this.#setBridgeForm(input);
    this.#checkGameStatus();
    return [this.#bridgeUpper, this.#bridgeLower, this.#gameStatus];
  }

  #checkMove(input, bridge, idx) {
    if (input === bridge[idx]) {
      this.#moveResult = SIGN.success;
      this.#playerAt = this.#playerAt + 1;
      return;
    }
    this.#moveResult = SIGN.fail;
  }

  #setBridgeForm(input) {
    if (input === KEY.up) {
      this.#bridgeUpper.push(this.#moveResult);
      this.#bridgeLower.push(SIGN.empty);
      return;
    }
    this.#bridgeUpper.push(SIGN.empty);
    this.#bridgeLower.push(this.#moveResult);
  }

  #checkGameStatus() {
    if (
      this.#moveResult === SIGN.success &&
      this.#playerAt === this.#bridge.length
    ) {
      this.#gameStatus = STATUS.success;
      return;
    }
    this.#checkNextFail(this.#moveResult);
  }

  #checkNextFail(moveResult) {
    switch (moveResult) {
      case SIGN.success:
        this.#gameStatus = STATUS.next;
        break;
      case SIGN.fail:
        this.#gameStatus = STATUS.fail;
    }
  }

  retry() {
    this.#trialCount = this.#trialCount + 1;
    this.#bridgeUpper = [];
    this.#bridgeLower = [];
    this.#playerAt = 0;
    this.#moveResult = undefined;
    this.#gameStatus = undefined;
  }
}

module.exports = BridgeGame;
