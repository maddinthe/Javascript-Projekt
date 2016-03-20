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
var Feldtypen = {
    wand: 0,
    hohlraum: 1,
    tuer: 2,
    geisterHaus: 3,
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
    geisterHaus: "#0000FF",
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
                spielFlaeche.geist.richtungNeu = Richtungen.links;
                console.log("links");
                break;
            }
            case 38:
            {
                spielFlaeche.geist.richtungNeu = Richtungen.hoch;
                console.log("hoch");
                break;
            }
            case 39:
            {
                spielFlaeche.geist.richtungNeu = Richtungen.rechts;
                console.log("rechts");
                break;
            }
            case 40:
            {
                spielFlaeche.geist.richtungNeu = Richtungen.runter;
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
class Pos{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}
class Knoten {
    constructor(knotenOben, knotenLinks, posX, posY, pille) {
        this.knotenOben = knotenOben;
        this.knotenUnten = null;
        this.knotenLinks = knotenLinks;
        this.knotenRechts = null;
        this.pos=new Pos(posX,posY);
        this.pille = pille;
        if (knotenOben instanceof Knoten) {
            knotenOben.knotenUnten = this;
        }
        if (knotenLinks instanceof Knoten) {
            knotenLinks.knotenRechts = this;
        }
    }

    get weg() {
        let ret = [];
        if (this.knotenLinks instanceof Knoten)ret[ret.length] = Richtungen.links;
        if (this.knotenOben instanceof Knoten)ret[ret.length] = Richtungen.hoch;
        if (this.knotenRechts instanceof Knoten)ret[ret.length] = Richtungen.rechts;
        if (this.knotenUnten instanceof Knoten)ret[ret.length] = Richtungen.runter;
        return ret;
    }

    get nachbarn(){
        let ret=[];
        if (this.knotenLinks instanceof Knoten)ret.push(this.knotenLinks);
        if (this.knotenOben instanceof Knoten)ret.push(this.knotenOben);
        if (this.knotenRechts instanceof Knoten)ret.push(this.knotenRechts);
        if (this.knotenUnten instanceof Knoten)ret.push(this.knotenUnten);
        return ret;
    }

    nexthop(richtung) {
        switch (richtung) {
            case Richtungen.hoch:
            {
                if (this.knotenOben instanceof Knoten)return Richtungen.hoch;
                if (this.knotenLinks instanceof Knoten) return Richtungen.links;
                if (this.knotenRechts instanceof Knoten) return Richtungen.rechts;
                return Richtungen.runter;
            }
            case Richtungen.rechts:
            {
                if (this.knotenRechts instanceof Knoten)return Richtungen.rechts;
                if (this.knotenOben instanceof Knoten) return Richtungen.hoch;
                if (this.knotenUnten instanceof Knoten) return Richtungen.runter;
                return Richtungen.links;
            }
            case Richtungen.runter:
            {
                if (this.knotenUnten instanceof Knoten)return Richtungen.runter;
                if (this.knotenLinks instanceof Knoten) return Richtungen.links;
                if (this.knotenRechts instanceof Knoten) return Richtungen.rechts;
                return Richtungen.hoch;
            }
            case Richtungen.links:
            {
                if (this.knotenLinks instanceof Knoten)return Richtungen.links;
                if (this.knotenOben instanceof Knoten) return Richtungen.hoch;
                if (this.knotenUnten instanceof Knoten) return Richtungen.runter;
                return Richtungen.rechts;
            }
        }

    }


}
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
        this.richtungNeu = this.richtung;
        this.verboteneFelder = 2;
    }

}
class Geist extends SpielObjekt {
    constructor(posX, posY, groesse) {
        super(posX, posY, groesse);
        this.imageData = this.ImageToImageData(document.getElementById("geist"), groesse);
        this.richtung = null;
        this.richtungNeu = null;
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
        this.knoten = [];
        this.zeichnen();
        this.figurenZeichnen();
        zustand.status = 2;
        this.geistContext.putImageData(this.geist.imageData, 2 * this.factor, 2 * this.factor);
    }

