var eren,eren1
var bgImg;
var erenImg,erenJump,erenFall;
var bg;
var invisibleGround;
var gamestate=-2;
var bannerImg;
var start;
var startImg;
var erenMove
var mons1Move,monsterGroup;
var score=0;
var nextButton,next;
var livesGroup;
var storyn;
var story1;
var flames;
var bossImg,boss;

function preload(){
    bg3=loadImage("images/bg 3.jpg");
    bossImg=loadImage("images/boss 1/dragon 1.png")
    jumpSound=loadSound("sounds/jump.wav");
    die=loadSound("sounds/pain50_1.wav")
    hit=loadSound("sounds/hit.wav")
    click=loadSound("sounds/click.wav")
    flames=loadAnimation("images/falmes.png","images/flames 2.png","images/flames 3.png","images/flames 4.png")
    nextButton=loadImage("images/next.png")
    story2=loadImage("images/ajukta.jpg")
    story=loadImage("images/front.jpg");
    bannerImg=loadImage("images/banner img.jpg");
    bgImg=loadImage("images/bg 2.png")
    erenImg=loadAnimation("images/eren/erenStand.png");
    erenMove=loadAnimation("images/eren/eren running 2.png","images/eren/eren running.png");
    startImg=loadImage("images/start.png")
    mons1Move=loadAnimation("images/mons 2/mons 2 running 1.png","images/mons 2/mons 2 standing.png");
    erenJump=loadAnimation("images/eren/eren jumping 1.png","images/eren/eren jump 2.png","images/eren/eren jump3.png")
    erenFall=loadAnimation("images/eren/erenFalling.png")
    livesImg=loadImage("images/lives.png")
    flyMons=loadImage("images/fly mons.png")
}

  
function setup(){
    createCanvas(1000,600);
    
    if(gamestate===-2){
       story1=createSprite(500,300)
       story1.addImage("1",story);
    }
    vid = createVideo(['sounds/starting.mp4']);
    vid.hide();
    vid.volume(0);
   
    bg=createSprite(500,300)
    bg.addImage("bg",bgImg);
    bg.addImage("bg2",bg3)
    bg.visible=false;

    eren=createSprite(120,500);
    eren1=createSprite(120,500);
    eren1.visible=false;
    eren.visible=false;
    eren.addAnimation("eren Stand",erenImg);
    eren1.addAnimation("eren move",erenMove);
    eren1.addAnimation("eren jump",erenJump);
    
    eren1.scale=1.3;
    eren1.setCollider("rectangle",0,0,50,60);
   // eren1.debug=true;

    invisibleGround=createSprite(500,550,1000,10)
    invisibleGround.visible=false;

    start=createSprite(600,600)
    start.addImage("start",startImg);
    start.visible=false;

   monsterGroup=new Group();
   livesGroup=new Group();

   storyn=createSprite(500,300);
   storyn.addImage("2",story2);
   storyn.visible=false;
   
   for(var i=1;i<=3;i++){
    live=createSprite((60)*i,50)
    live.addImage("live",livesImg)
    live.scale=0.1;
    live.visible=false;
    livesGroup.add(live);
}


   next=createSprite(900,100);
   next.addImage("n",nextButton)
   boss=createSprite(500,300)
   boss.addImage("boss",bossImg)
   boss.visible=false;
 //  next.debug=true;
   next.setCollider("rectangle",-20,-50,200,150);
}

