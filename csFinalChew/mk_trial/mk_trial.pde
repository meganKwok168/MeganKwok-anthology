import fisica.*; //import Fisica body library

//Project by Megan Kwok, Leo Schneiderman, William Li

FWorld world;
Bird[] birds;
Pig[] pigs;

int score = 0; // +++++++++++++++++++++++++++++++++++++++++++++++++++++++new
int scoreHighest; //+++++++++++++++++++++++++++++++++++++++++++++++++++++++ new

ArrayList<PVector> pigPlaces = new ArrayList<PVector>();

boolean paused = false;

//boxes
ArrayList<Box> boxes;//array list of all boxes
ArrayList<Box> hBoxes;
ArrayList<Box> vBoxes;


FBody anchor;//the anchor from which the bird is slingshotted
FDistanceJoint sling;  //the sling that the bird is slingshotted on
Slingshot slingshot;//the entire slingshot abstraction. Includes the bird iteslf, the sing, and the anchor
PImage boxImage;//the image used for boxes
PImage birdImage;//the image used for birds
PImage pigImage; //the image used for pigs

Bird currentBird; //the bird currently being tracked and launched.
int birdCounter;//starts at 0. After one bird is launched, becomes 1, then two, etc. Used to select the right currentBird from the array of birds. Linked list might be more intutiative for this purpse and may be added later.

ArrayList<PhysicalObjectWrapper> objects;//arrayList of all physical objects. 
//PhysicalObjectWrapper is an object to store both the FBodys on the screen and other attributes associated with them (e.g., image)

void setup(){
  fullScreen();//we are working in full screen
 
  //load images
  loadImages();
 
  //make arrayList of all objects
  objects = new ArrayList<PhysicalObjectWrapper>();
 
  //world stuff. Edges and gravity and stuff like that.
  makeWorld();
 
  //object creation
  makeBirds();//create all the birds
  makeBoxes();//create all the boxes
  makePigs();//create all the pigs
 
  birdCounter = 0;//birdCounter starts at 0. 
  currentBird = birds[birdCounter];//the current bird being tracked and launched is the birdCounter index of the birds array
  makeSlingshot();//we create the slingshot
 
} //setup  

void draw(){
  if(!paused){world.step();//move the FBodys by one frame
  
  if(distance(slingshot.anchor, slingshot.bird.body) < slingshot.springlength && !mousePressed){//release from the slingshot if the mouse is not pressed and it's closer than the springlength
    if (slingshot.sling != null){//don't remove the sling if it's already been removed!
      world.remove(slingshot.sling);//remove the sling from the world. The bird is now free to fly!
      slingshot.sling = null;//the sling is removed from the slingshot object too
      println("removing sling");
    }
    currentBird.launched = true;//the bird has now been launched
  }
  switchBird();//change the currentBird to the next bird
                            
  for(Pig pig : pigs){
    pig.checkTouch();
  }
  }
  display();//display everything
  
  for (int i = 0; i < hBoxes.size(); i++){
    text(i, hBoxes.get(i).x, hBoxes.get(i).y);
  }
  
  textSize(50);
  fill(0);
  textAlign(BOTTOM,RIGHT);
  text("Score: "+ score + "/" + scoreHighest, 20,100);
  
} //draw

void makeWorld(){
  Fisica.init(this);//initiate the world into the driver
  world = new FWorld();//create a new FWorld object where everything will be
  world.setGravity(0, 588);//set the gravity. 
  //add borders to the world
  world.setEdges(0, - height + 50, 2*width - 50, height - 30, color(0));  //creates 4 static bodies which limits the world to the borders of the sketch
}

void loadImages(){
  boxImage = loadImage("box.png");//load the box image
  birdImage = loadImage("redBird.png");//load the bird image
  pigImage = loadImage("pig.png"); //load the pig image
}

