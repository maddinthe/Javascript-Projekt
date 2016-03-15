/**
 * Created by mtheilen on 15.03.2016.
 * versuch mit MVC
 */
"use strict";
var zustand = {
    status: 0
};

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

    }

    zeichnen() {
        let figurenZuordnung = [];
        for (var i = 0; i < this.sizeX; i++) {
            for (var j = 0; j < this.sizeY; j++) {
                switch (this.lvl[i][j]) {
                    case 0:
                    {//pillen zeichen
                        this.context.fillStyle = "yellow";
                        this.context.arc(j * this.factorX + this.offsetX, i * this.factorY + this.offsetY, this.dotsize, 0, 2 * Math.PI);
                        this.context.fill();
                        this.context.closePath();
                        this.restpillen++;
                        break;
                    }
                    case 1:
                    {//Wand zeichnen
                        this.context.fillStyle = "#696969";
                        this.context.fillRect(j * this.factorX, i * this.factorY, this.factorX, this.factorY);
                        break;
                    }
                    case 5:
                    {
                        figurenZuordnung[figurenZuordnung.length] = [5, j, i]
                    }

                    case 2:
                    {
                        //gang freimachen
                        this.context.clearRect(j * this.factorX, i * this.factorY, this.factorX, this.factorY);

                        break;
                    }
                    case 3 :
                    { //leeren raum zeichen
                        this.context.fillStyle = "#808080";
                        this.context.fillRect(j * this.factorX, i * this.factorY, this.factorX, this.factorY);
                        break;
                    }
                    case 6:
                        figurenZuordnung[figurenZuordnung.length] = [6, j, i]
                    case 4:
                    {
                        //haus blau machen
                        this.context.fillStyle = "#0000FF";
                        this.context.fillRect(j * this.factorX, i * this.factorY, this.factorX, this.factorY);
                        break;
                    }
                    //case 5:
                    //{
                    //    //pacman zeichnen
                    //    context.drawImage(pacman, j * factorX, i * factorY, factorX, factorY);
                    //    pacmanImageData = context.getImageData(j * factorX, i * factorY, factorX, factorY);
                    //    pacmanVisitedImageData = context.getImageData((j - 1) + factorX, i * factorY, factorX, factorY);
                    //    pacManX = j;
                    //    pacManY = i;
                    //    break;
                    //
                    //}
                    //case 6:
                    //{//geist zeichnen
                    //    context.drawImage(geist, j * factorX, i * factorY, factorX, factorY);
                    //    geistX = j;
                    //    geistY = i;
                    //    geistImageData = context.getImageData(j * factorX, i * factorY, factorX, factorY);
                    //    back = context.getImageData((j - 1) * factorX, (i - 1) * factorY, factorX, factorY);
                    //    altBack = back;
                    //    break;
                    //}
                    case 7:
                    {
                        //große pillen zeichnen
                        this.context.fillStyle = "yellow";
                        this.context.arc(j * this.factorX + this.offsetX, i * this.factorY + this.offsetY, this.dotsize * 2, 0, 2 * Math.PI);
                        this.context.fill();
                        this.context.closePath();
                        this.restpillen++;
                        break;
                    }
                    case 8:
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
        for(let i=0;i<figurenZuordnung.length;i++) {
            switch (figurenZuordnung[i][0]) {
                case 5:
                {
                    this.figuren[this.figuren.length] = new Spielfigur(document.getElementById("pacman"),figurenZuordnung[i][1], figurenZuordnung[i][2], this);

                    break;
                }
                case 6:
                {
                    this.figuren[this.figuren.length] = new Spielfigur(document.getElementById("geist"), figurenZuordnung[i][1], figurenZuordnung[i][2], this);
                    break;
                }
            }
        }
        for(let i=0;i<this.figuren.length;i++){
            this.spielfigurZeichnen(this.figuren[i]);
        }
    }

    spielfigurZeichnen(figur) {
        //alten hintergrund wieder einsetzen
        this.context.putImageData(figur.altHintergrund, figur.altPosX * this.factorX, figur.altPosY * this.factorY);
        //figur zeichnen
        this.context.putImageData(figur.bild, figur.posX * this.factorX, figur.posY * this.factorY);

    }
}
class Spielfigur {
    constructor(bild, posX, posY, level) {
        this.posX = posX;
        this.posY = posY;
        this.altPosX = posX;
        this.altPosY = posY;
        this.hintergrund = level.context.getImageData(level.factorX * this.posX, level.factorY * this.posY, level.factorX, level.factorY);
        this.altHintergrund = this.hintergrund;
        this.bild = Spielfigur.createImageData(bild,level.factorX,level.factorY);
    }

    static createImageData(bild,factorX,factorY) {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        context.drawImage(bild, 0, 0,factorX,factorY);
        return context.getImageData(0, 0, factorX, factorY)
    }
}


function controller_zeichnen() {
    let lvl = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 3, 3, 3, 3, 1, 0, 1, 0, 1, 3, 3, 3, 3, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 3, 3, 1, 0, 1, 0, 1, 3, 3, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1],
        [3, 3, 3, 1, 0, 1, 3, 1, 0, 1, 1, 8, 8, 8, 1, 1, 0, 1, 3, 1, 0, 1, 3, 3, 3],
        [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 4, 4, 4, 4, 4, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
        [2, 2, 2, 5, 0, 0, 0, 0, 0, 1, 4, 4, 6, 4, 4, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2],
        [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 4, 4, 4, 4, 4, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
        [3, 3, 3, 1, 0, 1, 3, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 3, 1, 0, 1, 3, 3, 3],
        [1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 1, 0, 1, 0, 1, 3, 3, 1, 0, 1, 0, 1, 3, 3, 1, 0, 1, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
    let level = new Level(document.getElementById("spielfeld"), lvl);
    level.zeichnen();

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
                    break;
                }
            }
        }
    });
});
window.addEventListener("load", function () {
    zustand.status = 1;
})