class Bird extends Animal {

  Bird(float x, float y, float diameter) {
    super(x, y, diameter);
    image = birdImage;
    body.setDensity(50); // or any neutral default
    birds.add(this);     // tracking for export
  }

  void display() {
    imageMode(CENTER);
    pushMatrix();
    translate(body.getX(), body.getY());
    rotate(body.getRotation());
    image(image, 0, 0, diameter, diameter);
    popMatrix();
  }
}
