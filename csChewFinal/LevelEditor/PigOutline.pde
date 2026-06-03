class PigOutline extends AnimalOutline{
    PigOutline(float x, float y, float d, float r){
      super(x, y, d, r);
  }
  
  void generate(){
    Pig pig = new Pig(currentlySelected.x, currentlySelected.y, currentlySelected.w);
    pig.body.setRotation(r);
  }
  
    PigOutline copy(){
    return new PigOutline(x, y, w, r);
  }
}
