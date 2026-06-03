class Bird extends Animal{
  
  boolean launched;
  float diameter;
  
  Bird(float x, float y, float diameter){
    super(x, y, diameter);
    this.diameter = diameter;
    image = birdImage;
    body.setDensity(50);
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
