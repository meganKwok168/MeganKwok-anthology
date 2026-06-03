# NeXTCS Final Project
### Name 0: Megan Kwok
### Name 1: Leo Schneiderman
### Name 2: William Li
---

### Project Description
Game that uses sling shots to shoot a bird across lands to knock down structures inhabitated by pigs. Fundamentally similar to the popular mobile game Angry Birds. 

The project has two iterations which come in two different fundamentally separate folders: 

1) "angryBirdsNewMethodology". In this folder, the game has three different pre-generated levels. The levels are stored in text files. The "LevelEditor" folder contains a program that creates a graphical editor for the creation of angry birds levels. It has the capability to output a world into a text document which may then be used. Some of the levels in the pregenerated version of the game were generated from this editor.

2) "angryBirds_by_chews". In this folder, the game is procedurally generated. This version is an outdated prototype while the other version is complete. It is less developed than the other version, and version #1 is the optimal and complete game. 

Driver:
- list of fields(?):

    *** world building ****

    - FWorld world - the world
    - ArrayList<Box> boxes - [needs to be filled]
    - ArrayList<PhysicalObjectWrapper> objects - stores all objects in the world [right?]

    *** animals ***
    - Bird[] birds - array of Bird objects

    *** slingshot ***
    - FBody anchor - anchors the slingshot
    - FDistanceJoint sling - the actual slingshot, exists sometimes
    - Slingshot slingshot - [needs to be filled]
    - Bird currentBird - tracks which bird is being launched
    - int birdCounter - helps to pull bird from birds array

- draw(): calls makeWorld(), makeBirds(), [finish this]

- makeWorld():

- makeBirds():

- makeSlingshot(): makes slingshot

- makeBoxes(): combines all the layers from makeLayer(x,y,w,h)

- makeLayer(int x, int y, int w, int h): makes block structure [right?]

- reset():

- float distance(FBody body 1, FBody body 2):

- switchBird():

- drawAllObjects():

- keyPressed(): Resets and clears the world if you press "r"

- makeBackground(): draws background according to width, repeating



class PhysicalObjectWrapper:

Global Variables
Movement:
- PVector previousVelocity
- float previousSpeed
- FBody body

Physical Object Wrapper is the Parent Class
- subclass Box:
- subclass Animal:
   -  subclass Bird:
   -  subclass Animal:
   -  subclass Pig:  
   -  subclass Egg:

class Slingshot
Variables
- FBody anchor
- Bird bird
- FDistanceJoint sling
- float springlength;

### Skill Usage
Explain what skills from this semester you will be using in this project, and how they will be used.

3. Using Colors
9. Writing Readable Code
10. Debugging Practices
14. Using Objects
15. Writing Classes
18. Searching
23. Implementation of Inheritance
24. Polymorphism
27. Encapsulation Diagrams
28. Strings
29. Trees
30. Image Processing

### Libraries
If you are going to be using any libraries, list them here, include a link and a description of why you need them. (You also need to fill out this form: <https://forms.gle/TMH9CYeS8QE3kTq56> )

Fisica --- a physics library (similar to Box2D)

