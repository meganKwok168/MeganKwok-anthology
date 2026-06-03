class Box extends PhysicalObjectWrapper{
  float w, h;
  
  Box(float x, float y, float w, float h){
    body = new FBox(w, h);
    body.setPosition(x, y);
    body.setGrabbable(false);
    this.w = w;
    this.h = h;
    image = boxImage;
    objects.add(this);
    body.setAllowSleeping(false);
  }
  
  
  void display(){
    imageMode(CENTER);
    pushMatrix();
    translate(body.getX(), body.getY());
    rotate(body.getRotation());
    image(image, 0, 0, w, h);//DOESN'T WORK RIGHT
    popMatrix();
  }
  
}
