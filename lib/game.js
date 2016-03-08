(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (ctx, numAsteroids, radius) {
      // this.wrapping = [[1,0], [0,0], [3,0], [2,0]];
    // this.wrapping = [[3,0], [2,0], [1,0], [0,0]];
    this.ctx = ctx;
    this.numAstroids = numAsteroids;
    this.radius = radius;
    this.prevNumber = -1;
    setTimeout(function () {
      this.countdown = 3
    }.bind(this),
    12000);

    setTimeout(function () {
      this.countdown = 2
    }.bind(this),
    13000);

    setTimeout(function () {
      this.countdown = 1
    }.bind(this),
    14000);

    this.wrapping = [
      [Math.floor(Math.random() * 4), Math.floor(Math.random() * 2)],
      [Math.floor(Math.random() * 4), Math.floor(Math.random() * 2)],
      [Math.floor(Math.random() * 4), Math.floor(Math.random() * 2)],
      [Math.floor(Math.random() * 4), Math.floor(Math.random() * 2)],
    ]

    this.wrapping = [[2,1], [3, 1], [0, 1], [1, 1]];

    setInterval(function () {
      this.wrapping = [[Math.floor(Math.random() * 4), Math.floor(Math.random() * 2)],
      [Math.floor(Math.random() * 4), Math.floor(Math.random() * 2)],
      [Math.floor(Math.random() * 4), Math.floor(Math.random() * 2)],
      [Math.floor(Math.random() * 4), Math.floor(Math.random() * 2)]]

      setTimeout(function () {
        this.countdown = 3;
      }.bind(this),
      12000);
      setTimeout(function () {
        this.countdown = 2;
      }.bind(this),
      13000);
      setTimeout(function () {
        this.countdown = 1;
      }.bind(this),
      14000);
    }.bind(this), 15000);



    // this.wrapping = [[3,1], [2,1], [1,1], [0,1]];
    // this.wrapping = [[1,0], [1, 0], [1, 0], [1, 0]];
    // soure
    // this.wrapping = [[1,1], [1, 1], [1, 1], [1, 1]];
    // this.wrapping = [[2, 1], [3, 0], [0, 1], [1, 0]];
    // moebius
    // this.wrapping = [[2, 1], [3, 1], [0, 1], [1, 1]];
    // real projective
    // this.wrapping = [[3,1], [2,1], [1,1], [0,1]];
    // source
    // this.wrapping = [[2,1], [3,1], [0,1], [1,1]];
    // this.wrapping = [[1, 0], [3,0], [1,0], [1,0]];
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    this.arrows = []
    // var arrow = new Asteroids.Arrow({
    //   dimension: 0,
    //   side: 0,
    //   orientation: 0,
    //   color: "#fff",
    //   game: this,
    //   width: 50
    // });

    Game.DIM_X = $(window).width() = 1250;
    Game.DIM_Y = $(window).height() = 620;
    Game.DIMS = [Game.DIM_X, Game.DIM_Y];
    Game.FPS = 45;
    Game.NUM_ASTEROIDS = 1;

    this.addAsteroids(Game.NUM_ASTEROIDS);
  };



  Game.BG_COLOR = "#D8DEE8";
  //
  // "#BFC8D6"
  // "#000000"
  // Game.DIM_X = 1250;
  // Game.DIM_Y = 620;
  // Game.DIMS = [Game.DIM_X, Game.DIM_Y];
  // Game.FPS = 60;
  // Game.NUM_ASTEROIDS = 1;

  Game.WALL_VALS = [0, 0, 1, 1];
  Game.SIDE_TO_COLOR = ["#3369E8", "#EEB211", "#D50F25", "#009925"]

  Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.push(object);
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.addAsteroids = function (num) {
    // if (this.numAsteroids) {
    //   var num = this.numAsteroids
    //
    // } else {
    //   var num = Game.NUM_ASTEROIDS
    // }
    for (var i = 0; i < num; i++) {
      // this.add(new Asteroids.Asteroid({ game: this, radius: this.radius }));
      this.asteroids.push(new Asteroids.Asteroid({ game: this, radius: this.radius, ord: i }))
    }
  };

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship({
      pos: [165, 310],
      game: this
    });

    this.add(ship);

    return ship;
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.ships, this.asteroids, this.bullets, this.arrows);
  };

  Game.prototype.checkCollisions = function () {
    var game = this;
    var objects = this.allObjects()
    for(var i = 0; i < objects.length; i++) {
      for(var j = i + 1; j < objects.length; j++) {
        if (objects[i].isCollidedWith(objects[j])) {
          objects[i].collideWith(objects[j]);
          // objects[j].collideWith(objects[i]);
        }
      }
    }
    //
    // this.allObjects().forEach(function (obj1, i) {
    //   game.allObjects().forEach(function (obj2, j) {
    //     if (obj1 == obj2) {
    //       // don't allow self-collision
    //       return;
    //     }
    //
    //     if (obj1.isCollidedWith(obj2)) {
    //       obj1.collideWith(obj2);
    //     }
    //   });
    // });
  };

  Game.prototype.draw = function (ctx) {

    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });

