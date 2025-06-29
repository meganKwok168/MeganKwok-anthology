import fisica.*; // Physics engine

// Project by Megan Kwok, Leo Schneiderman, William Li

// ===================== GLOBAL VARIABLES =====================
FWorld world;
ArrayList<Bird> birds; // List of bird objects
ArrayList<Pig> pigs;   // List of pig objects
ArrayList<Box> boxes;  // List of box objects
ArrayList<PhysicalObjectWrapper> objects; // List of all drawable physics objects

Bird currentBird;     // The bird currently in the slingshot
int birdCounter = 0;  // Tracks which bird is currently active

Slingshot slingshot;  // Slingshot object that launches birds

int score = 0;//initial score
int scoreHighest = 0;//highest possible score (goes up with each pig construction)

PImage boxImage, birdImage, pigImage, background;//all images. background currently not used.

FBody anchor;             // Anchor point for slingshot
FDistanceJoint sling;     // Spring joint between bird and slingshot

// Strings to store level data
String level1, level2, level3;
String currentlyStoredData;//the current level data

boolean isPaused = true; // Game starts paused
String[] pauseOptions = {"Resume", "Restart Level", "Level 1", "Level 2", "Level 3", "Exit"};
int selectedPauseOption = 0;

// ===================== SETUP =====================
void setup() {
  fullScreen();     // Run the game in full-screen mode
  loadImages();     // Load all sprites

  // Load level data from external files
  level1 = join(loadStrings("level1.txt"), "\n");
  level2 = join(loadStrings("level2.txt"), "\n");
  level3 = join(loadStrings("level3.txt"), "\n");

  // Start the game on level 1
  currentlyStoredData = level1;
  makeObjectsWithData(currentlyStoredData);

  println("Fully setup");
}

// ===================== MAIN LOOP =====================
void draw() {
  if (isPaused) {
    displayPauseMenu(); // Show pause menu
  } else {
    update();           // Game physics and logic updates
    display();          // Render game scene
  }
}

// ===================== UPDATE =====================
void update() {
  world.step(); // Advance the physics simulation

  // Launch the bird when it's pulled back and released
  if (distance(slingshot.anchor, slingshot.bird.body) < slingshot.springlength && !mousePressed) {
    if (slingshot.sling != null) {
      world.remove(slingshot.sling);
      slingshot.sling = null;
    }
    currentBird.launched = true;
  }

  switchBird(); // Check if we need to switch to the next bird. Switch bird if we do.

  // Update all pigs.
  for (Pig pig : pigs) {
    pig.checkTouch();  //check if pigs are touching ground. If they are, commence destruction.
    pig.update();      //continue dying process if dying. 
  }
}

