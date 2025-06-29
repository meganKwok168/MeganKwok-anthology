class Pig extends Animal {
  int value;
  boolean touchedGround;
  boolean valueAdded;

  Pig(float x, float y, float diameter) {
    super(x, y, diameter);
    println("we ran the super constructor");

    body.setGrabbable(false); // Prevent grabbing
    println("no longer grabbable");

    touchedGround = false;
    valueAdded = false;

    image = pigImage;
    println("image is determined");

    println(pigs);
    pigs.add(this);
    println("added to pigs");
  }

  void remove() {
    objects.remove(this);
    world.remove(this.body);
  }

  void display() {
    imageMode(CENTER);
    pushMatrix();
    translate(body.getX(), body.getY());
    rotate(body.getRotation());
    image(image, 0, 0, diameter, diameter); // May need fine-tuning
    popMatrix();
  }
}
