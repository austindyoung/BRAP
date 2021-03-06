(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {};

  // Normalize the length of the vector to 1, maintaining direction.
  var dir = Util.dir = function (vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  };

  var dotProduct = Util.dotProduct = function (v, w) {
    return v[0] * w[0] + v[1] * w[1];
  }

  var reboundVelocity = Util.reboundVelocity = function (v, w, p, q) {
    var posDiff = Util.diff(p, q)
    return Util.diff(v, Util.scale(posDiff, Util.dotProduct(Util.diff(v, w), posDiff) / (Util.norm(posDiff) * Util.norm(posDiff))))
  }

  var sum = Util.sum = function (v, w) {
    return [v[0] + w[0], v[1] + w[1]]
  }

  var diff = Util.diff = function (v, w) {
    return [v[0] - w[0], v[1] - w[1]]
  }

  // Find distance between two points.
  var dist = Util.dist = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

  // Find the length of the vector.
  var norm = Util.norm = function (vec) {
    return Util.dist([0, 0], vec);
  };

  // Return a randomly oriented vector with the given length.
  var randomVec = Util.randomVec = function (length) {
    var deg = 2 * Math.PI * Math.random();

    return scale([Math.sin(deg), Math.cos(deg)], length);
  };

  // Scale the length of a vector by the given amount.
  var scale = Util.scale = function (vec, m) {
    return [vec[0] * m, vec[1] * m];
  };

  var angle = Util.angle = function (vec) {
    var theta = Math.abs(Math.atan(vec[1]/vec[0]))
    if (vec[0] <= 0 && vec[1] <= 0) {
      return theta;
    } else if (vec[0] >= 0 && vec[1] < 0) {
      return Math.PI - theta;
    } else if (vec[0] <= 0 && vec[1] >= 0) {
      return 2 * Math.PI - theta;
    } else {
      return Math.PI + theta;
    }
  };

  var inherits = Util.inherits = function (ChildClass, BaseClass) {
    function Surrogate () { this.constructor = ChildClass };
    Surrogate.prototype = BaseClass.prototype;
    ChildClass.prototype = new Surrogate();
  };
})();
