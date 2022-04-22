var trex,trexRun;
var trexCollide;
var solo,imageSolo;
var invSolo
var clouds,cloudsImage;
var cactus, imageCactus1,imageCactus2,imageCactus3,imageCactus4,imageCactus5,imageCactus6
var score =0;
var play =1
var end =0
var gamestate =play
var cloudsGroup
var cactusGroup
var gameOver,gameOverImage
var restart,restartImage
var checkpoint
var jump 
var die 
var record =0

function preload(){
trexRun = loadAnimation ("trex1.png","trex3.png","trex4.png")
imageSolo=loadImage ("ground2.png")
cloudsImage = loadImage ("cloud.png")
imageCactus1= loadImage ("obstacle1.png")
imageCactus2= loadImage ("obstacle2.png")
imageCactus3= loadImage ("obstacle3.png")
imageCactus4= loadImage ("obstacle4.png")
imageCactus5= loadImage ("obstacle5.png")
imageCactus6= loadImage ("obstacle6.png")
trexCollide = loadAnimation ("trex_collided.png")
gameOverImage = loadImage ("gameOver.png")
restartImage = loadImage ("restart.png")
checkpoint=loadSound ("checkpoint.mp3")
die=loadSound ("die.mp3")
jump=loadSound("jump.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  invSolo=createSprite (width/2,height-10,width,2);
  invSolo.visible=false;
  //criando o trex
trex=createSprite (50,height-40,20,20)
 trex.addAnimation ("run",trexRun) 
 trex.addAnimation ("collided",trexCollide)
 trex.debug=false
 trex.setCollider ("rectangle",0,0,30,80,20)
  //trex.setCollider ("circle",0,0,30)
  //adicione dimensão e posição ao trex
trex.scale=0.5;
solo = createSprite(width/2,height-20,width,2)
solo.addImage (imageSolo) 
cloudsGroup = new Group ()
cactusGroup = new Group ()
gameOver=createSprite (width/2,height-120,100,10)
restart=createSprite (width/2,height-90,100,10)
restart.addImage (restartImage)
gameOver.addImage (gameOverImage)
gameOver.scale = 0.5
restart.scale=0.5
gameOver.visible=false
restart.visible=false

}


function draw(){
  //definir a cor do plano de fundo 
  background("white");
  if (trex.isTouching(cactusGroup)) {
    gamestate = end
    //die.play()
  }
 // console.log (trex.y)
 if (gamestate=== play)  {
  score+= Math.round (getFrameRate () /60 )
  if (score%100===0&& score<0){
checkpoint.play ()
  }
  if(touches.length>0||keyDown("space")&& trex.y > height-36) { 
    trex.velocityY=-12;
    jump.play ()
    touches = []
    } 
    solo.velocityX = -(12+score/100)
    if (solo.x<800){
      solo.x = solo.width/2          
    }
    createCactus ()
    createClouds ()
    
 }

if (gamestate=== end){
  trex.changeAnimation ("collided",trexCollide)
  solo.velocityX = 0
  cactusGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0)
  cactusGroup.setLifetimeEach (-1)
  cloudsGroup.setLifetimeEach (-1)
  gameOver.visible=true
  restart.visible=true
  if (record<score){
    record = score
  }  
  

  if (mousePressedOver(restart)){
    gamestate = play
    gameOver.visible = false
    restart.visible=false
    cactusGroup.destroyEach ()
    cloudsGroup.destroyEach ()
    trex.changeAnimation ("run",trexRun)
    score=0
  }
}

  //registrando a posição y do trex

  //pular quando tecla de espaço for pressionada

textSize (20)

text ("score "+score,width-580,height-180)
text ("record "+record,width-460,height-180)
text ("X: "+mouseX+"/ Y: "+mouseY,mouseX,mouseY)

 //impedir que o trex caia
 Gravity ();
trex.collide(invSolo);
  drawSprites();

}
function Gravity ()
{
  trex.velocityY +=0.6 
}
function createClouds () {

if (frameCount%60===0){
  clouds=createSprite (width,random(height-100,height-150),40,10)
clouds.velocityX = -(6+score/100)
clouds.addImage (cloudsImage)
clouds.scale = random (0.5,1.4)
clouds.depth = trex.depth - 1;
clouds.lifetime=250
cloudsGroup.add (clouds)
}
}
function createCactus (){
  if (frameCount%100===0) {
  
  
cactus=createSprite (width,height-30,10,50)
cactus.velocityX = -(8+score/100)
cactus.scale = 0.5;
cactus.depth = trex.depth ;
cactus.lifetime=250
cactusGroup.add (cactus)
var sorteiocactus =Math.round (random (1,6))
switch (sorteiocactus) {
  case 1:cactus.addImage (imageCactus1);
    break;
    case 2:cactus.addImage (imageCactus2);
    break;
    case 3:cactus.addImage (imageCactus3);
    break;
    case 4:cactus.addImage (imageCactus4);
    break;
    case 5:cactus.addImage (imageCactus5);
    break;
    case 6:cactus.addImage (imageCactus6);
    break;


 
}
  }
}

