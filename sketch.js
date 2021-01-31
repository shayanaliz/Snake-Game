let snake;
let scl=20;
let container=document.querySelector('.container');
let totalScore=document.querySelector('.total');
let food;

function setup() {
  createCanvas(600, 600);
  snake = new Snake();
  frameRate(20);
 
  food=pickLocation();
  // window.food=createVector(random(width),random(height));
  // console.log(window.food);
}

function draw() {
  background(51);
  snake.death();
  snake.update();
  snake.show();

  if(snake.eat(food)){
    food=pickLocation();
  }
  fill(255,0,100);
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
        container.style.display='block';
        this.total=0;
        this.tail=[];
        
      }
    })
  }
}

function keyPressed(){
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
    container.style.display='none';
  }
}

