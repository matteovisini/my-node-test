/*This part of the sketch was created with p5.js and matter.js starting from Daniel Shiffman's tutorials about the library:
https://www.youtube.com/watch?v=urR596FsU68&ab_channel=TheCodingTrain
*/
function pixel(x, y, w, h) {
  var options = {
    // inertia: Infinity,
    friction: 0.5,
    restitution: 0.1,
  };
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.body.angle = 0;
  this.w = 8;
  this.h = 8;
  this.color=myColor;
  World.add(world, this.body);

  this.show = function () {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    fill(this.color);
    translate(snap(pos.x), snap(pos.y));
    // rotate(angle);
    rectMode(CENTER);
    strokeWeight(0);
    stroke(255, 0, 0);
   
    rect(0, 0, this.w, this.h);
    pop();
  };
}
