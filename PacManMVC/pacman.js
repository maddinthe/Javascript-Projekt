/**
 * Created by mtheilen on 15.03.2016.
 * versuch mit MVC
 */
"use strict";
var zustand = {
    status: 0
};
var Richtungen = {
    hoch: 0,
    runter: 1,
    rechts: 2,
    links: 3
};
var Feldtyen = {
    wand: 0,
    hohlraum: 1,
    tuer: 2,
    geiserHaus: 3,
    pille: 4,
    grPille: 5,
    pacManSpawn: 6,
    geistSpawn: 7,
    leerFlaeche: 8
};
var karte=  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0],
    [0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0],
    [0, 4, 0, 0, 4, 0, 1, 1, 1, 1, 0, 4, 0, 4, 0, 1, 1, 1, 1, 0, 4, 0, 0, 4, 0],
    [0, 4, 0, 0, 4, 0, 0, 0, 1, 1, 0, 4, 0, 4, 0, 1, 1, 0, 0, 0, 4, 0, 0, 4, 0],
    [0, 4, 0, 0, 4, 4, 4, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 4, 4, 4, 0, 0, 4, 0],
    [0, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 0],
    [0, 4, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 4, 0],
    [0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0],
    [0, 0, 0, 0, 4, 0, 0, 0, 4, 4, 4, 4, 5, 4, 4, 4, 4, 0, 0, 0, 4, 0, 0, 0, 0],
    [1, 1, 1, 0, 4, 0, 1, 0, 4, 0, 0, 2, 2, 2, 0, 0, 4, 0, 1, 0, 4, 0, 1, 1, 1],
    [0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 3, 3, 3, 3, 3, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0],
    [8, 8, 8, 6, 4, 4, 4, 4, 4, 0, 3, 3, 7, 3, 3, 0, 4, 4, 4, 4, 4, 8, 8, 8, 8],
    [0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 3, 3, 3, 3, 3, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0],
    [1, 1, 1, 0, 4, 0, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 1, 0, 4, 0, 1, 1, 1],
    [0, 0, 0, 0, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 0, 0, 0, 0],
    [0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0],
    [0, 4, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 4, 0],
    [0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0],
    [0, 0, 4, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 4, 0, 4, 0, 0],
    [0, 4, 4, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 4, 0, 4, 4, 0],
    [0, 4, 0, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 4, 0, 0, 4, 0],
    [0, 4, 0, 0, 4, 0, 4, 0, 0, 5, 0, 4, 0, 4, 0, 5, 0, 0, 4, 0, 4, 0, 0, 4, 0],
    [0, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
var level;

class Level {
    constructor(canvas, lvl) {
        this.lvl = lvl;
        this.height = canvas.height;
        this.width = canvas.width;
        this.context = canvas.getContext("2d");
        this.restpillen = 0;
        this.sizeX = lvl[0].length;
        this.sizeY = lvl.length;
        this.factorX = this.width / this.sizeX;
        this.factorY = this.height / this.sizeY;
        this.offsetX = this.factorX / 2;
        this.offsetY = this.factorY / 2;
        this.dotsize = (this.offsetX + this.offsetY) / 8;
        this.figuren = [];
        this.verboteneFelderPacman = 2;
        this.verboteneFelderGeist = 1;
    }

    zeichnen() {
        let figurenZuordnung = [];
        for (var i = 0; i < this.sizeX; i++) {
            for (var j = 0; j < this.sizeY; j++) {
                switch (this.lvl[i][j]) {
                    case Feldtyen.pille:
                    {//pillen zeichen
                        this.context.fillStyle = "yellow";
                        this.context.arc(j * this.factorX + this.offsetX, i * this.factorY + this.offsetY, this.dotsize, 0, 2 * Math.PI);
                        this.context.fill();
                        this.context.closePath();
                        this.restpillen++;
                        break;
                    }
                    case Feldtyen.wand:
                    {//Wand zeichnen
                        this.context.fillStyle = "#696969";
                        this.context.fillRect(j * this.factorX, i * this.factorY, this.factorX, this.factorY);
                        break;
                    }
                    case Feldtyen.pacManSpawn:
                        figurenZuordnung[figurenZuordnung.length] = [Feldtyen.pacManSpawn, j, i];
                    case Feldtyen.leerFlaeche:
                    {
                        //gang freimachen
                        this.context.clearRect(j * this.factorX, i * this.factorY, this.factorX, this.factorY);

                        break;
                    }
                    case Feldtyen.hohlraum :
                    { //leeren raum zeichen
                        this.context.fillStyle = "#808080";
                        this.context.fillRect(j * this.factorX, i * this.factorY, this.factorX, this.factorY);
                        break;
                    }
                    case Feldtyen.geistSpawn:
                        figurenZuordnung[figurenZuordnung.length] = [Feldtyen.geistSpawn, j, i];
                    case Feldtyen.geiserHaus:
                    {
                        //haus blau machen
                        this.context.fillStyle = "#0000FF";
                        this.context.fillRect(j * this.factorX, i * this.factorY, this.factorX, this.factorY);
                        break;
                    }

                    case Feldtyen.grPille:
                    {
                        //große pillen zeichnen
                        this.context.fillStyle = "yellow";
                        this.context.arc(j * this.factorX + this.offsetX, i * this.factorY + this.offsetY, this.dotsize * 2, 0, 2 * Math.PI);
                        this.context.fill();
                        this.context.closePath();
                        this.restpillen++;
                        break;
                    }
                    case Feldtyen.tuer:
                    {
                        this.context.fillStyle = "#FF0000";
                        this.context.fillRect(j * this.factorX, i * this.factorY, this.factorX, this.offsetY);
                        this.context.fillStyle = "#0000FF";
                        this.context.fillRect(j * this.factorX, i * this.factorY + this.offsetY, this.factorX, this.offsetY);
                        break;
                    }
                }
            }
        }
        for (let k = 0; k < figurenZuordnung.length; k++) {
            switch (figurenZuordnung[k][0]) {
                case Feldtyen.pacManSpawn:
                {
                    this.figuren[this.figuren.length] = new Spielfigur(document.getElementById("pacman"), figurenZuordnung[k][1], figurenZuordnung[k][2], this, this.verboteneFelderPacman);

                    break;
                }
                case Feldtyen.geistSpawn:
                {
                    this.figuren[this.figuren.length] = new Spielfigur(document.getElementById("geist"), figurenZuordnung[k][1], figurenZuordnung[k][2], this, this.verboteneFelderGeist);
                    break;
                }
            }
        }
        for (let l = 0; l < this.figuren.length; l++) {
            this.spielfigurZeichnen(this.figuren[l]);
        }
    }

    spielfigurZeichnen(figur) {
        //alten hintergrund wieder einsetzen
        this.context.putImageData(figur.altHintergrund, figur.altPosX * this.factorX, figur.altPosY * this.factorY);
        //figur zeichnen
        figur.hintergrund=this.context.getImageData(figur.posX * this.factorX, figur.posY * this.factorY,this.factorX,this.factorY);
        this.context.putImageData(figur.bild, figur.posX * this.factorX, figur.posY * this.factorY);

    }

    get pacman(){
        for (let i=0;i<this.figuren.length;i++){
            if (this.figuren[i].verboteneFelder==this.verboteneFelderPacman)return this.figuren[i];
        }
        return null;
    }
    get geist(){
        for (let i=0;i<this.figuren.length;i++){
            if (this.figuren[i].verboteneFelder==this.verboteneFelderGeist)return this.figuren[i];
        }
        return null;
    }
}
class Spielfigur {
    constructor(bild, posX, posY, level, verboteneFelder) {
        this.posX = posX;
        this.posY = posY;
        this.altPosX = posX;
        this.altPosY = posY;
        this.hintergrund = level.context.getImageData(level.factorX * this.posX, level.factorY * this.posY, level.factorX, level.factorY);
        this.altHintergrund = this.hintergrund;
        this.bild = Spielfigur.createImageData(bild, level.factorX, level.factorY);
        this.level = level;
        this.verboteneFelder = verboteneFelder;
    }

    static createImageData(bild, factorX, factorY) {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        context.drawImage(bild, 0, 0, factorX, factorY);
        return context.getImageData(0, 0, factorX, factorY)
    }

    figurBewegen(richtung) {
        let flag = false;
        this.altPosX = this.posX;
        this.altPosY = this.posY;
        this.altHintergrund = this.hintergrund;
        switch (richtung) {
            case Richtungen.hoch:
            {
                if (this.level.lvl[this.posY - 1]==undefined||this.level.lvl[this.posY - 1][this.posX] > this.verboteneFelder) {
                    this.posY--;
                    if(this.posY<0){
                        this.posY=level.sizeY-1
                    }
                }
                break;
            }
            case Richtungen.runter:
            {
                if (this.level.lvl[this.posY+1]==undefined||this.level.lvl[this.posY + 1][this.posX] > this.verboteneFelder) {
                    this.posY++;
                    if(this.posY>this.level.sizeY-1){
                        this.posY=0
                    }
                }
                break;
            }
            case Richtungen.rechts:
            {
                if (this.level.lvl[this.posY][this.posX + 1] > this.verboteneFelder||this.level.lvl[this.posY][this.posX+1]==undefined) {
                    this.posX++;
                    if(this.posX>this.level.sizeX-1){
                        this.posX=0
                    }
                }
                break;
            }
            case Richtungen.links:
            {
                if (this.level.lvl[this.posY][this.posX - 1] > this.verboteneFelder||this.level.lvl[this.posY][this.posX-1]==undefined) {
                    this.posX--;
                    if(this.posX<0){
                        this.posX=level.sizeX-1
                    }
                }
                break;
            }
        }
        this.level.spielfigurZeichnen(this);
    }
}


function controller_zeichnen() {
    level = new Level(document.getElementById("spielfeld"), karte);
    level.zeichnen();
    zustand.status=2;

}
function controller_spielen() {
    let pacman=level.pacman;
    let geist=level.geist;

    let listener=window.addEventListener("keydown", function(e){
        switch (e.keyCode){
            case 37:{
                geist.figurBewegen(Richtungen.links);
                break;
            }
            case 38:{
                geist.figurBewegen(Richtungen.hoch);
                break;
            }
            case 39:{
                geist.figurBewegen(Richtungen.rechts);
                break;
            }
            case 40:{
                geist.figurBewegen(Richtungen.runter);
                break;
            }

        }
    });

}

//zustandsautomat überwachung
Object.observe(zustand, function (changes) {
    changes.forEach(function (change) {
        if (change.name === 'status') {
            switch (change.object.status) {
                case 1:
                {
                    controller_zeichnen();
                    break;
                }
                case 2:
                {
                    controller_spielen();
                    break;
                }
            }
        }
    });
});
window.addEventListener("load", function () {
    zustand.status = 1;
});