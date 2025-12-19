class Pig extends Animal{
  int value;
  boolean touchedGround;
  boolean valueAdded;
  float diameter;
  
  Pig(float x, float y, float diameter){
    super(x, y, diameter);
    body.setGrabbable(false);
    value = 1;
    touchedGround = false;
    this.diameter = diameter;
    image = pigImage;
  }
  
  void checkTouch(){
    //println(body.getY() + diameter / 2);
    //println(world.bottom.getY());
    float bodyBottom = body.getY() + diameter;
    if (bodyBottom >= world.bottom.getY()){
      println("true");
      println("pig touched ground");
      if(!touchedGround){
        scoreAdd();
        touchedGround = true;
      }
    }
  }
  

  void scoreAdd(){
    score+=value;
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
