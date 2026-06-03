class Animal extends PhysicalObjectWrapper{
  
  Animal(float x, float y, float diameter){
    body = new FCircle(diameter);
    body.setPosition(x, y);
    objects.add(this);
    body.setAllowSleeping(false);
  }
  
    float[] getPostion(){
    return new float[]{body.getX(), body.getY()};
  }
}
