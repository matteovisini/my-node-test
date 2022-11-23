/*Some part of the sketch was created with p5.js and matter.js starting from Daniel Shiffman's tutorials about the library:
https://www.youtube.com/watch?v=urR596FsU68&ab_channel=TheCodingTrain
*/

let Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies;
  let grid = 2;

let engine;
let world;
let pixels = [];
let size = 0;
let myColor = "#000000";
let scr = "mirko";

//variables to make the border visibles
var borderDown;
var borderTop;
var borderLeft;
var border;

//variables to make the help hint disappear
let opacityHelp =255;
let a = 1;

//variables for the html popup
let myPopup, testo, warning, barra, testo2, closePopup;

function preload() {
  //images
    myIcon = loadImage("assets/Icon.webp")
    myIconClosebar = loadImage ("assets/menu.png")
    myImageLato= loadImage ("assets/Barra lato.png");
    myIconScale = loadImage ("assets/Scala.png")
    myIconPaint= loadImage("assets/paint.png");
    myIconShake= loadImage("assets/shake.png");
    myIconFake= loadImage("assets/fake.png");
    myIconHelp= loadImage("assets/info.png")

    //windows fonts
    myFont = loadFont("assets/Windows Regular.ttf")
    myFont2 = loadFont("assets/sysfont.ttf")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  frameRate(60)

  //threshold for the shake to reset
  setShakeThreshold(30);
  angleMode(RADIANS);

  //start the matter.js engine
  engine = Engine.create();
  engine.gravity.x = 0;
  engine.gravity.y = 0;
  world = engine.world;
  
  //condition and settings for the border
  var options = {
    isStatic: true,
  };

  borderDown = Bodies.rectangle(75,70+height-180, 1000, 5, options);
  borderTop = Bodies.rectangle(80, 70, 1000, 5, options);
  borderLeft = Bodies.rectangle(75, 75, 5, 1000, options);
  borderRight = Bodies.rectangle(75+width-90, 75, 5, 1000, options);
  

  World.add(world, [borderDown, borderTop, borderLeft, borderRight]);
}

//drop down help menu  
function HELP (){
  push()
  
  //selection
  stroke(0);
  line(302,37.5,347,37.5);
  line(302,37.5,302,67.5);
  stroke(255);
  line(347,37.5,347,67.5);
  line(302,67.5,347,67.5);

  //drop down menu shape
  noStroke()
  fill("#bdbdbd")
  drawingContext.shadowOffsetX = 4;
  drawingContext.shadowOffsetY = 4;
  drawingContext.shadowColor = 'black';
  rect(147,68.5,200, 150)
  stroke(255)
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  line(147,70,347,70)
  line(147,70,147, 240)
  textFont(myFont);
  textSize(15);

  //text  
  fill("#000000")
  image(myIconPaint,155,80)
  noStroke()
  text("Choose the color", 185,93)
  text("and the size of the brush", 185,108)
  image(myIconShake,160,132)
  text("Shake your phone", 185,145)
  text("to reset the canvas", 185,160)
  image(myIconFake,160,190)
  text("…everything else is fake ", 185, 200)

  // dividers
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 4;
  drawingContext.shadowColor = 'white';
  stroke('#7b7b7b')
  line(152,120, 342, 120)
  line(152,175, 342, 175)

  pop()
}

