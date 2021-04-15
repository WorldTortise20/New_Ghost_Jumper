var tower, tI;
var door, dI, dG;
var climber, cI, cG;
var ghost, gI;
var inviz, invizG;
var score = 0, s, sG;
var gs = 1;
var sound;

function preload(){
  tI = loadImage("tower.png");
  dI = loadImage("door.png");
  cI = loadImage("climber.png");
  gI = loadImage("ghost-standing.png");
  sound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  alert("Hold space to keep the ghost up and use Arrow keys to move the ghost!");
  alert("The gold squares are your points! Grab 20 of them to escape!");
  
  tower = createSprite(300,300);
  tower.addImage(tI);
  tower.velocityY = 4;
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage(gI);
  ghost.setCollider("circle",-10,30,110);
  
  dG = createGroup();
  cG = createGroup();
  invizG = createGroup();
  sG = new Group();
}

function draw(){
  background(0);
  game();
  drawSprites();
  textSize(30);
  fill("red");
  text("Score: "+score,300,300);

  if(score>19){
    sound.stop();
    alert("A winner is you!");
    yeet();
    }
  }

function doorSpawn(){
  if(frameCount%100===0){
    door = createSprite(200,-50);
    door.addImage(dI);
    
    climber = createSprite(200,0);
    climber.addImage(cI);
    
    door.x = Math.round(random(120,400));
    door.velocityY = 5;
    door.lifetime = 135;
    climber.lifetime = door.lifetime;
    
    climber.x = door.x;
    climber.velocityY = door.velocityY;

    inviz = createSprite(200,50);
    inviz.width = climber.width;
    inviz.velocityY = climber.velocityY;
    inviz.height = 2;
    inviz.x = door.x;
    inviz.y = climber.y;
    inviz.lifetime = door.lifetime;
    //inviz.debug = true;
    inviz.setCollider("rectangle",0,0,50,2);
    
    s = createSprite(10,10,10,10);
    s.shapeColor = "yellow";
    s.lifetime = door.lifetime;
    s.x = door.x
    s.y = door.y;
    s.velocityY = door.velocityY;
    
    
    ghost.depth = climber.depth+1;
    ghost.depth = door.depth+1;
    
    dG.add(door);
    cG.add(climber); 
    invizG.add(inviz);
    sG.add(s);
  }
}

function game(){
   if (gs===1){
    if(tower.y>600){
    tower.y = 300;
  }
  
  if (keyDown("right_arrow")){
    ghost.x = ghost.x+10;
  }
  
  
  if (keyDown("left_arrow")){
    ghost.x = ghost.x-10;
  }
  
  
  if (keyDown("space")){
    ghost.velocityY = -5;
  }
  
  if(sG.isTouching(ghost)){
    score = score+1;
    s.destroy();
  }
    
  ghost.velocityY = ghost.velocityY + 0.8;
  sound.loop(true);
     
  if (cG.isTouching(ghost)){
      ghost.velocityY = 0;      
    }
  
  if (invizG.isTouching(ghost)||ghost.y>600){
      ghost.destroy();   
      gs = 0;
    sound.stop();
    }
  
  doorSpawn();
  }
  
   if (gs===0){
    stroke = "red"
    fill("yellow");
    textSize(30);
    text("OOF",200,200);
  }
}

function yeet(){
  if (window.confirm('Either button will take you to the final trial')){
    window.open('https://worldtortise20.github.io/Lv3Quiz/','_blank');
 }
  else{
    window.open('https://worldtortise20.github.io/Lv3Quiz/','_blank');
    }
}