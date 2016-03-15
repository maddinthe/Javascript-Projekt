/**
 * Created by mtheilen on 15.03.2016.
 */
"use strict";
class SpielFigur{
    var posX;
    var posY;
    var altX;
    var altY;
    var imageData;
    var backGround;
    constructor(posX,posY){
        this.posX=posX;
        this.posY=posY;
    }
}



class SpielFeld{
    var lvl;
    var breite;
    var hoehe;
    var context;
    constructor(lvl,canvas){
        this.lvl=lvl;
        this.context=canvas.getContext("2d");
        breite=canvas.width;
        hoehe=canvas.height;

    }
}