    zeichnen() {
        for (let i = 0; i < lvl.length; i++) {
            this.knoten[i] = [];
            for (let j = 0; j < lvl[i].length; j++) {
                switch (lvl[i][j]) {
                    case Feldtypen.wand:
                    {
                        this.levelContext.fillStyle = Farben.wand;
                        this.levelContext.fillRect(j * this.factor, i * this.factor, this.factor, this.factor);
                        break;
                    }

                    case Feldtypen.geistSpawn:
                    {
                        this.geist = new Geist(j, i, this.factor);
                    }
                    case Feldtypen.geisterHaus:
                    {
                        this.levelContext.fillStyle = Farben.geisterHaus;
                        this.levelContext.fillRect(j * this.factor, i * this.factor, this.factor, this.factor);
                        this.knoten[i][j] = new Knoten(this.knoten[i - 1][j], this.knoten[i][j - 1], j, i, null);
                        break;
                    }
                    case Feldtypen.pacManSpawn:
                    {
                        this.pacMan = new PacMan(j, i, this.factor);
                    }
                    case Feldtypen.leerFlaeche:
                    {
                        this.levelContext.clearRect(j * this.factor, i * this.factor, this.factor, this.factor);
                        this.knoten[i][j] = new Knoten(this.knoten[i - 1][j], this.knoten[i][j - 1], j, i, null);
                        break;
                    }
                    case Feldtypen.hohlraum:
                    {
                        this.levelContext.fillStyle = Farben.hohlraum;
                        this.levelContext.fillRect(j * this.factor, i * this.factor, this.factor, this.factor);
                        break;
                    }
                    case Feldtypen.tuer:
                    {

                        this.levelContext.fillStyle = Farben.tuer;
                        this.levelContext.fillRect(j * this.factor, i * this.factor, this.factor, this.factor / 2);
                        this.levelContext.fillStyle = Farben.geistSpawn;
                        this.levelContext.fillRect(j * this.factor, i * this.factor + this.factor / 2, this.factor, this.factor / 2);
                        this.knoten[i][j] = new Knoten(this.knoten[i - 1][j], this.knoten[i][j - 1], j, i, null);
                        break;
                    }
                    case Feldtypen.pille:
                    {
                        let pille = new Pille(j, i, this.factor, false);
                        this.pillen[this.pillen.length] = pille;
                        this.knoten[i][j] = new Knoten(this.knoten[i - 1][j], this.knoten[i][j - 1], j, i, pille);
                        break;
                    }
                    case Feldtypen.grPille:
                    {
                        let pille = new Pille(j, i, this.factor, true);
                        this.pillen[this.pillen.length] = pille;
                        this.knoten[i][j] = new Knoten(this.knoten[i - 1][j], this.knoten[i][j - 1], j, i, pille);
                        break;
                    }
                    //    default :{
                    //this.knoten[i][j]=undefined;
                    //}
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
    bewegen(){
        //Geist Bewegen




        //Geist Bewegen Ende
        //PacMan bewegen

        //PacMan Bewegen Ende

        //änderungen Zeichnen

    }


    //
    //bewegen() {
    //    spielFlaeche.bewegenGeist();
    //    spielFlaeche.bewegenPacMan();
    //    spielFlaeche.figurenZeichnen();
    //}
    //isWand(value, figur) {
    //    if (figur instanceof PacMan) {
    //        return (value == Feldtypen.wand || value == Feldtypen.tuer);
    //    }
    //    else if (figur instanceof Geist) {
    //        return (value == Feldtypen.wand);
    //    }
    //    return true;
    //
    //}
    //isKreuzung(X, Y, figur) {
    //    var ret = [];
    //    var count = 0;
    //    if (!(spielFlaeche.isWand(spielFlaeche.level[Y - 1][X], figur)))ret[count++] = Richtungen.hoch;//oben
    //    if (!(spielFlaeche.isWand(spielFlaeche.level[Y][X + 1], figur)))ret[count++] = Richtungen.rechts;//rechts
    //    if (!(spielFlaeche.isWand(spielFlaeche.level[Y + 1][X], figur)))ret[count++] = Richtungen.runter;//unten
    //    if (!(spielFlaeche.isWand(spielFlaeche.level[Y][X - 1], figur)))ret[count] = Richtungen.links;//links
    //    if (ret.length > 2) {
    //        return [true, ret];
    //    } else return [false, ret];
    //}
    ////todo: hier ist noch ein fehler drin
    //isInEcke(figur) {
    //    var ret = [];
    //    var count = 0;
    //    if (!(spielFlaeche.isWand(spielFlaeche.level[figur.posY - 1][figur.posX], figur)))ret[count++] = Richtungen.runter;//oben ist wand
    //    if (!(spielFlaeche.isWand(spielFlaeche.level[figur.posY][figur.posX + 1], figur)))ret[count++] = Richtungen.links;//rechts ist wand
    //    if (!(spielFlaeche.isWand(spielFlaeche.level[figur.posY + 1][figur.posX], figur)))ret[count++] = Richtungen.hoch;//unten ist wand
    //    if (!(spielFlaeche.isWand(spielFlaeche.level[figur.posY][figur.posX - 1], figur)))ret[count] = Richtungen.rechts;//links ist wand
    //    if (ret.length == 2 && ret[0] == (ret[1] + 2) % 3) {
    //        return [true, (ret[0] == figur.richtung) ? ret[1] : ret[0]];
    //    } else return [false, ret];
    //}
    //bewegenGeist() {
    //    if (spielFlaeche.isKreuzung(this.geist.posX, this.geist.posY, this.geist)[0]) {
    //        this.geist.richtung = this.geist.richtungNeu;
    //    } else {
    //        let inEcke = spielFlaeche.isInEcke(this.geist);
    //        if (inEcke[0])console.log(inEcke);
    //        if (inEcke[0])this.geist.richtung = inEcke[1];
    //    }
    //    switch (this.geist.richtung) {
    //        case Richtungen.hoch:
    //        {
    //
    //            if (this.level[this.geist.posY - 1] == undefined || this.level[this.geist.posY - 1][this.geist.posX] > this.geist.verboteneFelder) {
    //                this.geist.posY--;
    //                if (this.geist.posY < 0) {
    //                    this.geist.posY = this.level.length - 1
    //                }
    //            }
    //            break;
    //        }
    //        case Richtungen.rechts:
    //        {
    //
    //            if (this.level[this.geist.posY][this.geist.posX + 1] > this.geist.verboteneFelder || this.level[this.geist.posY][this.geist.posX + 1] == undefined) {
    //                this.geist.posX++;
    //                if (this.geist.posX > this.level.length - 1) {
    //                    this.geist.posX = 0
    //                }
    //            }
    //            break;
    //        }
    //        case Richtungen.runter:
    //        {
    //
    //            if (this.level[this.geist.posY + 1] == undefined || this.level[this.geist.posY + 1][this.geist.posX] > this.geist.verboteneFelder) {
    //                this.geist.posY++;
    //                if (this.geist.posY > this.level.length - 1) {
    //                    this.geist.posY = 0
    //                }
    //            }
    //            break;
    //        }
    //        case Richtungen.links:
    //        {
    //
    //            if (this.level[this.geist.posY][this.geist.posX - 1] > this.geist.verboteneFelder || this.level[this.geist.posY][this.geist.posX - 1] == undefined) {
    //                this.geist.posX--;
    //                if (this.geist.posX < 0) {
    //                    this.geist.posX = this.level.length - 1
    //                }
    //            }
    //            break;
    //        }
    //    }
    //
    //}

}
//todo: astar eingebaut funzt aber noch nicht ganz
class astar{
  static init(grid){
      for(let y=0;y<grid.length;y++){
          for(let x=0;x<grid[y].length;x++){
              let node=grid[x][y];
              if(node instanceof Knoten) {
                  node.f = 0;
                  node.g = 0;
                  node.h = 0;
                  node.parent = null;
              }
          }
      }
}
   static search(grid,start,end){
       astar.init(grid);
       let openlist=[];
       let closedlist=[];
       openlist.push(grid[start.y][start.x]);
       while(openlist.length>0){
           //kleinsten f(x) raussuchen zum weiterarbeiten
           let kleinsInd=0;
           for (let i in openlist){
               if(openlist[i].f<openlist[kleinsInd].f)kleinsInd=i;
           }
           let aktKnoten=openlist[kleinsInd];
           //ende <-- ergebnis gefunden emittelten pfad zurückgeben
           if (aktKnoten.pos==end){
               let akt=aktKnoten;
               let ret=[];
               while(akt.parent){
                   ret.push(akt);
                   akt=akt.parent
               }
               return ret.reverse();

           }
           //normalfall <-- aktNode von open ind closedlist und alle nachbarn abklappern;
           openlist.splice(openlist.indexOf(aktKnoten),1);
           closedlist.push(aktKnoten);
           let nachbarn=aktKnoten.nachbarn;
           for (let i=0;i<nachbarn.length;i++){
               let nachbar=nachbarn[i];
               if(closedlist.indexOf(nachbar)>-1){
                   //schon abgegraster knoten
                   continue;
               }
               //die gPunkte geben die Distanz vom Start zum aktuellen knoten an
               //nun müssen wir prüfen ob der pfad über den wir diesen nachbarn erreicht haben
               //der kürzeste ist den wir bis jetzt kennen;
               let gPunkte=aktKnoten.g+1;
               let gPunkteIsBester=false;
               if(!openlist.indexOf(nachbar)>(-1)){
                   //diesen Knoten erreichen wir das erste mal alse muss es der aktuell beste weg sein
                   //ausserdem müssen wir nun die Manhatttandistanz=h nehmen
                   gPunkteIsBester=true;
                   nachbar.h=astar.manhattan(nachbar.pos,end);
                   openlist.push(nachbar);
               }else if(gPunkte<nachbar.g){
                   //diesen Knoten haben wir gesehen aber beim letzten war die distanz schlechter
                   gPunkteIsBester=true;
               }
               if(gPunkteIsBester){
                   nachbar.parent=aktKnoten;
                   nachbar.g=gPunkte;
                   nachbar.f=nachbar.g+nachbar.h;
                   nachbar.debug="F: "+nachbar.f+"<br>G: "+nachbar.g+"<br>H: "+nachbar.h;

               }
           }
       }
       //kein ergebnis gefunden leeres array=fehler;
       return[];

   }
    static manhattan(posStart,posEnde){
        var dx=Math.abs(posStart.x-posEnde.x);
        var dy=Math.abs(posStart.y-posEnde.y);
        return dx+dy;
    }


}
