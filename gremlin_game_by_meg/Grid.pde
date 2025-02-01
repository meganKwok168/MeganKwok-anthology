class Grid {
  int size;
  int sqX, sqY;
  int state;
  int nextState;
  
  Grid (int x, int y, int sz, int st){
    sqX = x;
    sqY = y;
    size = sz;
    state = st;
  } //constructor
  
  int floorColor;
  void makeFloor(){
    if ((sqX / size + sqY / size) % 2 == 0){
      fill(GROUND_0_COLOR);
      floorColor = 1;
    }
    else{
      fill(GROUND_1_COLOR);
      floorColor = 0;
    }
    square(sqX, sqY, size);
    noFill();
  }
  
  void display(){
     stroke(0);
     makeFloor();
     noStroke();
     if (state == GREMLIN_0){
       fill(GREMLIN_0_COLOR);
       circle(sqX + (size/2), sqY + (size/2), size-7);
     }
     else if (state == GREMLIN_1){
       fill(GREMLIN_1_COLOR);
       circle(sqX + (size/2), sqY + (size/2), size-7);

     }
     else if (state == FOOD){
       fill(FOOD_COLOR);
       circle(sqX + (size/2), sqY + (size/2), size-15);
     }
     else if (state == GROUND){
       noFill();
       circle(sqX + (size/2), sqY + (size/2), size-15);
     }
     noFill();
  } //display -- a square w/ colored circle on top
  
} //Grid class
