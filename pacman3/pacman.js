/**
 * Created by mtheilen on 16.03.2016.
 * versuch 3 mit MVC
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
var Farben = {
    wand: "#696969",
    hohlraum: "#808080",
    tuer: "#FF0000",
    geiserHaus: "#0000FF",
    pille: "yellow",
    grPille: "yellow",
    geistSpawn: "#0000FF"
};
var lvl = [
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
var spielFlaeche;


function controller_start() {
    spielFlaeche = new SpielFlaeche(document.getElementById("spielFeld"), document.getElementById("pacmanFeld"), document.getElementById("geisterFeld"), lvl)
}
function controller_spielen() {
    var keylistener = window.addEventListener("keydown", function (e) {
        switch (e.keyCode) {
            case 37:
            {
                spielFlaeche.geist.richtung = Richtungen.links;
                console.log("links");
                break;
            }
            case 38:
            {
                spielFlaeche.geist.richtung = Richtungen.hoch;
                console.log("hoch");
                break;
            }
            case 39:
            {
                spielFlaeche.geist.richtung = Richtungen.rechts;
                console.log("rechts");
                break;
            }
            case 40:
            {
                spielFlaeche.geist.richtung = Richtungen.runter;
                console.log("runter");
                break;
            }
        }
    });
    var interval = setInterval(spielFlaeche.bewegen, 200);
}
//observer
Object.observe(zustand, function (changes) {
    changes.forEach(function (change) {
        if (change.name === 'status') {
            switch (change.object.status) {
                case 1:
                {
                    controller_start();
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
var load = window.addEventListener("load", function () {
    zustand.status = 1;
});
//<<------------------Klassendefinition------------------>>
class SpielObjekt {
    constructor(posX, posY, groesse) {
        this.posX = posX;
        this.posY = posY;
        this.groesse = groesse;
        this.imageData = null;
    }

    getAbstand(posX, posY) {
        let abstandX = Math.abs(posX - this.posX);
        let abstandY = Math.abs(posY - this.posY);
        return Math.sqrt((abstandX * abstandX) + (abstandY * abstandY));
    }

    ImageToImageData(Image, size) {
        let canvas = document.createElement('canvas');
        let context = canvas.getContext("2d");
        context.drawImage(Image, 0, 0, size, size);
        return context.getImageData(0, 0, size, size);
    }
}
class Pille extends SpielObjekt {
    constructor(posX, posY, groesse, isGross) {
        super(posX, posY, groesse);
        this.isGross = isGross;
        this.imageData = this.createPilleImageData(isGross, groesse);
    }

    createPilleImageData(isGross, groesse) {
        let canvas = document.createElement('canvas');
        let context = canvas.getContext("2d");
        context.strokeStyle = isGross ? Farben.grPille : Farben.pille;
        context.fillStyle = isGross ? Farben.grPille : Farben.pille;
        context.arc(groesse / 2, groesse / 2, isGross ? groesse * 0.35 : groesse * 0.2, 0, 2 * Math.PI);
        context.fill();
        return context.getImageData(0, 0, groesse, groesse);

    }
}
class PacMan extends SpielObjekt {
    constructor(posX, posY, groesse) {
        super(posX, posY, groesse);
        this.imageData = this.ImageToImageData(document.getElementById("pacman"), groesse);
        this.richtung = Richtungen.rechts;
        this.verboteneFelder = 2;
    }

}
class Geist extends SpielObjekt {
    constructor(posX, posY, groesse) {
        super(posX, posY, groesse);
        this.imageData = this.ImageToImageData(document.getElementById("geist"), groesse);
        this.richtung = null;
        this.verboteneFelder = 1;
    }
}
class SpielFlaeche {
    constructor(levelCanvas, pacManCanvas, geistCanvas, level) {
        this.levelContext = levelCanvas.getContext("2d");
        this.pacManContext = pacManCanvas.getContext("2d");
        this.geistContext = geistCanvas.getContext("2d");
        this.width = levelCanvas.width;
        this.height = levelCanvas.height;
        this.level = level;
        this.pillen = [];
        this.geist = null;
        this.pacMan = null;
        this.factor = this.width / lvl.length;
        this.zeichnen();
        this.figurenZeichnen();
        zustand.status = 2;
        this.geistContext.putImageData(this.geist.imageData, 2 * this.factor, 2 * this.factor);
    }

    zeichnen() {
        for (let i = 0; i < lvl.length; i++)
            for (let j = 0; j < lvl[i].length; j++) {
                switch (lvl[i][j]) {
                    case Feldtyen.wand:
                    {
                        this.levelContext.fillStyle = Farben.wand;
                        this.levelContext.fillRect(j * this.factor, i * this.factor, this.factor, this.factor);
                        break;
                    }

                    case Feldtyen.geistSpawn:
                    {
                        this.geist = new Geist(j, i, this.factor);
                    }
                    case Feldtyen.geiserHaus:
                    {
                        this.levelContext.fillStyle = Farben.geiserHaus;
                        this.levelContext.fillRect(j * this.factor, i * this.factor, this.factor, this.factor);

                        break;
                    }
                    case Feldtyen.pacManSpawn:
                    {
                        this.pacMan = new PacMan(j, i, this.factor);
                    }
                    case Feldtyen.leerFlaeche:
                    {
                        this.levelContext.clearRect(j * this.factor, i * this.factor, this.factor, this.factor);
                        break;
                    }
                    case Feldtyen.hohlraum:
                    {
                        this.levelContext.fillStyle = Farben.hohlraum;
                        this.levelContext.fillRect(j * this.factor, i * this.factor, this.factor, this.factor);
                        break;
                    }
                    case Feldtyen.tuer:
                    {

                        this.levelContext.fillStyle = Farben.tuer;
                        this.levelContext.fillRect(j * this.factor, i * this.factor, this.factor, this.factor / 2);
                        this.levelContext.fillStyle = Farben.geistSpawn;
                        this.levelContext.fillRect(j * this.factor, i * this.factor + this.factor / 2, this.factor, this.factor / 2);
                        break;
                    }
                    case Feldtyen.pille:
                    {
                        this.pillen[this.pillen.length] = new Pille(j, i, this.factor, false);
                        break;
                    }
                    case Feldtyen.grPille:
                    {
                        this.pillen[this.pillen.length] = new Pille(j, i, this.factor, true);
                        break;
                    }
                }
            }
    }

    figurenZeichnen() {
        this.pacManContext.clearRect(0, 0, this.width, this.height);
        this.geistContext.clearRect(0, 0, this.width, this.height);
        this.pacManContext.putImageData(this.pacMan.imageData, this.pacMan.posX * this.factor, this.pacMan.posY * this.factor);
        for (let i in this.pillen)
            this.pacManContext.putImageData(this.pillen[i].imageData, this.pillen[i].posX * this.factor, this.pillen[i].posY * this.factor);

        this.geistContext.putImageData(this.geist.imageData, this.geist.posX * this.factor, this.geist.posY * this.factor);

    }

    bewegen() {
        spielFlaeche.bewegenGeist();
        spielFlaeche.bewegenPacMan();
        spielFlaeche.figurenZeichnen();
    }

    bewegenGeist() {

        switch (this.geist.richtung) {
            case Richtungen.hoch:
            {

                if (this.level[this.geist.posY - 1] == undefined || this.level[this.geist.posY - 1][this.geist.posX] > this.geist.verboteneFelder) {
                    this.geist.posY--;
                    if (this.geist.posY < 0) {
                        this.geist.posY = this.level.length - 1
                    }
                }
                break;
            }
            case Richtungen.rechts:
            {

                if (this.level[this.geist.posY][this.geist.posX + 1] > this.geist.verboteneFelder || this.level[this.geist.posY][this.geist.posX + 1] == undefined) {
                    this.geist.posX++;
                    if (this.geist.posX > this.level.length - 1) {
                        this.geist.posX = 0
                    }
                }
                break;
            }
            case Richtungen.runter:
            {

                if (this.level[this.geist.posY + 1] == undefined || this.level[this.geist.posY + 1][this.geist.posX] > this.geist.verboteneFelder) {
                    this.geist.posY++;
                    if (this.geist.posY > this.level.length - 1) {
                        this.geist.posY = 0
                    }
                }
                break;
            }
            case Richtungen.links:
            {

                if (this.level[this.geist.posY][this.geist.posX - 1] > this.geist.verboteneFelder || this.level[this.geist.posY][this.geist.posX - 1] == undefined) {
                    this.geist.posX--;
                    if (this.geist.posX < 0) {
                        this.geist.posX = this.level.length - 1
                    }
                }
                break;
            }
        }

    }

    bewegenPacMan() {

    }

}
