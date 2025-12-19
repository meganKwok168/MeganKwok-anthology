class PhysicalObjectWrapper{
  PVector previousVelocity;
  float previousSpeed;
  FBody body;
  PImage image;
  
  void correctSuddenStopIssue(){//
    if(previousVelocity != null){
      if(previousSpeed != 0 && velocity() == 0){
        if(previousSpeed - velocity() > 10){
          println("something went wrong!!!");
          body.setVelocity(previousVelocity.x, previousVelocity.y);
        }
      }
    }
    previousSpeed = velocity();
    previousVelocity = new PVector(body.getVelocityX(), body.getVelocityY());
  }
  
    float[] getPostion(){
    return new float[]{body.getX(), body.getY()};
  }
  
  void display(){
  }
  
  float velocity(){
    return sqrt(sq(body.getVelocityX()) + sq(body.getVelocityY()));
  }
}
