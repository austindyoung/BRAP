(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  function randomColor() {
    var hexDigits = "0123456789ABCDEF";

    var color = "#";
    for (var i = 0; i < 3; i ++) {
      color += hexDigits[Math.floor((Math.random() * 16))];
    }

    return color;
  }

  var Ship = Asteroids.Ship = function (options) {
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || randomColor();
    // options.angle = .5
    this.angle = 14 * Math.PI / 8;
    this.score = 0;
    this.lives = 5;

    Asteroids.MovingObject.call(this, options)
  };
// 75
// 51
  Ship.RADIUS = 51;
  // 150
  // 35
  // 50
  // 50
  // 100
  // 150

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.fireBullet = function () {
    var norm = Asteroids.Util.norm(this.vel);

    if (norm == 0) {
      // Can't fire unless moving.
      return;
    }

    var relVel = Asteroids.Util.scale(
      Asteroids.Util.dir(this.vel),
      Asteroids.Bullet.SPEED
    );

    var bulletVel = [
      relVel[0] + this.vel[0], relVel[1] + this.vel[1]
    ];

    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      vel: bulletVel,
      color: this.color,
      game: this.game
    });

    this.game.add(bullet);
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  // #E1ACB5
  // #8582AA

  Ship.prototype.relocate = function () {
    this.pos = [this.game.dimx / 8, this.game.dimy / 2];
    if (this.isCollidedWith(this.game.asteroids[0])) {
      this.pos = [7 * this.game.dimx / 8, this.game.dimy / 2];
      this.vel = [0, 0];
    }
  };

  Ship.prototype.rotate = function (rotation) {
    this.angle += rotation;
    if (this.angle > 2 * Math.PI) {
      this.angle = this.angle % (2 * Math.PI);
    }
  };
  Ship.prototype.collideWith = function (otherObject) {
    var collisionAngle = Asteroids.Util.angle(Asteroids.Util.diff(this.pos,otherObject.pos))

    if ((collisionAngle > this.angle && collisionAngle < this.angle + Math.PI / 2)) {
      this.score = this.score + (Math.floor(Asteroids.Util.norm(this.vel)) + Math.floor(Asteroids.Util.norm(otherObject.vel))) * (Math.floor(Asteroids.Util.norm(this.vel)) + Math.floor(Asteroids.Util.norm(otherObject.vel))) / 10;
      var prevVel = [this.vel[0], this.vel[1]];
      this.vel = Asteroids.Util.reboundVelocity(this.vel, otherObject.vel, this.pos, otherObject.pos);
      otherObject.vel = Asteroids.Util.reboundVelocity(otherObject.vel, prevVel, otherObject.pos, this.pos);
    } else if (this.angle >= 14 * Math.PI / 8 && (collisionAngle >= 14 * Math.PI / 8 || collisionAngle < Math.PI / 4)) {
      this.score = this.score + Math.floor(Asteroids.Util.norm(this.vel)) * Math.floor(Asteroids.Util.norm(this.vel)) / 2;
      var prevVel = [this.vel[0], this.vel[1]];
      this.vel = Asteroids.Util.reboundVelocity(this.vel, otherObject.vel, this.pos, otherObject.pos);
      otherObject.vel = Asteroids.Util.reboundVelocity(otherObject.vel, prevVel, otherObject.pos, this.pos);
    } else {
        if (this.lives === 0) {
          this.score = 0;
          this.lives = 5;
        }
        this.lives = this.lives - 1;
        this.relocate();
    };
  };
})();
