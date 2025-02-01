class Gremlin {
  
  int score;
  boolean player;
  int playerNum;
  
  int x, y;
  
  int rows = NUM_TRACTS;
  int cols = NUM_TRACTS;
  
  Gremlin(int posX, int posY, int plyrNum, boolean plyr){ //true = human; false = comp
    score = 0;
    playerNum = plyrNum;
    grid[posY][posX].state = playerNum;
    x = posX;
    y = posY;
    player = plyr;
    println ("Gremlin "+playerNum+" created");
  }
  
    void display(){
    for (int r = 0; r < rows; r++){
      for (int c = 0; c < cols; c ++){
        if (grid[r][c] != null){
          grid[r][c].display();   
        }
      }
    }
  } //display -- calls to display grid
      
  void action(int axis, int change){ //axis 0 = horizontal, axis 1 = vertical
    if (axis == 1) { 
      int tempY = y + change;
      if (tempY >= 0 && tempY < rows) {
        if (grid[tempY][x].state == FOOD) {
          score += 1;
          println("Gremlin "+playerNum+" scored 1 pt -- score: "+score);
        }
        grid[tempY][x].state = playerNum;
        grid[y][x].state = GROUND;
        y = tempY;
        println("Gremlin "+playerNum+" moved "+change+" vertically");
      }
    }
    else if (axis == 0) {
      int tempX = x + change;
      if (tempX >= 0 && tempX < cols) {
        if (grid[y][tempX].state == FOOD) {
          score += 1;
          println("Gremlin "+playerNum+" scored 1 pt -- score: "+score);
        }
        grid[y][tempX].state = playerNum;
        grid[y][x].state = GROUND;
        x = tempX;
        println("Gremlin "+playerNum+" moved "+change+" horizontally");
      }
    }
    display();
  }
  }
  
  
  
  

  
  
  
  
  
