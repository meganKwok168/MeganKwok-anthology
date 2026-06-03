public class AnimalOutline extends Prototype{
  
  AnimalOutline(float x, float y, float d, float r){
    this.x = x;
    this.y = y;
    this.w = d;
    this.h = d;
    this.r = r;
  }
  
  void display(){
    pushMatrix();
    translate(x, y);
    rotate(r);
    fill(color(0));
    circle(0, 0, w);
    popMatrix();
  }
}