function GUI() {

  removeElements()
  
  //borders of the GUI
  push()
  noStroke()
  fill("#bdbdbd")
  rect(0,0,75, height)
  rect(0,0,width, 70)
  rect(0,height-110,width, 110)
  rect(width-15,0,20,height)
  
  //top bar of the GUI
  noStroke()
  fill("#00007B")
  rect(5, 5,width - 10,30)
  image(myIcon, 9,8, 23, 23)
  textSize(20);
  textFont(myFont2);
  fill("#ffffff")
  text("untitled - Gravitypaint", 40,26)
  image(myIcon, 9,8, 23, 23)

  //tool bar of the GUI
  image(myIconClosebar, width - 95,8, 85,25)
  textFont(myFont);
  fill("#000000")
  text("File    Edit    View    Image    Options    Help", 20,60)
  pop()
  
  if(mouseX > 301 && mouseX< 346){
    if(mouseY > 37 && mouseY< 67){
      if (mouseIsPressed) {
        scr = "help";
      }
    }
  }

  //side bar of the GUI (with mediaQuery for the landscape mode)
  if(height>480){
  image(myImageLato, 2.5,70, 70, 300)
  fill("#bdbdbd")
  stroke('#ffffff') 
  rect(3.5,381,68,height/4)
  stroke('#7b7b7b')
  rect(2.5,380,68,height/4)}

  if(height<480){
    fill("#bdbdbd")
    stroke('#ffffff') 
    rect(3.5,70,68,height-180)
    stroke('#7b7b7b')
    rect(2.5,70,68,height-180)
  }

  //space for choosing the stroke in the side bar
 stroke('#7b7b7b')
  line(5,height-30, width - 5, height-30)
  stroke('#ffffff')
  line(5,height-29, width - 5, height-29)
  stroke('#ffffff')
  rect(11,height-24,width-120,20)
  stroke('#7b7b7b')
  fill("#bdbdbd")
  rect(10,height-25,width-120,20)
 
  //space for the stroke buttons in the side bar
  stroke('#ffffff')
  rect(width-100,height-24,70,20)
  stroke('#7b7b7b')
  fill("#bdbdbd")
  rect(width-100,height-25,70,20)

  //stroke buttons
  push()
  stroke("#000000")
  strokeCap(PROJECT)
  button = createButton("");
  button.mousePressed(size0)
  button.position(10, 400);
  button.size(50,20);
  button.style("background-color", "#00000000","z-index:-1");
  strokeWeight(2)
  line (20,410,50,410)

  button = createButton("");
  button.mousePressed(size1)
  button.position(10, 425);
  button.size(50,20);
  button.style("background-color", "#00000000","z-index:-1");
  strokeWeight(4)
  line (20,435,50,435)

  button = createButton("");
  button.mousePressed(size2)
  button.position(10, 450);
  button.size(50,20);
  button.style("background-color", "#00000000","z-index:-1");
  strokeWeight(6)
  line (20,460,50,460)

  button = createButton("");
  button.mousePressed(size3)
  button.position(10, 475);
  button.size(50,20);
  button.style("background-color", "#00000000","z-index:-1");
  strokeWeight(8)
  line (20,485,50,485)
  pop()

  //bottom bar
  textSize(15)
  textFont(myFont);
  noStroke()
  fill("#000000")
  text("Drawing app for kids… from the '90s I guess", 15,height-10)

  //condition to show the coordinates in the bottom bar
  if(mouseX > 75 && mouseX< 70+width-90){
    if(mouseY > 70 && mouseY< 70+height-180){
      text (mouseX, width-90,height-10 )
    }
  }
  image(myIconScale, width-26,height-26, 20, 23)
}

