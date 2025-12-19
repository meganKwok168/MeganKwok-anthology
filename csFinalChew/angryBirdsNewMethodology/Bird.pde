class Bird extends Animal{
  
  boolean launched;
  
  Bird(float x, float y, float diameter){
    super(x, y, diameter);
    image = birdImage;
    body.setDensity(100);
    birds.add(this);
    launched = false;
  }
  
  void display(){
    imageMode(CENTER);
    pushMatrix();
    translate(body.getX(), body.getY());
    rotate(body.getRotation());
    image(image, 0, 0, diameter, diameter);//DOESN'T WORK RIGHT
    popMatrix();
  }
}
