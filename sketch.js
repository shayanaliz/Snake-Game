let snake;
let scl=20;
let diffContainer=document.querySelector('.difficulty');
let container1=document.querySelector('.container-1');
let container2=document.querySelector('.container-2');
let totalScore=document.querySelector('.total');
let buttons=document.querySelectorAll('button');
let counter=document.querySelector('.counter');
let food;
let colors=[255,56,100,1,186,239,32,191,85,255,95,10];
let randomIndex={
  newFill1:0,
  newFill2:1,
  newFill3:2,
};

function setup() {
  createCanvas(600, 600);
  snake = new Snake();
  frameRate(5);
  randomIndex=snake.randomColor();
 
  food=pickLocation();
}

function draw() {
  background(51);
  snake.death();
  snake.update();
  snake.show();

  if(snake.eat(food)){
    food=pickLocation();
  }
  fill(colors[randomIndex.newFill1],colors[randomIndex.newFill2],colors[randomIndex.newFill3]);
  rect(food.x,food.y,scl,scl);
}

function pickLocation(){
  let cols=floor(width/scl);
  let rows=floor(height/scl);
  food=createVector(floor(random(cols)),floor(random(rows)));
  food.mult(scl);
  return food;
}

class Snake{
  constructor(){
    this.x=0;
    this.y=0;
    this.xspeed=0;
    this.yspeed=0;
    this.total=0;
    this.tail=[];
  }
  
  randomColor(){
    let randomNr=(Math.floor(Math.random() * 4))*3;
    let newFill1=randomNr;
    let newFill2=randomNr+1;
    let newFill3=randomNr+2;
    return {
      newFill1,newFill2,newFill3
    };
  }

  update(){
    // snake.death();
    for(let i=0;i<this.tail.length-1;i++){
      this.tail[i]=this.tail[i+1];
    }
    this.tail[this.total-1]=createVector(this.x,this.y);

    this.x= this.x+this.xspeed*scl;
    this.y= this.y+this.yspeed*scl;

    this.x=constrain(this.x,0,width-scl);
    this.y=constrain(this.y,0,height-scl);
  }
  show(){
    fill(255);
    for(let i=0;i<this.total;i++){
      rect(this.tail[i].x,this.tail[i].y,scl,scl);
    }
    rect(this.x, this.y, scl,scl)
  }
  dir(x,y){
    this.xspeed=x;
    this.yspeed=y;
  }
  eat(pos){
    let d = dist(this.x,this.y,pos.x,pos.y);
    if(d<1){
      this.total++;
      counter.innerText=this.total;
      randomIndex=this.randomColor();
      return true;
    }
    else{
      return false;
    }
  }
  death(){
    this.tail.forEach(square=>{
      let d=dist(this.x,this.y,square.x,square.y);
      if(d<1){
        totalScore.innerText=this.total;
        container2.style.display='block';
        this.total=0;
        this.tail=[];
        
      }
    })
  }
}

function keyPressed(){
  container1.style.display='none';
  if(keyCode===UP_ARROW){
    if(snake.yspeed==0){snake.dir(0,-1);}
  }else if(keyCode===DOWN_ARROW){
    if(snake.yspeed==0){snake.dir(0,1);}
  }else if(keyCode===LEFT_ARROW){
    if(snake.xspeed==0){snake.dir(-1,0);}
  }else if(keyCode===RIGHT_ARROW){
    if(snake.xspeed==0){snake.dir(1,0);}
  }
  if(keyCode===32){
    container2.style.display='none';
    container1.style.display='block';
  }
}

function chooseDifficulty(e){
  switch(e.target.className){
    case 'easy':
      frameRate(15);
      break;
    case 'medium':
      frameRate(25);
      break;
    case 'hard':
      frameRate(35);
      break;
  }
  diffContainer.style.display='none';
  container1.style.display='block';
}

buttons.forEach(button=>{
  button.addEventListener('click',function(e){
    chooseDifficulty(e);
  });
})