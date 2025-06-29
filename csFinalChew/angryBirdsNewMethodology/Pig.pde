class Pig extends Animal {
  int value;
  boolean touchedGround;
  boolean valueAdded;

  boolean isDying = false;
  float animationProgress = 1.0; // 1.0 = full size, 0 = remove

  Pig(float x, float y, float diameter) {
    super(x, y, diameter);
    body.setGrabbable(false);
    value = 1;
    scoreHighest += value;
    touchedGround = false;
    valueAdded = false;
    image = pigImage;
    pigs.add(this);
  }

  void checkTouch() {
    float bodyBottom = body.getY() + diameter - 1;
    float groundY = world.bottom.getY();
    if (bodyBottom >= groundY) {
      if (!touchedGround) {
        touchedGround = true;
        startDeathAnimation();
      }
    }
  }

  void startDeathAnimation() {
    isDying = true;
    if (!valueAdded) {
      score += value;
      valueAdded = true;
    }

    // Freeze body in place
    body.setVelocity(0, 0);
    body.setStatic(true);
  }

  void update() {
    if (isDying) {
      animationProgress -= 0.04;
      if (animationProgress <= 0) {
        remove();
      }
    }
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

    float scale = diameter * animationProgress;
    tint(255, 255 * animationProgress); // Fade out
    image(image, 0, 0, scale, scale);
    noTint();

    popMatrix();
  }
}