function draw(){
    
    if(mousePressedOver(next) && gamestate===-2){
        story1.visible=false;
        clear();
        storyn.visible=true;
        storyn.scale=0.5;
         gamestate=-1
         next.destroy();
         click.play();
    }

        if(keyDown(UP_ARROW) && gamestate === -1){
       
        if(storyn.visible===true){
        next.visible=false;
        storyn.visible=false;
       
        gamestate=0;
       clear();
       
    
        }

    }
  
    if (gamestate===0){
      // story1.destroy();
     
        background(bannerImg);
        start.visible=true;
        next.visible=false;
       if(mousePressedOver(start) ||keyDown("SPACE") ){
           gamestate=1;

       
       console.log(frameCount);
           
       }
       if(frameCount%60===0){
        ashes=createSprite(random(0,300),random(0,50));
        ashes.addAnimation("fire",flames);
        ashes.velocityX=2;
        ashes.velocityY=2
        ashes.lifetime=400;

        ashes2=createSprite(random(0,300),random(500,600));
        ashes2.addAnimation("fire",flames);
        ashes2.velocityX=2;
        ashes2.velocityY=-2;
        ashes2.lifetime=400;
        

    }
    }
    if (gamestate===1){
        ashes.visible=false;
        ashes2.visible=false;
        vid.hide();
        vid.volume(0);
    bg.visible=true;
    eren.visible=true;
    start.visible=false;
    move();
    eren.collide(invisibleGround);
   // textSize=30;
   //text("PRESS RIGHT ARROW TO PLAY",300,300)
}

if(gamestate===2){

   
    score =score + Math.round(frameCount/60);
   
    eren.visible=false;
    eren1.visible=true;
    eren1.changeAnimation("eren move",erenMove)
    bg.velocityX=-4;
    monster1();
    monster2();
    if(bg.x<=370){
        bg.x=500;
    }
    jump();
    move();
//                  0,    1,   2
    // livesgroup =[live,live,live]
    for(var i=1;i<=3;i++){
        if(livesGroup[livesGroup.length-i] !==undefined){
        livesGroup[livesGroup.length-i].visible=true;
        }
    }
    
    //frameRate(10);
    eren1.collide(invisibleGround);

    if(monsterGroup.isTouching(eren1)){
       livesGroup[livesGroup.length-1].destroy();
       monsterGroup.destroyEach();
       eren1.y=500;
       hit.play();
     //  gamestate=2;
    
    }

       if(livesGroup[0]===undefined && livesGroup[1]===undefined && livesGroup[2]===undefined){
            console.log("life gone");
            gamestate=0;
            die.play();
    }

    if(score>=100)
    {gamestate=3}


}
if(gamestate===3){
    monsterGroup.destroyEach();
    boss.visible=true;
    //boss.velocityY=eren1.y;
    //boss.velocityX=eren1.x;
    bg.changeImage("bg2",bg3);
    bg.velocityX=-4;
    if(bg.x<=400){
        bg.x=500;
    
    }
eren1.collide(invisibleGround);
jump();
if(eren1.position.y<=480){
    eren1.changeAnimation("eren move",erenMove)
}
//console.log(eren.position.y);

if(eren1.isTouching(boss) && keyDown(UP_ARROW)){
    boss.destroy();
}
if(keyDown("RIGHT_ARROW")){
    eren1.velocityX=2;
    console.log("move right")
}
   
}

drawSprites();
if(gamestate===2){
textSize(20)
stroke("red");
fill("black");
text("Score: "+score,500,100);
//text(mouseX+","+mouseY,mouseX,mouseY)
}
}


function jump(){
   
    if(keyDown("UP_ARROW") && eren1.y>300){
        //frameRate(1);
       // livesGroup.visible=true;
        eren1.velocityY=-6;
        eren1.changeAnimation("eren jump",erenJump);

    }
    if(keyWentDown("UP_ARROW") && eren1.y>300){
        jumpSound.play();
    }
    eren1.velocityY=eren1.velocityY+0.8;

}
   
function move(){
    if(keyDown("RIGHT_ARROW")){
        gamestate=2;
    }
}

function monster1(){
    if(frameCount%60===0){
    monster=createSprite(1000,500);
    monster.velocityX=-8;
    monster.addAnimation("monster",mons1Move);
    monster.scale=1.9;
    monster.setCollider("rectangle",0,0,50,40);
   // monster.debug=true;
     monsterGroup.lifetime=250;
     monsterGroup.add(monster);
    }
}

function monster2(){
     if(frameCount%70===0){
         mons2=createSprite(1000,random(50,400));
         mons2.addImage("mons",flyMons);
         mons2.setCollider("rectangle",0,0,200,100);
        // mons2.debug=true;
         mons2.scale=0.8;
         mons2.velocityX=-15;
         mons2.lifetime=250;
         monsterGroup.add(mons2)
     }
}


function mouseClicked(){
    if(gamestate===0){
        clear();
        
   vid.show();
    vid.play();
    vid.volume(1);
   vid.position(185,150)
    vid.size(1000,500);
 
}}