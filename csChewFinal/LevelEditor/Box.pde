class Box extends PhysicalObjectWrapper {
  float w, h;

  Box(float x, float y, float w, float h) {
    body = new FBox(w, h);
    body.setPosition(x, y);
    body.setFriction(0.85);       // Neutral middle ground
    body.setDensity(8);           // Neutral for editor, can adjust later
    body.setGrabbable(true);      // Allow dragging in editor
    body.setAllowSleeping(false); // Prevent bodies from going idle

    this.w = w;
    this.h = h;
    image = boxImage;

    objects.add(this);
    boxes.add(this);
    world.add(body);
  }

  void display() {
    imageMode(CENTER);
    pushMatrix();
    translate(body.getX(), body.getY());
    rotate(body.getRotation());
    image(image, 0, 0, w, h);
    popMatrix();
  }

  float getWidth() {
    return w;
  }

  float getHeight() {
    return h;
  }
}
