const { KEY } = require('./value');
const { NUMBER } = require('./number');

const ERROR = {
  invalidSize: `[ERROR] 유효한 숫자를 입력해주세요. 입력값은 ${NUMBER.minBridgeSize} ~ ${NUMBER.maxBridgeSize} 사이의 자연수여야 합니다.`,
  invalidMove: `[ERROR] 유효한 키를 입력해주세요. 입력값은 ${KEY.up}, ${KEY.down}만 허용됩니다.`,
  invalidCommand: `[ERROR] 유효한 키를 입력해주세요. 입력값은 ${KEY.retry}, ${KEY.quit}만 허용됩니다.`,
};

const MESSAGE = {
  gameStart: '다리 건너기 게임을 시작합니다.',
  readBridgeSize: '다리의 길이를 입력해주세요.\n',
  readMove: `이동할 칸을 선택해주세요. (위: ${KEY.up}, 아래: ${KEY.down})\n`,
  readCommand: `게임을 다시 시도할지 여부를 입력해주세요. (재시도: ${KEY.retry}, 종료: ${KEY.quit})\n`,
  gameResultAnnouncement: '최종 게임 결과',
  gameResultSuccessFail: '\n게임 성공 여부: ',
  gameResultTrialCount: '총 시도한 횟수: ',
};

module.exports = { ERROR, MESSAGE };
