class cellObjects{
  
  
  int rows = NUM_TRACTS;
  int cols = NUM_TRACTS;
  
  cellObjects(int foodDensity){
    grid = new Grid[rows][cols];
    instantiater(foodDensity);
  }
  
  void putFoodIn(int foodAmt){
    //instantiates food
    float amt = (foodAmt * 0.01)*(rows*cols); //# of objs to take up for food
    int counter = 0;  
    while (counter < amt){
      int x = int(random(0,NUM_TRACTS));
      int y = int (random(0, NUM_TRACTS));
      if (grid[y][x].state != FOOD && x > 0 && x < cols - 1 && y > 0 && y < rows - 1){
        grid[y][x].state = FOOD;
        counter++;
        println("grid(" + x + ", " + y + ") is food -- " + counter + "/" + int(amt + 1));
      }
    }    
  }
  
  void spawn(int mode){
    instantiater(FOOD_DENSITY);    
    if (mode == 1){
      Gremlin_0 = new Gremlin(0, cols-1,GREMLIN_0,true);
      Gremlin_0.display();
    }
    if (mode == 2){
      Gremlin_0 = new Gremlin(0, cols-1,GREMLIN_0,true);
      Gremlin_1 = new Gremlin(rows-1, 0,GREMLIN_1,true);
      Gremlin_0.display();
      Gremlin_1.display();
    }
    if (mode == 3){
      Gremlin_0 = new Gremlin(0, cols-1,GREMLIN_0,true);
      Gremlin_1 = new Gremlin(rows-1, 0,GREMLIN_1,false);
      Gremlin_0.display();
      Gremlin_1.display();
    }  
  }
  
  void instantiater (int foodAmt){
    for (int r = 0; r < rows; r++){
      for (int c = 0; c < cols; c ++){
        int sqSize = width/cols; //size
        int xPl = sqSize * c; //x place calc
        int yPl = sqSize * r; //y place calc
        grid[r][c] = new Grid(xPl, yPl, sqSize, GROUND);

      }
    }
    putFoodIn(foodAmt);
  } //instantiater 
  
  
  void display(){
    for (int r = 0; r < rows; r++){
      for (int c = 0; c < cols; c ++){
        if (grid[r][c] != null){
          grid[r][c].display();   
        }
      }
    }
  } //display -- calls to display grid
}
