const BridgeGame = require('../BridgeGame');
const { STATUS, KEY } = require('../util/constant/value');
const { ERROR } = require('../util/constant/message');
const InputView = require('../view/InputView');
const OutputView = require('../view/OutputView');
const validate = require('../util/validation');
const { Console } = require('@woowacourse/mission-utils');

class BridgeGameController {
  #inputView;
  #outputView;

  constructor() {
    this.#inputView = InputView;
    this.#outputView = OutputView;
    this.initiate();
  }

  initiate() {
    this.#outputView.printStart();
    this.readUserInputSize();
  }

  readUserInputSize() {
    this.#inputView.readBridgeSize((input) => {
      this.#handleSizeException(input);
    });
  }

  readUserInputMove(game) {
    this.#inputView.readMoving((input) => {
      this.#handleMoveException(input, game);
    });
  }

  readUserInputCommand(game) {
    this.#inputView.readGameCommand((input) => {
      this.#handleCommandException(input, game);
    });
  }

  #handleSizeException(input) {
    try {
      validate.size(input);
      const bridgeGame = new BridgeGame(input);
      this.readUserInputMove(bridgeGame);
    } catch (error) {
      this.#outputView.printError(ERROR.invalidSize);
      this.readUserInputSize();
    }
  }

  #handleMoveException(input, game) {
    try {
      validate.move(input);
      const moveResult = game.move(input);
      const [bridgeUpper, bridgeLower, status] = moveResult;
      this.#outputView.printMap(bridgeUpper, bridgeLower);
      this.#handleGameStatus(status, game);
    } catch (error) {
      this.#outputView.printError(ERROR.invalidMove);
      this.readUserInputMove(game);
    }
  }

  #handleGameStatus(status, game) {
    switch (status) {
      case STATUS.next:
        this.readUserInputMove(game);
        break;
      case STATUS.success:
        this.#outputView.printResult(game);
        Console.close();
        break;
      case STATUS.fail:
        this.readUserInputCommand(game);
    }
  }

  #handleCommandException(input, game) {
    try {
      validate.command(input);
      this.#handleGameCommand(input, game);
    } catch (error) {
      this.#outputView.printError(ERROR.invalidCommand);
      this.readUserInputCommand(game);
    }
  }

  #handleGameCommand(command, game) {
    switch (command) {
      case KEY.retry:
        game.retry();
        this.readUserInputMove(game);
        break;
      case KEY.quit:
        this.#outputView.printResult(game);
        Console.close();
    }
  }
}

module.exports = BridgeGameController;
