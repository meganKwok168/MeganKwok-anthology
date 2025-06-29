class PhysicalObjectWrapper {
  PVector previousVelocity;
  float previousSpeed;
  FBody body;
  PImage image;
  String bodyType;

  // Called each frame to correct physics "freezing"
  void correctSuddenStopIssue() {
    if (previousVelocity != null) {
      float currentSpeed = velocity();
      if (previousSpeed != 0 && currentSpeed == 0) {
        if (previousSpeed - currentSpeed > 10) {
          println("Physics freeze detected. Restoring velocity.");
          body.setVelocity(previousVelocity.x, previousVelocity.y);
        }
      }
    }
    previousSpeed = velocity();
    previousVelocity = new PVector(body.getVelocityX(), body.getVelocityY());
  }

  // Fixed typo in method name
  float[] getPosition() {
    return new float[]{body.getX(), body.getY()};
  }

  void display() {
    // Intentionally left blank for subclass override
  }

  float velocity() {
    return sqrt(sq(body.getVelocityX()) + sq(body.getVelocityY()));
  }

  float getWidth() {
    return 0f;
  }

  float getHeight() {
    return 0f;
  }
}
