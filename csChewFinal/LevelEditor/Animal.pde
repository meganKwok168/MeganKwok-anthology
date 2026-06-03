class Animal extends PhysicalObjectWrapper{
  float diameter;
  
  Animal(float x, float y, float diameter){
    body = new FCircle(diameter);
    body.setPosition(x, y);
    objects.add(this);
    body.setAllowSleeping(false);
    this.diameter = diameter;
    world.add(body);
  }
  
    float[] getPostion(){
    return new float[]{body.getX(), body.getY()};
  }
  
  float getWidth(){
    return diameter;
  }
  
  float getHeight(){
    return diameter;
  }
}