void display(){
  background(#F2E2E4); //allegedly pink [i'm colorblind]
  float camX = 0;//X translation
  float camY = 0;//Y translation
  pushMatrix();//store current translation
    if (currentBird.body.getX() > width / 4){
    camX = width/4 - currentBird.body.getX();//camera should follow the bird
    //camY = 3*height/5 - currentBird.body.getY(); Y value should not change. this is thus commented out
  }
  translate(camX, camY);//translate to current view
  world.draw();//draw all FBodies
  drawAllObjects();//draw all custom image functions 
  popMatrix();//restore default translation
}

void makeBirds(){
  birds = new Bird[3];//make the birds array with length 3
  for(int i = 0; i < birds.length; i++){
    birds[i] = new Bird(200 - 50 * i, world.bottom.getY() - 50, 25);//make a new bird at a location in a line of birds
    birds[i].body.setGroupIndex(-1);//birds should not collide with the anchor.
  }
  for(Bird bird : birds){
    world.add(bird.body);//add all birds to world
  }
}

void makePigs(){
  pigs = new Pig[3];
  for (int i = 0; i < pigs.length; i++){
    pigs[i] = new Pig(pigPlaces.get(i).x, pigPlaces.get(i).y -(25/2) - 50, 25);
  }
  for (Pig pig : pigs){
    world.add(pig.body);
    objects.add(pig);
    scoreHighest += pig.value; //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++new
    println(scoreHighest);  
}
}

void makeSlingshot(){
  if (currentBird != null){
    slingshot = new Slingshot(currentBird, 75);
  }
}

void makeBoxes(){
  
  pigPlaces.clear();
  
  boxes = new ArrayList<Box>();
  hBoxes = new ArrayList<Box>();
  vBoxes = new ArrayList<Box>();
  
  float y = world.bottom.getY();
  
  //horizontal boxes
  int horizNum = int(random(5,10));
  for (int i = 0; i < horizNum; i ++){
    float x = random(width/4, 4*width/5);
    y -= random(20,70);
    float w = random(80,200);
    float h = 20;
    
    Box hbox = new Box(x, y-30, w, h);
    hBoxes.add(hbox);
    
    //textSize(70);
    //text(i, x,y);
    
    float firstX = x-(w/4); //at 1/4 mark
    float secondX = x+(w/4); //at 3/4 mark

    boolean pillarDrawnFirst = false;
    boolean pillarDrawnSecond = false;

    float hPillarFirst = 0;
    float hPillarSecond = 0;
    float yPillarFirst = 0;
    float yPillarSecond = 0;
    
    int j = i-1;
    
    while (j > 0){
      
      //firstX in range or not
      boolean inRangeFirst = firstX >= hBoxes.get(j).minX && firstX <= hBoxes.get(j).maxX;      
           
      if (inRangeFirst && !pillarDrawnFirst){
        hPillarFirst = abs(hBoxes.get(i).bottomY - hBoxes.get(j).topY);
        yPillarFirst = hBoxes.get(j).topY - (hPillarFirst/2);
        pillarDrawnFirst = true;
      }

      boolean inRangeSecond = secondX >= hBoxes.get(j).minX && firstX <= hBoxes.get(j).maxX;
      if (inRangeSecond && !pillarDrawnSecond){
        hPillarSecond = abs(hBoxes.get(i).bottomY - hBoxes.get(j).topY);
        yPillarSecond = hBoxes.get(j).topY - (hPillarSecond/2);
        pillarDrawnSecond = true;
      }
      
      j--;
    }
    
    if(!pillarDrawnFirst){
      hPillarFirst = abs(hBoxes.get(i).bottomY - world.bottom.getY());
      yPillarFirst = world.bottom.getY() - (hPillarFirst/2);
    }
    if(!pillarDrawnSecond){
      hPillarSecond = abs(hBoxes.get(i).bottomY - world.bottom.getY());
      yPillarSecond = world.bottom.getY() - (hPillarSecond/2);
    }

    vBoxes.add(new Box(firstX, yPillarFirst-15, 20, hPillarFirst));
    vBoxes.add(new Box(secondX, yPillarSecond-15, 20, hPillarSecond));

    pigPlaces.add(new PVector(int(random(x-(w/2)+5, x+(w/2)-5)),y)); //pigPlacement adding
  }
  
  for (int i = 0; i < hBoxes.size(); i++){
    boxes.add(vBoxes.get(i * 2));
    boxes.add(vBoxes.get((i * 2) + 1));
    boxes.add(hBoxes.get(i));
  }
  
  for (Box box: boxes){
    world.add(box.body);
  }
  
}

void reset(){
  birds = null;
  boxes = null;
  slingshot = null;
  objects = new ArrayList<PhysicalObjectWrapper>();
  world.clear();
  score = 0;
  scoreHighest = 0; //++++++++++++++++++++++++++++++++++++++++++new 6/14
  makeWorld();
  makeBirds();
  makeBoxes();
  makePigs();
  currentBird =birds[0];
  birdCounter = 0;
  makeSlingshot();

}

float distance(FBody body1, FBody body2){
  return sqrt(pow(body1.getX() - body2.getX(), 2) + pow(body1.getY() - body2.getY(), 2));
}


void switchBird(){

  float velocity = currentBird.velocity();
//  println(currentBird.body.getVelocityX() + ", " + currentBird.body.getVelocityY());

  if (currentBird.launched && velocity < 10){
    if (birdCounter + 1 < birds.length){
      currentBird = birds[birdCounter + 1];
      currentBird.body.setPosition(200f, world.bottom.getY() - 50);
      //world.remove(birds[birdCounter].body);
      //birds[birdCounter] = null;
      //println("Bird removed: "+birdCounter);
      birdCounter++;
      makeSlingshot();
     // println("Bird loaded: "+birdCounter);
    }
  }
}


void drawAllObjects(){//DOESN'T WORK RIGHT
  for(PhysicalObjectWrapper object : objects){
    if(object.image != null){
      object.display();
    }
  }
}

void mousePressed(){
  text("y: " + mouseY, mouseX, mouseY);
}

void keyPressed(){
  if (key == 'r'){
    reset();
  } 
  else if (key == ' '){
    paused = !paused;
  }
}
