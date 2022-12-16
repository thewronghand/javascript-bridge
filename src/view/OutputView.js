const { Console } = require('@woowacourse/mission-utils');
const { MESSAGE } = require('../util/constant/message');
const { SIGN } = require('../util/constant/value');

const OutputView = {
  /**
   * 현재까지 이동한 다리의 상태를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printMap(upperArray, lowerArray) {
    const upper = upperArray.join(SIGN.divider);
    const lower = lowerArray.join(SIGN.divider);
    const bridgeUpper = SIGN.opener.concat(upper, SIGN.closer);
    const bridgeLower = SIGN.opener.concat(lower, SIGN.closer);
    Console.print(bridgeUpper + '\n' + bridgeLower);
  },

  /**
   * 게임의 최종 결과를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printResult(game) {
    const trialCount = game.getTrialCount();
    const gameStatus = game.getGameStatus();
    const bridgeForm = game.getBridgeForm();

    Console.print(MESSAGE.gameResultAnnouncement);
    this.printMap(bridgeForm[0], bridgeForm[1]);
    Console.print(MESSAGE.gameResultSuccessFail + gameStatus);
    Console.print(MESSAGE.gameResultTrialCount + trialCount);
  },

  printStart() {
    Console.print(MESSAGE.gameStart);
  },

  printError(error) {
    Console.print(error);
  },
};

module.exports = OutputView;
