import fisica.*; // Fisica physics engine
import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.IOException;

// Project by Megan Kwok, Leo Schneiderman, William Li

// ===================== GLOBAL VARIABLES =====================
FWorld world;

ArrayList<Bird> birds;
ArrayList<Pig> pigs;
ArrayList<Box> boxes;
ArrayList<PhysicalObjectWrapper> objects;

FBody anchor;
FDistanceJoint sling;
Slingshot slingshot;

Bird currentBird;
int birdCounter;

PImage boxImage;
PImage birdImage;
PImage pigImage;

BoxOutline protoBoxSmall;
BoxOutline protoBoxBig;
PigOutline protoPig;

Prototype currentlySelected;

boolean gravity = true;
float XYPrecision = 1;
float RPrecision = 0.04;

String currentlyStoredData;

// ===================== SETUP & DRAW =====================
void setup() {
  fullScreen();
  loadImages();
  makeWorld();
  world.clear();  // Clean start
  makeWorld();

  objects = new ArrayList<PhysicalObjectWrapper>();
  boxes = new ArrayList<Box>();
  birds = new ArrayList<Bird>();
  pigs = new ArrayList<Pig>();

  protoBoxSmall = new BoxOutline(100, 100, 20, 100, 0);
  protoBoxBig = new BoxOutline(200, 100, 20, 200, 0);
  protoPig = new PigOutline(300, 100, 25, 0);
}

void draw() {
  world.step();   // Advance physics simulation
  display();      // Draw all objects
}

// ===================== INITIALIZATION HELPERS =====================
void makeWorld() {
  Fisica.init(this);
  world = new FWorld();
  world.setGravity(0, gravity ? 588 : 0);
  world.setEdges(0, -height + 50, 2 * width - 50, height - 30, color(0));
}

void loadImages() {
  boxImage = loadImage("box.png");
  birdImage = loadImage("redBird.png");
  pigImage = loadImage("pig.png");
}

// ===================== DISPLAY =====================
void display() {
  background(255);
  world.draw();

  protoBoxBig.display();
  protoBoxSmall.display();
  protoPig.display();

  if (currentlySelected != null) {
    currentlySelected.display();
  }

  for (PhysicalObjectWrapper object : objects) {
    object.display();
  }
}

// ===================== SLINGSHOT =====================
void makeSlingshot() {
  if (currentBird != null) {
    slingshot = new Slingshot(currentBird, 25);
  }
}

// ===================== INPUT HANDLING =====================
void keyPressed() {
  if (key == ' ') {
    println(getWorldData());
    return;
  }

  if (key == 'r') {
    world.clear();
    makeWorld();
    objects = new ArrayList<PhysicalObjectWrapper>();
    boxes = new ArrayList<Box>();
    birds = new ArrayList<Bird>();
    pigs = new ArrayList<Pig>();
    return;
  }

  if (key == 'g') {
    gravity = !gravity;
    world.setGravity(0, gravity ? 588 : 0);
    return;
  }

  if (currentlySelected == null) return;

  boolean adjustSize = mousePressed;

  switch (key) {
    case 'w':
      if (adjustSize) {
        currentlySelected.h += XYPrecision;
      } else {
        currentlySelected.y -= XYPrecision;
      }
      break;
    case 's':
      if (adjustSize) {
        currentlySelected.h -= XYPrecision;
      } else {
        currentlySelected.y += XYPrecision;
      }
      break;
    case 'a':
      if (adjustSize) {
        currentlySelected.w -= XYPrecision;
      } else {
        currentlySelected.x -= XYPrecision;
      }
      break;
    case 'd':
      if (adjustSize) {
        currentlySelected.w += XYPrecision;
      } else {
        currentlySelected.x += XYPrecision;
      }
      break;
  }

  switch (keyCode) {
    case LEFT:
      currentlySelected.r += RPrecision;
      break;
    case RIGHT:
      currentlySelected.r -= RPrecision;
      break;
    case ENTER:
      currentlySelected.generate();
      currentlySelected = null;
      return;
  }

  switch (key) {
    case 'i':
      XYPrecision *= 1.1;
      break;
    case 'k':
      XYPrecision /= 1.1;
      break;
    case 'e':
      currentlySelected.r += PI / 2;
      break;
    case 'q':
      currentlySelected.r = 0;
      break;
  }
}

void mousePressed() {
  if (protoBoxSmall.mouseIsOver()) {
    currentlySelected = protoBoxSmall.copy();
  } else if (protoBoxBig.mouseIsOver()) {
    currentlySelected = protoBoxBig.copy();
  } else if (protoPig.mouseIsOver()) {
    currentlySelected = protoPig.copy();
  }
}

void mouseDragged() {
  if (currentlySelected != null) {
    currentlySelected.x = mouseX;
    currentlySelected.y = mouseY;
  }
}

// ===================== DATA EXPORT =====================
String getWorldData() {
  String data = "Bird, 200.0, 672.60016, 0.0, 25.0, 25.0\n";
  data += "Bird, 150.0, 672.60016, 0.0, 25.0, 25.0\n";
  data += "Bird, 100.0, 672.60016, 0.0, 25.0, 25.0\n";

  for (PhysicalObjectWrapper object : objects) {
    data += object.getClass().getSimpleName() + ", " +
            object.body.getX() + ", " +
            object.body.getY() + ", " +
            object.body.getRotation() + ", " +
            object.getWidth() + ", " +
            object.getHeight() + "\n";
  }

  currentlyStoredData = data;
  println("\n" + data + "\n");
  return data;
}
