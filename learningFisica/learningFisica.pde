import fisica.*; //import Fisica physics library

FWorld world;
boolean dragging = false;
FCircle b;
FBody anchor;
FDistanceJoint sling;
void setup(){
  background(#f2e2e4);
  size(800,600);
  Fisica.init(this);
  world = new FWorld();
  world.setGravity(0, 500); //not sure how to make this accurate
 
 
  //add borders to the world
  world.setEdges();  //creates 4 static bodies which limits the world to the borders of the sketch
                    //access: world.left, right,bottom,top
  world.remove(world.top);



  
  anchor = new FCircle(1);
  anchor.setPosition(width/3, world.bottom.getY()-200);
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

  sling.setFrequency(2);
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
  world.draw();
} //draw

FBody[] bodies = new FBody[5];

float getDistance(float x1, float y1, float x2, float y2){
  return sqrt(sq(x1-x2) + sq(y1-y2));
}

void mousePressed(){
  if (getDistance(mouseX, mouseY, b.getX(), b.getY()) <= b.getSize()/2){
    dragging = true;

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
}

int springLength = 50;
