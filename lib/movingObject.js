(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();

    if (this.angle || this.angle === 0) {

ctx.beginPath();
ctx.arc(this.pos[0], this.pos[1], this.radius, this.angle, this.angle + Math.PI / 2, false);
ctx.closePath();
ctx.lineWidth = 5;
ctx.fillStyle = "#8663A4"

ctx.fill();
ctx.lineWidth = 1;
ctx.strokeStyle = '#003300';
  ctx.stroke();

ctx.beginPath();
ctx.arc(this.pos[0], this.pos[1], this.radius, this.angle + Math.PI / 2, this.angle + 2 * Math.PI, false);
ctx.closePath();
ctx.lineWidth = 5;
ctx.fillStyle = "#E1ACB5";
ctx.lineWidth = 1;
ctx.strokeStyle = '#003300';
  ctx.stroke();

ctx.fill();

    } else {
      ctx.arc(
        this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI , true
      );
      ctx.fill();
    }

  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var centerDist = Asteroids.Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius)
  };

  MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.move = function () {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        var mapTo = this.game.mapToWall(this.pos);
        if (this.game.isClockwise(this.pos) && !this.game.isParallelMapping(this.pos)) {
          var velY = this.vel[1];
          this.vel[1] = -this.vel[0];
          this.vel[0] = velY;
          if (this.game.getsInverted(mapTo)) {
            this.vel[(mapTo + 1) % 2] = -this.vel[(mapTo + 1) % 2]
          }
        } else if (!this.game.isParallelMapping(this.pos)) {
        var velX = this.vel[0];
        this.vel[0] = -this.vel[1];
        this.vel[1] = velX;

        if (this.game.getsInverted(mapTo)) {
          this.vel[(mapTo + 1) % 2] = -this.vel[(mapTo + 1) % 2]
        }
      }
      else if (this.game.getsInverted(mapTo)) {
        this.vel[(mapTo + 1) % 2] = -this.vel[(mapTo + 1) % 2]
      }
      this.pos = this.game.wrap(this.pos);
      } else {
        this.remove();
      }
    }
  };

  MovingObject.prototype.remove = function () {
    this.game.remove(this);
  };
})();
