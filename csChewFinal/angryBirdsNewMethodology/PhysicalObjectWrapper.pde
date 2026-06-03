class PhysicalObjectWrapper{
  FBody body;//the simulated body
  PImage image;//the drawn image
  
  void display(){
  }
  
  float speed(){
    return sqrt(sq(body.getVelocityX()) + sq(body.getVelocityY()));
  }
  
  float getWidth(){
    return 0f;
  }
  
  float getHeight(){
    return 0f;
  }
}
