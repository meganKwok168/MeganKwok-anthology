public class BoxOutline extends Prototype{
  
  BoxOutline(float x, float y, float w, float h, float r){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;
  }
  
  void display(){
    pushMatrix();
    translate(x, y);
    rotate(r);
    fill(color(0));
    rectMode(CENTER);
    rect(0, 0, w, h);
    popMatrix();
  }
  
  void generate(){
    Box box = new Box(currentlySelected.x, currentlySelected.y, currentlySelected.w, currentlySelected.h);
    box.body.setRotation(r);
  }
  
  BoxOutline copy(){
    return new BoxOutline(x, y, w, h, r);
  }
}