// bottom
    ctx.fillStyle = "#009925";
    ctx.fillRect(0,Game.DIM_Y - 17,Game.DIM_X, 17);

//right
    ctx.fillStyle = "#D50F25";
    ctx.fillRect(Game.DIM_X - 17,0,17,Game.DIM_Y);

// top
    ctx.fillStyle = "#EEB211";
    ctx.fillRect(0,0,Game.DIM_X, 17);

//left
    ctx.fillStyle =  "#3369E8";
    ctx.fillRect(0,0,17,Game.DIM_Y - 17);


    var left_map_color = Game.SIDE_TO_COLOR[this.wrapping[0][0]];

    var left_map_inverted = this.wrapping[0][1];

    var top_map_color = Game.SIDE_TO_COLOR[this.wrapping[1][0]];

    var top_map_inverted = this.wrapping[1][1];

    var right_map_color = Game.SIDE_TO_COLOR[this.wrapping[2][0]];

    var right_map_inverted = this.wrapping[2][1];

    var bottom_map_color = Game.SIDE_TO_COLOR[this.wrapping[3][0]];

    var bottom_map_inverted = this.wrapping[3][1];


    ctx.fillStyle = left_map_color;
    ctx.fillRect(8.5, Game.DIM_Y * 3 / 8, 8.5,Game.DIM_Y / 4);
     if (left_map_inverted) {
       ctx.fillStyle = "#FFFFFF"
      //  ctx.fillRect(0, (Game.DIM_Y / 2) - 10, 17,20);
       var path=new Path2D();
   path.moveTo(0,310);
   path.lineTo(17,299);
   path.lineTo(17,323);
   ctx.fill(path);
     };

    ctx.fillStyle = right_map_color;
    ctx.fillRect(Game.DIM_X - 17, Game.DIM_Y * 3 / 8, 8.5,Game.DIM_Y / 4);
    if (right_map_inverted) {
      ctx.fillStyle = "#FFFFFF"
      // ctx.fillRect(Game.DIM_X - 17, (Game.DIM_Y / 2) - 10, 17,20);
      var path=new Path2D();
  path.moveTo(1250,310);
  path.lineTo(1233,299);
  path.lineTo(1233,323);
  ctx.fill(path);
    }

    ctx.fillStyle = top_map_color;
    ctx.fillRect(Game.DIM_X * 3 / 8, 8.5, Game.DIM_X / 4, 8);
    if (top_map_inverted) {
      ctx.fillStyle = "#FFFFFF"
      // ctx.fillRect(Game.DIM_X / 2 - 10, 0, 17,16);
      var path=new Path2D();
  path.moveTo(625,0);
  path.lineTo(613,17);
  path.lineTo(637,17);
  ctx.fill(path);
    };

    ctx.fillStyle = bottom_map_color;
    ctx.fillRect(Game.DIM_X * 3 / 8, Game.DIM_Y - 17, Game.DIM_X / 4, 8.5);
    if (bottom_map_inverted) {
      ctx.fillStyle = "#FFFFFF"
      // ctx.fillRect(Game.DIM_X / 2 - 10, Game.DIM_Y - 17, 17,16);
      var path=new Path2D();
  path.moveTo(625,620);
  path.lineTo(613,603);
  path.lineTo(637,603);
  ctx.fill(path);
    };

    // this.allObjects().forEach(function (object) {
    //   object.draw(ctx);
    // });

    ctx.fillStyle = "white";
    ctx.fillRect(Game.DIM_X, 0, 500, 600);
    ctx.fillStyle = "#8663A4"
    
  // "#7F95B6";
  if (this.ships[0]) {
    ctx.font="30px Trebuchet MS";
    ctx.fillText("score", 1035, 60);
    ctx.fillText(parseInt(this.ships[0].score), 1045, 85);
    ctx.fillStyle = "#E1ACB5"
    //  "#5B9C64";
    ctx.font="30px Trebuchet MS";
    ctx.fillText("lives", 1150, 60);
    ctx.fillText(parseInt(this.ships[0].lives), 1155, 85);
}
// // B
//     ctx.fillStyle = "#3369E8";
//     ctx.font="30px Trebuchet MS";
//     ctx.fillText("B", 1075, 23);
//
// // R
//     ctx.fillStyle = "#EEB211";
//     ctx.font="30px Trebuchet MS";
//     ctx.fillText("R", 1095, 23);
//
// // A
//     ctx.fillStyle = "#D50F25";
//     ctx.font="30px Trebuchet MS";
//     ctx.fillText("A", 1111, 23);
//
// // P
//     ctx.fillStyle = "#009925";
//     ctx.font="30px Trebuchet MS";
//     ctx.fillText("P", 1130, 23);
//     ctx.fillStyle = "#6082B6"


    if (this.countdown) {
      this.playedLast = false
      if (this.prevNumber !== this.countdown) {
        var audio = new Audio('./audio/beep.mp3');
        audio.play();
        console.log("play");
      }
      this.prevNumber = this.countdown;
      ctx.fillStyle = "white";
      ctx.font="30px Trebuchet MS";
      ctx.fillText(parseInt(this.countdown), 620, 320);
      ctx.fillStyle = "#6082B6"
    ;}
  if (this.countdown === 1) {
    setTimeout(function () {
      this.countdown = false;
      if (!this.playedLast) {
        var audio = new Audio('./audio/boop.mp3');
        audio.play();
      }
      this.playedLast = true;
    }.bind(this), 1000)
  };

  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.randomPosition = function () {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Asteroid) {
      // var idx = this.asteroids.indexOf(object);
      // this.asteroids[idx] = new Asteroids.Asteroid({ game: this });
        this.asteroids.splice(this.asteroids.indexOf(object), 1);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else {
      throw "";
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
    var self = this

  };

  Game.prototype.whichWall = function (pos) {
    if (pos[0] >= Game.DIM_X) {
      return 2;
    }
    else if (pos[0] <= 0) {
      return 0
    }
    else if (pos[1] >= Game.DIM_Y) {
      return 3
    }
    else if (pos[1] <= 0) {
      return 1;
    };
  };

  Game.prototype.mapToWall = function (pos) {
    return this.wrapping[this.whichWall(pos)][0];
  };

  Game.prototype.isClockwise = function (pos) {
    // debugger;
    var diff = this.mapToWall(pos) - this.whichWall(pos)
    return (diff > 0 || diff === -3) && diff !== 3;
  };

  Game.prototype.isParallelMapping = function (pos) {
    return Math.abs(this.mapToWall(pos) - this.whichWall(pos)) === 2
  };

  Game.prototype.getsInverted = function (wall) {
    return this.wrapping[wall][1];
  }

  Game.prototype.wrap = function (pos) {
    if (this.isOutOfBounds(pos)) {
      var wall = this.whichWall(pos);
      var wrapping = this.wrapping[wall];
      var mapTo = this.wrapping[wall][0];
      var mapToAxis = mapTo % 2;
      var otherAxis = (mapTo + 1) % 2;
      var relation = Math.abs(mapTo - wall) % 2;
      var isInversType = (wall + mapTo) === 3;
      var newCoord = Game.WALL_VALS[mapTo] * Game.DIMS[mapToAxis];
      if (relation && !isInversType) {
        // debugger;
        pos.reverse();
        var frac = pos[otherAxis] / Game.DIMS[mapToAxis];
        if (this.getsInverted(wall)) {
          pos[otherAxis] = Game.DIMS[otherAxis] - frac * Game.DIMS[otherAxis];
        } else {
          pos[otherAxis] = frac * Game.DIMS[otherAxis];
        }
        pos[mapToAxis] = newCoord;
      } else if (relation && isInversType) {
        // debugger
        pos.reverse();
        var frac = pos[otherAxis] / Game.DIMS[mapToAxis];
        if (this.getsInverted(wall)) {
          pos[otherAxis] = frac * Game.DIMS[otherAxis];
        } else {
        pos[otherAxis] = Game.DIMS[otherAxis] - frac * Game.DIMS[otherAxis];
        }
        pos[mapToAxis] = newCoord;
      } else {
        pos[mapToAxis] = newCoord;
        if (this.getsInverted(wall)) {
          pos[otherAxis] = Game.DIMS[otherAxis] - pos[otherAxis];
        }
      }
      return pos;
    }
  };

  Game.prototype.removeAll = function () {
    if (this.ships.length >= 1) {
      this.remove(this.ships[0]);
    };
    var self = this;
    for (var i = 0; i <= 10; i++) {
      this.asteroids.forEach(function (el) {
        self.remove(el);
      });
    };

  }

  Game.prototype.observeMode = function (num, radius) {
    if (this.ships.length >= 1) {
      this.remove(this.ships[0]);
    };
    var self = this;
    for (var i = 0; i <= 10; i++) {
      this.asteroids.forEach(function (el) {
        self.remove(el);
      });
    };


    for (var i = 0; i < num; i++) {

      // this.add(new Asteroids.Asteroid({ game: this, radius: this.radius }));
      var ast = new Asteroids.Asteroid({ game: this, radius: radius })
      ast.pos = this.randomPosition();
      // ast.vec = Asteroids.Util.randomVec();
      ast.vel = Asteroids.Util.scale(ast.vel, .5);
      this.asteroids.push(ast)
    }
  };
})();