//settings for the color selector
function colorSelector(){

  let padding= 2;
  let posX= 40;
  let posY= height-20;

  //color preview
  stroke ("#000000");
  strokeWeight(1.5);
  fill(myColor);
  rect (10, posY - 70 + padding, 50, 50);

  button = createButton("");
  button.mousePressed(color1)
  button.position(posX+(25+padding), posY-70);
  button.size(25,25);
  button.style("background-color", "#000000");

  button = createButton("");
  button.mousePressed(color2)
  button.position(posX+(25+padding), posY -45+padding);
  button.size(25,25);
  button.style("background-color", "#ffffff");

  button = createButton("");
  button.mousePressed(color3)
  button.position(posX+(25+padding)*2, posY-70);
  button.size(25,25);
  button.style("background-color", "#808080");

  button = createButton("");
  button.mousePressed(color4)
  button.position(posX+(25+padding)*2, posY-45+padding);
  button.size(25,25);
  button.style("background-color", "#C1BEC2");

  button = createButton("");
  button.mousePressed(color5)
  button.position(posX+(25+padding)*3, posY-70);
  button.size(25,25);
  button.style("background-color", "#800202");

  button = createButton("");
  button.mousePressed(color6)
  button.position(posX+(25+padding)*3, posY-45+padding);
  button.size(25,25);
  button.style("background-color", "#FB0204");

  button = createButton("");
  button.mousePressed(color7)
  button.position(posX+(25+padding)*4, posY-70);
  button.size(25,25);
  button.style("background-color", "#7D8004");

  button = createButton("");
  button.mousePressed(color8)
  button.position(posX+(25+padding)*4, posY-45+padding);
  button.size(25,25);
  button.style("background-color", "#FEFE04");

  button = createButton("");
  button.mousePressed(color9)
  button.position(posX+(25+padding)*5, posY-70);
  button.size(25,25);
  button.style("background-color", "#018004");

  button = createButton("");
  button.mousePressed(color10)
  button.position(posX+(25+padding)*5, posY-45+padding);
  button.size(25,25);
  button.style("background-color", "#02FE02");

  button = createButton("");
  button.mousePressed(color11)
  button.position(posX+(25+padding)*6, posY-70);
  button.size(25,25);
  button.style("background-color", "#048181");

  button = createButton("");
  button.mousePressed(color12)
  button.position(posX+(25+padding)*6, posY-45+padding);
  button.size(25,25);
  button.style("background-color", "#04FCFC");

  button = createButton("");
  button.mousePressed(color13)
  button.position(posX+(25+padding)*7, posY-70);
  button.size(25,25);
  button.style("background-color", "#010180");

  button = createButton("");
  button.mousePressed(color14)
  button.position(posX+(25+padding)*7, posY-45+padding);
  button.size(25,25);
  button.style("background-color", "#0201FB");

  button = createButton("");
  button.mousePressed(color15)
  button.position(posX+(25+padding)*8, posY-70);
  button.size(25,25);
  button.style("background-color", "#800180");

  button = createButton("");
  button.mousePressed(color16)
  button.position(posX+(25+padding)*8, posY-45+padding);
  button.size(25,25);
  button.style("background-color", "#FF01FD");

  button = createButton("");
  button.mousePressed(color17)
  button.position(posX+(25+padding)*9, posY-70);
  button.size(25,25);
  button.style("background-color", "#7F7F3F");

  button = createButton("");
  button.mousePressed(color18)
  button.position(posX+(25+padding)*9, posY-45+padding);
  button.size(25,25);
  button.style("background-color", "#FCFD83");

  button = createButton("");
  button.mousePressed(color19)
  button.position(posX+(25+padding)*10, posY-70);
  button.size(25,25);
  button.style("background-color", "#063E3F");

  button = createButton("");
  button.mousePressed(color20)
  button.position(posX+(25+padding)*10, posY-45+padding);
  button.size(25,25);
  button.style("background-color", "#02FD81");

  button = createButton("");
  button.mousePressed(color21)
  button.position(posX+(25+padding)*11, posY-70);
  button.size(25,25);
  button.style("background-color", "#037EFC");

  button = createButton("");
  button.mousePressed(color22)
  button.position(posX+(25+padding)*11, posY-45+padding);
  button.size(25,25);
  button.style("background-color", "#81FEFD");
}

//functions for the stroke selection
function size0(){
size=0
}

function size1(){
size=1
}

function size2(){
  size=2
}

function size3(){
    size=3
}

//functions for the color selection
function color22(){
myColor= "#81FEFD"
colorSelector()
}

function color21(){
myColor= "#037EFC"
colorSelector()
}

function color20(){
myColor= "#02FD81"
colorSelector()
}

