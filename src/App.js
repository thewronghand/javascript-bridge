const BridgeGameController = require('./controller/BridgeGameController');

class App {
  play() {
    new BridgeGameController();
  }
}

module.exports = App;
const app = new App();
app.play();
