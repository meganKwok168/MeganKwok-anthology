import fisica.*; //import Fisica physics library

FWorld world;
boolean dragging = false;
FCircle b;
FBody anchor;
FDistanceJoint sling;
boolean following;

void setup(){
  background(#f2e2e4);
  size(800,600);
  following = false;
  
  Fisica.init(this);
  world = new FWorld();
  world.setGravity(0, 500); //not sure how to make this accurate
 
 
  //add borders to the world
  world.setEdges(/*0,0,width,height-30,color(#f2e2e4)*/);  //creates 4 static bodies which limits the world to the borders of the sketch
                    //access: world.left, right,bottom,top
  world.remove(world.top);
  //world.remove(world.right);


  
  anchor = new FCircle(1);
  anchor.setPosition(width/4, world.bottom.getY()-200);
  anchor.setGroupIndex(-1);
  anchor.setStatic(true);
  world.add(anchor);
  bodies[1] = anchor;
  
  //declare and construct a variable type FBox
  b = new FCircle(30);
  b.setPosition(anchor.getX(), anchor.getY() + springLength); //around the middle
  b.setGroupIndex(-1);
  world.add(b);  //body "falls" from the screen
  bodies[0] = b;
  
  sling = new FDistanceJoint(anchor, b);

  sling.setFrequency(3.5);
  sling.setDamping(0.1);
  world.add(sling); 
  
} //setup  

void draw(){
  background(#f2e2e4);
  world.step();
  if(getDistance(anchor.getX(), anchor.getY(), b.getX(), b.getY()) < springLength && !dragging){
    println("removing");
    world.remove(sling);
  }
  println(getDistance(anchor.getX(), anchor.getY(), b.getX(), b.getY()));
  
  if (b.getX() > 300){
    pushMatrix();
    float camX = width/4 - b.getX();
    float camY = 3*height/5 - b.getY();
    translate(camX, camY);
    world.draw();
    popMatrix();
    following = false;
  }
  else{
  world.draw();
  }


} //draw

FBody[] bodies = new FBody[5];

float getDistance(float x1, float y1, float x2, float y2){
  return sqrt(sq(x1-x2) + sq(y1-y2));
}

void mousePressed(){
  if (getDistance(mouseX, mouseY, b.getX(), b.getY()) <= b.getSize()/2){
    dragging = true;
    following = false;
  }
}

//void mouseDragged(){
//  if(dragging){
//    b.setPosition(mouseX, mouseY);
//  }
//}

void mouseReleased(){
  if(dragging){
    dragging = false;
  }
  following = true;
}

int springLength = 50;

//void keyPressed(){
//  if (key == 'r'){
//    reset();
//  }
//}

//void reset(){
//  b = null;
//  anchor = null;
//  sling = null;
//  world.clear();
//}
