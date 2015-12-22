(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
    options.color = Asteroid.COLOR;
    options.pos = [625, 310];
    options.radius = Asteroid.RADIUS;
    options.vel = [6, 6];
    this.radius = options.radius;

    Asteroids.MovingObject.call(this, options);
  };

  Asteroid.COLOR = "#545454";
  Asteroid.RADIUS = 40;
  if (this.radius) {
    Asteroid.RADIUS = this.radius
  };

  Asteroid.SPEED = 4;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.collideWith(this);
    } else {
      var prevVel = [this.vel[0], this.vel[1]];
      this.vel = Asteroids.Util.reboundVelocity(this.vel, otherObject.vel, this.pos, otherObject.pos);
      otherObject.vel = Asteroids.Util.reboundVelocity(otherObject.vel, prevVel, otherObject.pos, this.pos);

    }
  };
})();
