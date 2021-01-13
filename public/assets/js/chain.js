const Ball = function(x, y, radius) {
  this.color =
    "rgb(" +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    ", 0)";

  this.direction = Math.random() * Math.PI * 2;
  this.radius = radius;
  this.speed = Math.random() + Math.random() * 2 + 1;
  this.x = x;
  this.y = y;
};

Ball.prototype = {
  updatePosition: function(width, height) {
    this.x += Math.cos(this.direction) * this.speed;
    this.y += Math.sin(this.direction) * this.speed;

    if (this.x < 0) {
      this.x = 0;
      this.color =
        "rgb(" +
        Math.floor(Math.random() * 256) +
        "," +
        Math.floor(Math.random() * 256) +
        "," +
        Math.floor(Math.random() * 256) +
        ", 0.3)";

      this.direction = Math.atan2(
        Math.sin(this.direction),
        Math.cos(this.direction) * -1
      );
      this.remove();
    } else if (this.x + this.radius > width) {
      this.x = width - this.radius;
      this.color =
        "rgb(" +
        Math.floor(Math.random() * 256) +
        "," +
        Math.floor(Math.random() * 256) +
        "," +
        Math.floor(Math.random() * 256) +
        ", 0.2)";

      this.direction = Math.atan2(
        Math.sin(this.direction),
        Math.cos(this.direction) * -1
      );
      this.remove();
    }

    if (this.y < 0) {
      this.y = 0;
      this.color =
        "rgb(" +
        Math.floor(Math.random() * 256) +
        "," +
        Math.floor(Math.random() * 256) +
        "," +
        Math.floor(Math.random() * 256) +
        ", 0.5)";

      this.direction = Math.atan2(
        Math.sin(this.direction) * -1,
        Math.cos(this.direction)
      );
      this.remove();
    } else if (this.y + this.radius > height) {
      this.y = height - this.radius;

      this.color =
        "rgb(" +
        Math.floor(Math.random() * 256) +
        "," +
        Math.floor(Math.random() * 256) +
        "," +
        Math.floor(Math.random() * 256) +
        ", 0.5)";

      this.direction = Math.atan2(
        Math.sin(this.direction) * -1,
        Math.cos(this.direction)
      );
      this.remove();
    }
  }
};

var context = document.querySelector("canvas").getContext("2d");

var balls = new Array();

let x = document.documentElement.clientWidth * 0.5;
let y = document.documentElement.clientHeight * 0.5;

for (let index = 0; index < 20; index++) {
  balls.push(
    new Ball(x, y, Math.floor(Math.random() * 10 + Math.random() * 40 + 30))
  );
}

function loop() {
  window.requestAnimationFrame(loop);

  let height = document.documentElement.clientHeight;
  let width = document.documentElement.clientWidth;

  context.canvas.height = height;
  context.canvas.width = width;

  /* I removed that - 1 after making the video. It's not neccessary. */
  for (let index = 0; index < balls.length; index++) {
    let ball = balls[index];

    context.fillStyle = ball.color;
    context.beginPath();
    context.rect(ball.x, ball.y, ball.radius, ball.radius);
    //context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.strokeStyle = "rgb(156, 114, 125, 1)";
    context.stroke();
    context.fill();

    ball.updatePosition(width, height);
  }
}

loop();