function color19(){
myColor= "#063E3F"
colorSelector()
}

function color18(){
myColor= "#FCFD83"
colorSelector()
}

function color17(){
myColor= "#7F7F3F"
colorSelector()
}

function color16(){
myColor= "#FF01FD"
colorSelector()
}

function color15(){
myColor= "#800180"
colorSelector()
}

function color14(){
myColor= "#0201FB"
colorSelector()
}

function color13(){
myColor= "#010180"
colorSelector()
}

function color12(){
myColor= "#04FCFC"
colorSelector()
}

function color11(){
myColor= "#048181"
colorSelector()
}

function color10(){
myColor= "#02FE02"
colorSelector()
}

function color9(){
myColor= "#018004"
colorSelector()
}

function color8(){
myColor= "#FEFE04"
colorSelector()
}

function color7(){
myColor= "#7D8004"
colorSelector()
}

function color6(){
myColor= "#FB0204"
colorSelector()
}

function color5(){
myColor= "#800202"
colorSelector()
}

function color4(){
myColor= "#C1BEC2"
colorSelector()
}

function color3(){
myColor= "#808080"
colorSelector()
}

function color2(){
myColor= "#ffffff"
colorSelector()
}

function color1(){
myColor= "#000000"
colorSelector()
}

//drawing function with the different strokes
function mouseDragged() {
  const [r, g, b] = get(mouseX, mouseY); // get colors

  if (mouseIsPressed) {
    if (r == 255 && g != 0) {
      if(size==0){
        pixels.push(new pixel(mouseX, mouseY, 2, 2));
      }

      if(size==1){ 
        pixels.push(new pixel(mouseX -3, mouseY+3, 2, 2));
        pixels.push(new pixel(mouseX+3, mouseY+3, 2, 2));
        pixels.push(new pixel(mouseX +3, mouseY-3, 2, 2));
        pixels.push(new pixel(mouseX-3, mouseY-3, 2, 2));
      }

      if(size==2){      
        pixels.push(new pixel(mouseX-6, mouseY, 2, 2));
        pixels.push(new pixel(mouseX, mouseY, 2, 2));
        pixels.push(new pixel(mouseX+6, mouseY, 2, 2));
        pixels.push(new pixel(mouseX, mouseY-6, 2, 2));
        pixels.push(new pixel(mouseX, mouseY, 2, 2));
        pixels.push(new pixel(mouseX, mouseY+6, 2, 2));
      }

      if(size==3){     
        pixels.push(new pixel(mouseX -3, mouseY+3, 2, 2));
        pixels.push(new pixel(mouseX+3, mouseY+3, 2, 2));
        pixels.push(new pixel(mouseX +3, mouseY-3, 2, 2));
        pixels.push(new pixel(mouseX-3, mouseY-3, 2, 2));
        pixels.push(new pixel(mouseX -9, mouseY+3, 2, 2));
        pixels.push(new pixel(mouseX+9, mouseY+3, 2, 2));
        pixels.push(new pixel(mouseX +9, mouseY-3, 2, 2));
        pixels.push(new pixel(mouseX-9, mouseY-3, 2, 2));
        pixels.push(new pixel(mouseX -3, mouseY+9, 2, 2));
        pixels.push(new pixel(mouseX+3, mouseY+9, 2, 2));
        pixels.push(new pixel(mouseX +3, mouseY-9, 2, 2));
        pixels.push(new pixel(mouseX-3, mouseY-9, 2, 2));
      }
    }
  }
}

