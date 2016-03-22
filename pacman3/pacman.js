/**
 * Created by mtheilen on 16.03.2016.
 * versuch 3 mit MVC
 */
"use strict";
var zustand = {
    status: 0,
    pause: false,
    observer: null,
    gesamtpillen:100,
    startZeit:5,
    restpillen:5,
    spielerName:"platzhalter",
    zeitSpanne:5
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
    [0, 4, 4, 0, 4, 0, 4, 0, 1, 1, 0, 4, 0, 4, 0, 1, 1, 0, 4, 0, 4, 0, 4, 4, 0],
    [0, 4, 0, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 4, 0, 0, 4, 0],
    [0, 4, 0, 0, 4, 0, 4, 0, 0, 5, 0, 4, 0, 4, 0, 5, 0, 0, 4, 0, 4, 0, 0, 4, 0],
    [0, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
var spielFlaeche;
var intervalle = [];


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
            case 32:
            {
                zustand.pause = !zustand.pause;
                break;
            }
        }
    });
    zustand.startZeit = new Date().getTime();
    intervalle.push(setInterval(spielFlaeche.bewegen, 200));
    intervalle.push(setInterval(function () {
        spielFlaeche.pacMan.darfwegglaufen = !spielFlaeche.pacMan.darfwegglaufen;
        console.log(spielFlaeche.pacMan.darfwegglaufen);
    }, 5000));
}
function controller_verloren() {
    zustand.zeitSpanne = new Date().getTime() - zustand.startZeit;
    alert("Verloren!");
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
                case 3:
                {
                    for (let i in intervalle) {
                        clearInterval(intervalle[i])
                    }
                    controller_verloren();
                }
            }
        }
        else if (change.name === "pause") {
            let pausediv=document.getElementsByClassName("pause");
            console.log(pausediv);
                for(let i=0;i<pausediv.length;i++){
                    if(zustand.pause)pausediv[i].classList.remove("pause-inaktiv");
                    else pausediv[i].classList.add("pause-inaktiv");
                }



        }
    });
});
var load = window.addEventListener("load", function () {
    zustand.status = 1;
});
//<<------------------Klassendefinition------------------>>