// ===================== DISPLAY =====================
void display() {
  background(#F2E2E4); // Set background color

  float camX = 0;
  // Camera follows the bird after launch
  if (currentBird.body.getX() > width / 4) {
    camX = width / 4 - currentBird.body.getX();
  }

  pushMatrix();
  translate(camX, 0); // Move camera

 // world.draw(); // Draw physics objects. They are plain and will have art drawn atop. 
 //world.draw(); is commented out because we are using custom art for everything.
  // Draw the ground
  fill(0, 200, 100);
  rect(0, world.bottom.getY() - 10, width * 2, height + 10 - world.bottom.getY());

  drawAllObjects(); // Draw all game objects with custom art. 
  popMatrix();

  // Draw score
  textSize(50);
  fill(0);
  textAlign(BOTTOM, RIGHT);
  text("Score: " + score + " / " + scoreHighest, 20, 100);
}

// ===================== PAUSE MENU =====================
void displayPauseMenu() {
  background(0);           //black overlay
  textAlign(CENTER, CENTER);
  textSize(60);
  fill(255);
  text("Paused", width / 2, height / 4);

  textSize(40);
  for (int i = 0; i < pauseOptions.length; i++) {
    if (i == selectedPauseOption) {
      fill(255, 0, 0); // Highlight selected option
    } else {
      fill(255);
    }
    text(pauseOptions[i], width / 2, height / 2 + i * 50);
  }
}

// Handles menu choice
void handlePauseMenuSelection() {
  switch (pauseOptions[selectedPauseOption]) {
    case "Resume":
      isPaused = false;
      break;
    case "Restart Level":
      makeObjectsWithData(currentlyStoredData);
      isPaused = false;
      break;
    case "Level 1":
      currentlyStoredData = level1;
      makeObjectsWithData(level1);
      isPaused = false;
      break;
    case "Level 2":
      currentlyStoredData = level2;
      makeObjectsWithData(level2);
      isPaused = false;
      break;
    case "Level 3":
      currentlyStoredData = level3;
      makeObjectsWithData(level3);
      isPaused = false;
      break;
    case "Exit":
      exit();
      break;
  }
}

// ===================== INITIALIZATION =====================
void makeWorld() {//create the world outline
  Fisica.init(this);
  world = new FWorld();
  world.setGravity(0, 588); // Set gravity
  world.setEdges(0, -height + 50, 2 * width - 50, height - 30, color(0)); // Set world boundaries
}

void loadImages() {//load all art images
  boxImage = loadImage("box.png");
  birdImage = loadImage("redBird.png");
  pigImage = loadImage("pig.png");
  background = loadImage("background.jpg");
}

// ===================== OBJECT DRAWING =====================
void drawAllObjects() {//draw all object custom images
  for (PhysicalObjectWrapper object : objects) {
    if (object.image != null) {
      object.display(); // Display the object's custom image
    }
  }
  if(slingshot != null){
    slingshot.drawSling();//draw the sling
  }
}

// ===================== GAME LOGIC =====================
// Switch to next bird if current one has stopped moving
void switchBird() {
  float velocity = currentBird.speed();
  if (currentBird.launched && velocity < 100) {//if we're not moving so fast 
    if (birdCounter + 1 < birds.size()) {//if we have any more birds to go to
      birdCounter++;
      currentBird = birds.get(birdCounter);//change currentBird to the next bird
      currentBird.body.setPosition(200f, world.bottom.getY() - 100);//put the new bird in the right position for the slingshot
      makeSlingshot();//create the slingshot
    }
  }
}

// Create a slingshot for the current bird
void makeSlingshot() {
  if (currentBird != null) {
    slingshot = new Slingshot(currentBird, 25);//create the slingshot with the anchor 25 pixels higher than the bird
  }
}

// Helper: Compute distance between two bodies
float distance(FBody body1, FBody body2) {
  return dist(body1.getX(), body1.getY(), body2.getX(), body2.getY());
}

// ===================== INPUT =====================
void keyPressed() {
  if (isPaused) {
    if (keyCode == UP) {//go up in pause menu
      selectedPauseOption = (selectedPauseOption - 1 + pauseOptions.length) % pauseOptions.length;
    } else if (keyCode == DOWN) {//go down in pause menu
      selectedPauseOption = (selectedPauseOption + 1) % pauseOptions.length;
    } else if (key == ENTER || key == RETURN) {//select in pause menu
      handlePauseMenuSelection();
    } else if (key == 'p') {//unpause
      isPaused = false;
    }
    return;
  }

  if (key == 'p') {
    isPaused = true; // Toggle pause
  } else if (key == ' ') {
    println("\n" + getWorldData() + "\n"); // Print current level data
  } else if (key == 'r') {
    makeObjectsWithData(currentlyStoredData); // Restart level
  } else if (key == '1') {
    currentlyStoredData = level1;
    makeObjectsWithData(level1);//load level1
  } else if (key == '2') {
    currentlyStoredData = level2;
    makeObjectsWithData(level2);//load level2
  } else if (key == '3') {
    currentlyStoredData = level3;
    makeObjectsWithData(level3);//load level3
  }
}

// ===================== OBJECT MANAGEMENT =====================
// convert current world into a string that may be loaded back into a world using void makeObjectsWithData(String data);
String getWorldData() {
  String data = "";
  for (PhysicalObjectWrapper object : objects) {
    data += object.getClass().getSimpleName() + ", " +
            object.body.getX() + ", " +
            object.body.getY() + ", " +
            object.body.getRotation() + ", " +
            object.getWidth() + ", " +
            object.getHeight() + "\n";
  }
  currentlyStoredData = data;
  return data;
}

// Reconstruct all game objects from level data
void makeObjectsWithData(String data) {
  println("Creating objects from data...");

  // Reset all object lists
  birds = new ArrayList<Bird>();
  pigs = new ArrayList<Pig>();
  boxes = new ArrayList<Box>();
  objects = new ArrayList<PhysicalObjectWrapper>();
  birdCounter = 0;
  slingshot = null;
  score = 0;
  scoreHighest = 0;

  // Rebuild world
  makeWorld();//make the world with proper edges and gravity

  // Parse level data
  for (String line : data.split("\n")) {
    if (line.trim().isEmpty()) continue;//skip any empty levels.

    String[] parts = line.split(",");
    String type = parts[0].trim();
    float x = Float.parseFloat(parts[1].trim());
    float y = Float.parseFloat(parts[2].trim()) - 1; // Small offset for stability
    float r = Float.parseFloat(parts[3].trim());
    float w = Float.parseFloat(parts[4].trim());
    float h = Float.parseFloat(parts[5].trim());

    PhysicalObjectWrapper newObject;

    switch (type) {
      case "Pig":
        newObject = new Pig(x, y, w);
        break;
      case "Bird":
        newObject = new Bird(x, y, w);
        newObject.body.setGroupIndex(-1); // Avoid collisions with other birds
        break;
      case "Box":
        newObject = new Box(x, y, w, h);
        break;
      default:
        println("Unknown object type: " + type);
        return;
    }

    newObject.body.setRotation(r); // Set initial rotation
  }

  // Place the first bird in the slingshot
  currentBird = birds.get(birdCounter);
  currentBird.body.setPosition(200f, world.bottom.getY() - 100);
  makeSlingshot();
}
