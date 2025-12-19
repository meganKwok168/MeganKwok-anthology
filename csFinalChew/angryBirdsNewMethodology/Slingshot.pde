class Slingshot{
  FBody anchor;
  Bird bird;
  FDistanceJoint sling;
  float springlength;
  PVector anchorXY;
 
  Slingshot(Bird bird, float springlength){
    this.springlength = springlength;
    this.bird = bird;
    bird.body.setGroupIndex(-1);
   
    //make anchor
    anchor = new FCircle(1);
    anchor.setGroupIndex(-1);
    anchorXY = new PVector(currentBird.body.getX(), currentBird.body.getY() - springlength);
    anchor.setPosition(anchorXY.x, anchorXY.y);
    anchor.setStatic(true);
    world.add(anchor);
   
    //make sling
    sling = new FDistanceJoint(anchor, bird.body);
    sling.setFrequency(4);
    sling.setDamping(0f);
    world.add(sling);
  }
  
  void drawSling(){
    if(sling != null){
      fill(0, 0, 0);
      strokeWeight(1);
      line(anchorXY.x, anchorXY.y, bird.body.getX(), bird.body.getY());
    }
  }
}