class Knoten {
    constructor(knotenOben, knotenLinks, posX, posY, pille) {
        this.knotenOben = knotenOben;
        this.knotenUnten = null;
        this.knotenLinks = knotenLinks;
        this.knotenRechts = null;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.debug = "";
        this.parent = null;
        this.posX = posX;
        this.posY = posY;
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

    get nachbarn() {
        let ret = [];
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
        this.darfwegglaufen = true;
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
        zustand.gesamtpillen=this.pillen.length;
        zustand.status = 2;
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
                        this.knoten[i][j] = null;
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
                        this.knoten[i][j] = null;
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
                        this.pillen.push(pille);
                        this.knoten[i][j] = new Knoten(this.knoten[i - 1][j], this.knoten[i][j - 1], j, i, pille);
                        break;
                    }
                    case Feldtypen.grPille:
                    {
                        let pille = new Pille(j, i, this.factor, true);
                        this.pillen.push(pille);
                        this.knoten[i][j] = new Knoten(this.knoten[i - 1][j], this.knoten[i][j - 1], j, i, pille);
                        break;
                    }
                        this.knoten[i][j] = null


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

    //todo:funktioniert weitestgehend ein/zwei bugs müssen noch drin sein
    bewegen() {
        //überprüfen ob Pause ist. wenn ja dann garnichts machen.
        if (!zustand.pause) {
            //Geist Bewegen
            let knoten = spielFlaeche.knoten;
            let geist = spielFlaeche.geist;
            if (knoten[geist.posY][geist.posX].nexthop(geist.richtungNeu)==geist.richtungNeu)
                geist.richtung=geist.richtungNeu;





            //Geist Bewegen Ende
            //PacMan bewegen
            //prüfen ob geist in der nähe ist und pacman flüchten darf
            let pacman = spielFlaeche.pacMan;
            let pillen = spielFlaeche.pillen;
            if (pacman.darfwegglaufen && astar.manhattan(geist.posX, geist.posY, pacman.posX, pacman.posY) < 6) {
                let zielX = 1;
                let zielY = 1;
                if (geist.posX < spielFlaeche.level[0].length / 2)zielX = spielFlaeche.level[0].length - 2;
                if (geist.posY < spielFlaeche.level.length / 2)zielY = spielFlaeche.level.length - 2;
                let route = astar.search(knoten, pacman.posX, pacman.posY, zielX, zielY);
                pacman.posX = route[0].posX;
                pacman.posY = route[0].posY;

            }
            else {
                //--nächste pille rausfinden mittels manhattan distanz rausfinden;


                let nahestPille = 0;
                let nahestPilleManhattan = 1000;
                if (pillen.length == 0) {
                    zustand.status = 3;
                    return;
                }
                for (let i in pillen) {
                    let manhattan = astar.manhattan(pacman.posX, pacman.posY, pillen[i].posX, pillen[i].posY);
                    if (manhattan < nahestPilleManhattan) {
                        nahestPilleManhattan = manhattan;
                        nahestPille = i;
                    }
                }

                let zielPille = pillen[nahestPille];
                let zielRoute = astar.search(knoten, pacman.posX, pacman.posY, zielPille.posX, zielPille.posY);
                pacman.posX = zielRoute[0].posX;
                pacman.posY = zielRoute[0].posY;
            }
            if (knoten[pacman.posY][pacman.posX].pille != null) {
                let pille = knoten[pacman.posY][pacman.posX].pille;
                knoten[pacman.posY][pacman.posX].pille = null;
                pillen.splice(pillen.indexOf(pille), 1);
            }
            //PacMan Bewegen Ende
            //änderungen Zeichnen
            spielFlaeche.figurenZeichnen();
        }
    }
}
class astar {
    static init(grid) {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                let node = grid[x][y];
                if (node instanceof Knoten) {
                    node.f = 0;
                    node.g = 0;
                    node.h = 0;
                    node.parent = null;
                }
            }
        }
    }

    static search(grid, startX, startY, endX, endY) {
        astar.init(grid);
        let openlist = [];
        let closedlist = [];
        openlist.push(grid[startY][startX]);
        while (openlist.length > 0) {
            //kleinsten f(x) raussuchen zum weiterarbeiten
            let kleinsInd = 0;
            for (let i in openlist) {
                if (openlist[i].f < openlist[kleinsInd].f)kleinsInd = i;
            }
            let aktKnoten = openlist[kleinsInd];
            //ende <-- ergebnis gefunden ermittelten pfad zurückgeben
            if (aktKnoten.posX == endX && aktKnoten.posY == endY) {
                let akt = aktKnoten;
                let ret = [];
                while (akt.parent != null) {
                    ret.push(akt);
                    akt = akt.parent
                }
                return ret.reverse();

            }
            //normalfall <-- aktNode von open ind closedlist und alle nachbarn abklappern;
            openlist.splice(openlist.indexOf(aktKnoten), 1);
            closedlist.push(aktKnoten);
            let nachbarn = aktKnoten.nachbarn;
            for (let i = 0; i < nachbarn.length; i++) {
                let nachbar = nachbarn[i];
                if (closedlist.indexOf(nachbar) > -1) {
                    //schon abgegraster knoten
                    continue;
                }
                //die gPunkte geben die Distanz vom Start zum aktuellen knoten an
                //nun müssen wir prüfen ob der pfad über den wir diesen nachbarn erreicht haben
                //der kürzeste ist den wir bis jetzt kennen;
                let gPunkte = aktKnoten.g + 1;
                let gPunkteIsBester = false;
                if (!(openlist.indexOf(nachbar) > -1)) {
                    //diesen Knoten erreichen wir das erste mal alse muss es der aktuell beste weg sein
                    //ausserdem müssen wir nun die Manhatttandistanz=h nehmen
                    gPunkteIsBester = true;
                    nachbar.h = astar.manhattan(nachbar.posX, nachbar.posY, endX, endY);
                    openlist.push(nachbar);
                } else if (gPunkte < nachbar.g) {
                    //diesen Knoten haben wir gesehen aber beim letzten war die distanz schlechter
                    gPunkteIsBester = true;
                }
                if (gPunkteIsBester) {
                    nachbar.parent = aktKnoten;
                    nachbar.g = gPunkte;
                    nachbar.f = nachbar.g + nachbar.h;
                    nachbar.debug = "F: " + nachbar.f + "<br>G: " + nachbar.g + "<br>H: " + nachbar.h;

                }
            }
        }
        //kein ergebnis gefunden leeres array=fehler;
        return [];

    }

    static manhattan(posStartX, posStartY, posEndeX, posEndeY) {
        var dx = Math.abs(posStartX - posEndeX);
        var dy = Math.abs(posStartY - posEndeY);
        return dx + dy;
    }


}

//---------------------------------------------------- Datenbank --------------------------------------------------------

var username = document.getElementById("usernameEingabe");
var schwierigkeit = 10;
var user = username.value;


var punkte = zeitSpanne/schwierigkeit;

var secDiff = zeitSpanne / 1000; //in s
var minDiff = zeitSpanne / 60 / 1000; //in minutes
var hDiff = zeitSpanne / 3600 / 1000; //in hours


var zeit = hDiff+":"+minDiff+":"+secDiff;

var datensatz = {
    user, zeit, punkte
};

var xmlhttp = new XMLHttpRequest();
xmlhttp.open('POST', 'datenbank.php', true);
xmlhttp.addEventListener('readystatechange', function() {

    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        console.log(xmlhttp.responseText);
    }

});
xmlhttp.send();