function draw() {

 background(255);
 colorSelector();

  //shows the pixels and the elements made by the engine in the canvas
  //drawing
 Engine.update(engine);
  for (var i = 0; i < pixels.length; i++) {
    pixels[i].show();
  }
 
  //shows GUI and colorSelection functions
  GUI();
  colorSelector();
  noStroke(255);
 
  //borders
  fill('#7b7b7b');
  rect(borderDown.position.x, borderDown.position.y, width-90, 5);
  rect(borderTop.position.x, borderTop.position.y, width-90, 5);
  rect(borderLeft.position.x, borderLeft.position.y, 5, height-180);
  rect(borderRight.position.x, borderRight.position.y, 5, height-180);
 
  //calls the help menu
  if(scr=="help"){
    HELP()
  }

  //makes the hint icon disappear
  if (scr == "paint"){
    push()
    tint(255, opacityHelp)
    image(myIconHelp,316,65,20,20)
    opacityHelp = opacityHelp - a 
    a = a +0.1
    pop()
  }

  //change of gravity with the orientation of the devices
  if (width<576){
    if (round(rotationX)>-15 && round(rotationX)<15 ) {
      engine.gravity.y = 0;
    }
    else if (round(rotationX)>15){
      engine.gravity.y = 1;
    }
    else if (round(rotationX)<-15){
      engine.gravity.y = -1;
    }
    if (round(rotationY)>-15 && round(rotationY)<15){
      engine.gravity.x = 0;
    }
    else if (round(rotationY)<-15){
      engine.gravity.x = -1;
    }
    else if (round(rotationY)>15){
      engine.gravity.x = 1;
    }
  }

//creating all elements of the popup in HTML
if (scr == "mirko"){

    //popup shape
    myPopup = createElement("div")
    myPopup.addClass("myPopup")
    myPopup.position (width/2-162,height/2-85)

    //warning image settings
    warning =createElement("img");
    warning.addClass("warning")
    warning.attribute("src", "assets/warning.png")
    warning.position(20,60)
    myPopup.child(warning); // Define one element as the child of another
    warning.parent(myPopup)

    //text settings
    testo1 = createElement("p")
    testo1.addClass("testo1")
    testo1.position (90,50)
    testo1.html("You've just downloaded this amazing<br>new painting software, but some<br>crazy guy in the development section<br>has installed a physics engine…<br><br>Try to keep your device in balance<br>to draw your stuff.")
    myPopup.child(testo1); // Define one element as the child of another
    testo1.parent(myPopup)

    //topbar shape
    barra = createElement("div")
    barra.addClass("barra")
    barra.position (width/2-155,height/2-80)
    testo2 = createElement("h1","Welcome!")
    barra.child(testo2); // Define one element as the child of another
    testo2.parent(barra)

    //close image settings
    closePopup =createElement("img");
    closePopup.addClass("closePopup")
    closePopup.attribute("src", "assets/X.png")
    closePopup.position(279,2)
    barra.child(closePopup); // Define one element as the child of another
    closePopup.parent(barra)
  }
}

//close the popup
function mousePressed(){
  scr = "paint"
}

//function to draw following the pixels
function snap(p) {
  var cell = Math.round((p - grid / 2) / grid);
  return cell * grid;
}

//function to activate gravity from desktop with arrows
function keyPressed() {
  if (keyCode === 32) {
    engine.gravity.x = 0;
    engine.gravity.y = 0;
  }

  else if (keyCode === DOWN_ARROW){
    engine.gravity.x = 0;
    engine.gravity.y = 1;
  } 

  else if (keyCode === UP_ARROW) {
    engine.gravity.x = 0;
    engine.gravity.y = -1;

  } else if (keyCode === LEFT_ARROW) {
    engine.gravity.x = -1;
    engine.gravity.y = 0;

  } 
  else if (keyCode === RIGHT_ARROW) {
    engine.gravity.x = 1;
    engine.gravity.y = 0;
  }
}


//reset canvas
function deviceShaken(){
  for (let i=0; i<pixels.length; i++){
    pixels.pop();
  }
}

//resize page 
function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
  wi = windowWidth / 2;
  he = windowHeight / 2;
}

//request permission on IOS
function touchEnded(event) {
	if(DeviceOrientationEvent && DeviceOrientationEvent.requestPermission){
		DeviceOrientationEvent.requestPermission()
	}
}

