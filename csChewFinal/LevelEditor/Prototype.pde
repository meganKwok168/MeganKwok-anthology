public class Prototype{
  float x, y, w, h, r;
  
  boolean mouseIsOver(){
    if(mouseX > x - w / 2 && mouseX < x + w/2 && mouseY > y - h/2 && mouseY < y + h/2){
      return true;
    } else {
      return false;
    }
  }
  
  void generate(){
  }
  
  void display(){
  }
}
