var robber,robber_run,robber_caught,invisibleGround;
var diamondGroup,diamond_IMG;
var policeGroup,police_IMG;
var road,road_IMG,restart,restart_img,gameover,gameover_IMG;
var PLAY=1;
var END=0;
var gameState=PLAY
var score;

function preload(){
robber_run = loadAnimation("RUN 1.png","RUN 2.png","RUN 3.png","RUN 4.png","RUN 5.png","RUN 6.png","RUN 7.png","RUN 8.png","RUN 9.png","RUN 10.png","RUN 11.png","RUN 12.png","RUN 13.png","RUN 14.png");
robber_caught = loadImage("images/ROBBER CAUGHT.png");
diamond_IMG=loadImage("images/diamond.png");
police_IMG=loadImage("images/police car.png");
restart_img=loadImage("images/RESTART.png");
road_IMG=loadImage("images/ROAD.jpg");
gameover_IMG=loadImage("images/GAME OVER.png");
}

function setup() {
  createCanvas(1000,700);
  
  road=createSprite(350,350);
  road.addImage("road",road_IMG);
  road.scale=4.6;
  road.x=road.width/2;
  robber=createSprite(150,520,20,40);
  robber.addAnimation("running", robber_run);
  robber.scale=0.8;
  robber.addAnimation("caught", robber_caught);

  invisibleGround = createSprite(400,580,900,1);
  invisibleGround.visible = false;

  diamondGroup = new Group();
  policeGroup = new Group();
  gameover=createSprite(400,400);
restart=createSprite(400,100);
  gameover.addImage(gameover_IMG);
  restart.addImage(restart_img);
  restart.scale=0.5;
  gameover.scale=2

  score=0;
}

function draw() {
  background(255,255,255);  
robber.collide(invisibleGround);
robber.setCollider("rectangle",0,0,60,200)

if(gameState===PLAY){
if(keyDown("space")&&robber.y>161.5) {
 robber.velocityY = -14;
}
  restart.visible=false
gameover.visible=false
 
robber.velocityY = robber.velocityY + 0.8

if (road.x < 0){
 road.x = road.width/2;
}

if(diamondGroup.isTouching(robber)){
  score=score+2
  diamondGroup.destroyEach();
}

   spawndiamonds();
spawnpolice();
if(policeGroup.isTouching(robber)){
gameState=END
}
}
else if(gameState===END){
     road.velocityX = 0;
diamondGroup.setVelocityXEach(0)
policeGroup.setVelocityXEach(0)
diamondGroup.setLifetimeEach(-5)
policeGroup.setLifetimeEach(-5)
robber.changeAnimation("caught",robber_caught)
robber.velocityY=0;
score=0;
  restart.visible=true
gameover.visible=true
if(mousePressedOver(restart)){
  reset();
  }

}
  drawSprites();
  stroke("red");
textSize(30)
fill("green")
text("score:"+score,600,200)
}

function spawndiamonds() {

  if (frameCount % 210 === 0) {
    var diamond = createSprite(750,520,40,10);
    diamond.y = Math.round(random(300,350));
    diamond.addImage(diamond_IMG);
    diamond.scale = 0.3;
    diamond.velocityX = -(5+10*score/100);
    
    diamond.lifetime = 200;
    

    diamond.depth = robber.depth;
    robber.depth = robber.depth + 1;
    
    diamondGroup.add(diamond);
  }
  
}

function spawnpolice() {
  if(frameCount % 100 === 0) {
    var police = createSprite(750,565,10,40);
    police.velocityX = -(15+10*score/100);
         police.addImage(police_IMG)
    police.scale = 0.8;
    police.lifetime = 300;
    policeGroup.add(police);
  }
}

function reset(){
  gameState=PLAY
policeGroup.destroyEach();
  diamondGroup.destroyEach();
  robber.changeAnimation("running",robber_run)

}