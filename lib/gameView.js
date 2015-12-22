(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.timerId = null;
  };

  GameView.prototype.moves = function () {
      return {"w": [0, -5],
      "a": [-5, 0],
      "s": [0, 5],
      "d": [ 5,  0],
      }
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;
    var self = this;
    Object.keys(self.moves()).forEach(function (k) {
      var move = self.moves()[k];
      key(k, function () { ship.power(move); });
      key(".", function () { ship.rotate(Math.PI / 16) });
    });

  };

  GameView.prototype.start = function () {
    var gameView = this;
    gameView.bindKeyHandlers();
    var ship = this.ship;
    this.timerId = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
      }, 1000 / Asteroids.Game.FPS
    );
  };


  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };
})();
