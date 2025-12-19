class Slingshot{
  FBody anchor;
  Bird bird;
  FDistanceJoint sling;
  float springlength;
 
  Slingshot(Bird bird, float springlength){
    this.springlength = springlength;
    this.bird = bird;
    bird.body.setGroupIndex(-1);
   
    //make anchor
    anchor = new FCircle(1);
    anchor.setPosition(currentBird.body.getX(), currentBird.body.getY() - springlength);
    anchor.setGroupIndex(-1);
    anchor.setStatic(true);
    world.add(anchor);
   
    //make sling
    sling = new FDistanceJoint(anchor, bird.body);
    sling.setFrequency(4);
    sling.setDamping(0f);
    world.add(sling);
  }
}
