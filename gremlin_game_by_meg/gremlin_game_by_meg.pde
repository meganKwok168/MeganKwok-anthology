int mode = 0; // 0 = none, 1 = one gremlin, 2 = two player gremlin, 3 = play against comp gremlin
boolean running = false;

int GREMLIN_0 = 0;
int GREMLIN_1 = 1;
int FOOD = 2;
int GROUND = 3;

int NUM_TRACTS = 10;
int FOOD_DENSITY = 30;

Gremlin Gremlin_0;
Gremlin Gremlin_1;  
Grid[][] grid;

//color combos:

color GREMLIN_0_COLOR = #8795A0;
color GREMLIN_1_COLOR = #9D93b5;
color FOOD_COLOR = #A38F86 ;
color GROUND_0_COLOR = #ECE3E6;
color GROUND_1_COLOR = #E1C2C7;


int colorMode = 0;

cellObjects cellObj;

void setup(){
  background(#903500);
  size(800, 900);
  // Instantiate the cellObjects class
  cellObj = new cellObjects(FOOD_DENSITY);
  dashboardSet();
  colorDash();
}

void draw(){
  cellObj.display();
  colorDash();
}

void generateComp(){
  int axis = int(random(0,2));
  int choose = int(random(0,2));
  if (choose == 0){
    Gremlin_1.action(axis,-1);  
  }
  else if (choose == 1){
    Gremlin_1.action(axis,1);
  }
}

void dashboardSet(){
  fill(#903500);
  stroke(255);
  rect(10, height - 80, 210, 70);
  textSize(25);
  fill(GROUND_0_COLOR);
  textAlign(LEFT, CENTER);    
  text("Score 0: --", width / (NUM_TRACTS*2), height - 60);
  text("Score 1: --",width / (NUM_TRACTS*2), height - 30);
}

  void dashboard(Gremlin gremlin0, Gremlin gremlin1) {
    fill(#903500);
    stroke(255);
    rect(10, height -80, 210,70);
    textSize(25);
    fill(GROUND_0_COLOR);
    textAlign(LEFT, CENTER);
    text("Score 0: " + gremlin0.score, width / (NUM_TRACTS*2), height - 60);
    if (mode != 1) {
      text("Score 1: " + gremlin1.score, width / (NUM_TRACTS*2), height - 30);
    } 
    else {
      text("Score 1: --", width / (NUM_TRACTS*2), height - 40);
    }
  }
  
  void colorDash(){
    noStroke();
    int w = (width/NUM_TRACTS)-5;
    if (colorMode == 0) {
      fill(#903500);
      rect(6.5 * width / NUM_TRACTS, height - 45, 300, 25);
      fill(#fff3b0,61); // Highlight color
      rect(6.5 * width / NUM_TRACTS, height - 45, w, 25);
    } 
    else if (colorMode == 1) {
      fill(#903500);
      rect(6.5 * width / NUM_TRACTS, height - 45, 300, 25);
      fill(#fff3b0,61); // Highlight color
      rect(7.5 * width / NUM_TRACTS, height - 45, w, 25);
    } 
    else if (colorMode == 2) {
      fill(#903500);
      rect(6.5 * width / NUM_TRACTS, height - 45, 300, 25);
      fill(#fff3b0,61); // Highlight color
      rect(8.5 * width / NUM_TRACTS, height - 45, w, 25);
    }
    stroke(255);
    fill(#E1C2C7);
    textSize(17);
    rect(6.5*width/NUM_TRACTS,height-70,w, 20,5);
    textAlign(CENTER,TOP);
    text("pink!!!!", (6.5*width/NUM_TRACTS) + (0.5*w),height-40);
    fill(#e0dcaa);
    rect((7.5*width/NUM_TRACTS),height-70,w, 20,5);
    text("retro", (7.5*width/NUM_TRACTS)+(0.5*w),height-40);
    fill(#bbb0cb);
    rect((8.5*width/NUM_TRACTS),height-70,w, 20,5);
    text("lavendar", (8.5*width/NUM_TRACTS)+(0.5*w),height-40);

  }
  
  
void keyPressed(){
  if (key == 'r'){
    cellObj.instantiater(0);
    cellObj.instantiater(FOOD_DENSITY);
    running = false;
  }
  else if (key == ' '){
    running = !running;
    println("running: " + running);
  }
  else if (key == '1'){
    running = false;
    mode = 1;
    cellObj.spawn(mode);
    println("mode1 -- gremlin");
  }
  else if (key == '2'){
    running = false;
    mode = 2;
    cellObj.spawn(mode);
    println("mode2 -- gremlin v gremlin");
  }
  else if (key == '3'){
    running = false;
    mode = 3;
    cellObj.spawn(mode);
    println("mode3 -- gremlin v comp");
  }
  else if (keyCode == UP){
    if (mode == 1){
      Gremlin_0.action(1,-1);
    }
    else if (mode == 2){
      Gremlin_1.action(1,-1);
    }
    else if (mode == 3){
      Gremlin_0.action(1,-1);
      generateComp();
    }
    dashboard(Gremlin_0, Gremlin_1);
  }
  else if (keyCode == DOWN){
    if (mode == 1){
      Gremlin_0.action(1,1);
    }
    else if (mode == 2){
      Gremlin_1.action(1,1);
    }
    else if (mode == 3){
      Gremlin_0.action(1,1);
      generateComp();
    }
    dashboard(Gremlin_0, Gremlin_1);
  }
  else if (keyCode == RIGHT){
    if (mode == 1){
      Gremlin_0.action(0,1);
    }
    else if (mode == 2){
      Gremlin_1.action(0,1);
    }
    else if (mode == 3){
      Gremlin_0.action(0,1);
      generateComp();
    }
    dashboard(Gremlin_0, Gremlin_1);
  }
  else if (keyCode == LEFT){
    if (mode == 1){
      Gremlin_0.action(0,-1);
    }
    else if (mode == 2){
      Gremlin_1.action(0,-1);
    }
    else if (mode == 3){
      Gremlin_0.action(0,-1);
      generateComp();
    }
    dashboard(Gremlin_0, Gremlin_1);
  }
  else if (key == 'w'){
    if (mode != 3){
      Gremlin_0.action(1,-1);
    }
    else if (mode == 3){
      Gremlin_0.action(1,-1);
      generateComp();
    }
    dashboard(Gremlin_0, Gremlin_1);
  }
  else if (key == 's'){
    if (mode != 3){
      Gremlin_0.action(1,1);
    }
    else if (mode == 3){
      Gremlin_0.action(1,1);
      generateComp();
    }
    dashboard(Gremlin_0, Gremlin_1);
  }
  else if (key == 'a'){
    if (mode != 3){
      Gremlin_0.action(0,-1);
    }
    else if (mode == 3){
      Gremlin_0.action(0,-1);
      generateComp();
    }
    dashboard(Gremlin_0, Gremlin_1);
  }
  else if (key == 'd'){
    if (mode != 3){
      Gremlin_0.action(0,1);
    }
    else if (mode == 3){
      Gremlin_0.action(0,1);
      generateComp();
    }
    dashboard(Gremlin_0, Gremlin_1);
  }
  
  else if (key == 'c'){
    if (colorMode == 0){
      colorMode++;
          GREMLIN_0_COLOR = #413315;
    GREMLIN_1_COLOR = #b78d31;
    FOOD_COLOR = #8b5633;
    GROUND_0_COLOR = #cce3c2;
    GROUND_1_COLOR = #e0dcaa;

    }
    else if (colorMode == 1){
      colorMode++;
    GREMLIN_0_COLOR = #bad6da;
    GREMLIN_1_COLOR = #e9c5c5;
    FOOD_COLOR = #f3edbd;
    GROUND_0_COLOR = #b6c687;
    GROUND_1_COLOR = #bbb0cb;
    }
    else if (colorMode == 2){
      colorMode = 0;
    GREMLIN_0_COLOR = #8795A0;
    GREMLIN_1_COLOR = #9D93b5;
    FOOD_COLOR = #A38F86 ;
    GROUND_0_COLOR = #ECE3E6;
    GROUND_1_COLOR = #E1C2C7;
    }
    colorDash();
  }
}
