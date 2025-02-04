class Food {
  boolean exist;
  int timeLeft;
  int sqSize = width/NUM_TRACTS; //size
  int x;
  int y;
  
  Food(int _x, int _y){
    x = _x;
    y = _y;
    grid[x][y] = new Grid(x,y, sqSize, GROUND);

  }

  void timeInstantiate(){
    timeLeft = int(random(20,30));
  }
  
  void timeTrack(){
    if (timeLeft > 0){
      timeLeft --;
    }
    timeLeft = 0;
      
  }
  
  
  
  
  
  
  
}
