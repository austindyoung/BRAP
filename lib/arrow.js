(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Arrow = Asteroids.Arrow = function (options) {
    this.dimension = options.dimension;
    this.side = options.side;
    this.orientation = options.orientation;
    this.color = options.color;
    this.game = options.game;
    this.width = options.width;
  };

  Arrow.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.rect(
      this.pos()[0], this.pos[1], this.dimOrWidth(0), this.dimOrWidth(1)
    );
    ctx.fill();
  };

})();
