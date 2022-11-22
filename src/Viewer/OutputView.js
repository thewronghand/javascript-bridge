const MissionUtils = require('@woowacourse/mission-utils');
const { MESSAGE, SIGN } = require('../utils/constants');

/**
 * 사용자에게 게임 진행 상황과 결과를 출력하는 역할을 한다.
 */
const OutputView = {
  printStart() {
    MissionUtils.Console.print(MESSAGE.GAME_START);
  },
  /**
   * 현재까지 이동한 다리의 상태를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printMap(upper, lower) {
    const bridgeUpper = upper.join('|');
    const bridgeLower = lower.join('|');
    const bridge = [
      SIGN.OPENER.concat(bridgeUpper, SIGN.CLOSER),
      SIGN.OPENER.concat(bridgeLower, SIGN.CLOSER)
    ];
    MissionUtils.Console.print(`${bridge[0]}\n${bridge[1]}\n`);
  },

  /**
   * 게임의 최종 결과를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printResult(game) {
    const getWin = game.getGameWin();
    const getTrialCount = game.getTrialCount();
    const getUpper = game.getBridgeUpper();
    const getLower = game.getBridgeLower();
    MissionUtils.Console.print(MESSAGE.GAME_RESULT_PRINT);
    this.printMap(getUpper, getLower);
    this.printGameResultSuccessFail(getWin, getTrialCount);
  },

  printGameResultSuccessFail(getWin, getTrialCount) {
    if (getWin === true) {
      this.printGameResultSuccess(getTrialCount);
      return;
    }
    this.printGameResultFail(getTrialCount);
  },

  printGameResultSuccess(getTrialCount) {
    MissionUtils.Console.print(MESSAGE.GAME_RESULT_SUCCESS);
    MissionUtils.Console.print(
      `${MESSAGE.TOTAL_TRIAL_NUMBERS}` + `${getTrialCount}`
    );
    MissionUtils.Console.close();
  },

  printGameResultFail(getTrialCount) {
    MissionUtils.Console.print(MESSAGE.GAME_RESULT_FAIL);
    MissionUtils.Console.print(
      `${MESSAGE.TOTAL_TRIAL_NUMBERS}` + `${getTrialCount}`
    );
    MissionUtils.Console.close();
  },

  printError(error) {
    MissionUtils.Console.print(error);
  }
};

module.exports = OutputView;
