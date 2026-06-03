class Box extends PhysicalObjectWrapper{
  float w, h;
  float minX, maxX;
  float x,y;
  float topY, bottomY;

  Box(float x, float y, float w, float h){
    body = new FBox(w, h);
    body.setPosition(x, y);
    //body.setGrabbable(false);
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    minX = x - w/2;
    maxX = x + w/2;
    topY = y-(h/2);
    bottomY = y+(h/2);
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
