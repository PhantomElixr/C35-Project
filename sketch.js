var balloon;
var balloonImage;
var backgroundImage;

//Database
var database, position, balloonPosition;

function preload(){
  balloonImage = loadAnimation('images/Hot Air Ballon-02.png','images/Hot Air Ballon-03.png','images/Hot Air Ballon-04.png');
  backgroundImage = loadImage('images/background.png')
}
function setup() {
  createCanvas(500,500);
  database = firebase.database();
  
  balloon = createSprite(250,250,0,0);
  balloon.addAnimation('Animation',balloonImage);
  balloon.scale = 0.5;

  balloonPosition = database.ref("balloon/position");
  balloonPosition.on("value", readposition, showerror);
}

function draw() {
  background(backgroundImage);  

  if(keyDown(DOWN_ARROW)){
    writePosition(0,1);
  }else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
  }else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
  }else if(keyDown(LEFT_ARROW)){
    writePosition(-1,0)
  }
  drawSprites();
}

function writePosition(x,y){
  database.ref("balloon/position").set({
    x: balloon.x + x,
    y: balloon.y + y
    });
}

function readposition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showerror(){
  console.log("error");
}