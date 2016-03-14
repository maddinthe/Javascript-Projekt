/**
 * Created by mtheilen on 08.03.2016.
 * tolles Spiel
 */
"use strict";
var spielfeld = document.getElementById('spielFeld');
var context = spielfeld.getContext("2d");

var lvl = [
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
    [2, 2, 2, 5, 0, 0, 0, 0, 0, 1, 4, 4, 4, 6, 4, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2],
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


var sizeX = lvl[0].length;
var sizeY = lvl.length;
var factorX = spielfeld.width / sizeX;
var factorY = spielfeld.height / sizeY;
var offsetX = factorX / 2;
var offsetY = factorY / 2;
var dotsize = (offsetX + offsetY) / 8;
var pacman = document.getElementById("pacman");
var geist = document.getElementById("geist");
var geistX = 0;
var geistY = 0;
var altGeistX = 0;
var altGeistY = 0;
var pacManX;
var pacManY;
var altPacManX;
var altPacManY;
var back;
var altBack;
var geistImageData;
var pacmanVisitedImageData;
var pacmanImageData;
var movable = true;
var richtung = 1; //default rechts
var moveInterval;
var changeableInterval;
var changeable=false;
window.addEventListener("load", function () {
    lvlZeichen();
    moveInterval = setInterval(function () {
        //move sperre zurücksetzten und pacman bewegen lassen
        movable = true;
        pacmanMove();
    }, 50);
    changeableInterval=setInterval(function(){changeable=true},200);
});
window.addEventListener("keydown", function (e) {
    if (movable) {
        var flag = false;
        altGeistX = geistX;
        altGeistY = geistY;
        altBack = back;
        switch (e.keyCode) {
            case 37:
            {//pfeil links
                if (--geistX < 0) {
                    geistX = sizeX - 1;
                }
                if (lvl[geistY][geistX] == 1) {
                    geistX++;
                    flag = true
                }
                break;
            }
            case 38:
            {//pfeil hoch
                if (--geistY < 0) {
                    geistY = sizeY - 1;
                }
                if (lvl[geistY][geistX] == 1) {
                    geistY++;
                    flag = true
                }
                break;
            }
            case 39:
            {//pfeil rechts
                if (++geistX >= sizeX) {
                    geistX = 0;

                }
                if (lvl[geistY][geistX] == 1) {
                    geistX--;
                    flag = true
                }
                break;
            }
            case 40:
            {//pfeil runter
                if (++geistY >= sizeY) {
                    geistY = 0;
                }
                if (lvl[geistY][geistX] == 1) {
                    geistY--;
                    flag = true
                }
                break;
            }
        }
        if (flag) {
            geistX = altGeistX;
            geistY = altGeistY;
            back = altBack;

        } else  back = context.getImageData(geistX * factorX, geistY * factorY, factorX, factorY);

        //alten hintergrund wieder einsetzen
        context.putImageData(altBack, altGeistX * factorY, altGeistY * factorY);
        //geist zeichnen
        context.putImageData(geistImageData, geistX * factorX, geistY * factorY);
        if (lvl[geistY][geistX] == 5) {
            clearInterval(interval);
            zeit = new Date(Math.floor((new Date().getTime() - zeit.getTime())));
            window.alert("Gewonnen! deine Zeit: " + zeit.toUTCString().substring(20, 25));
        }
    }
    movable = false;
});

var zeit = new Date();
var interval = setInterval(function () {
    var sekunden = new Date(Math.floor((new Date().getTime() - zeit.getTime())));
    document.getElementById("zeit").innerText = "Zeit: " + sekunden.toUTCString().substring(20, 25);


}, 1000);

function pacmanMove() {
    if(changeable){
        richtung = Math.floor(Math.random() * 5);
        changeable=false;
    }
    var flag = false;
    altPacManX = pacManX;
    altPacManY = pacManY;
    switch (richtung) {
        case 0:
        {//hoch
            if (--pacManY < 0) {
                pacManY = sizeY - 1;
            }
            if (lvl[pacManY][pacManX] == 1|| lvl[pacManY][pacManX] == 8) {
                pacManY++;
                flag = true
            }
            break;
        }
        case 1:
        {//rechts
            if (++pacManX > sizeX - 1) {
                pacManX = sizeX - 1;
            }
            if (lvl[pacManY][pacManX] == 1 || lvl[pacManY][pacManX] == 8) {
                pacManX--
                flag=true;
            }
            break;
        }
        case 2:
        {//runter
            if (++pacManY > sizeX - 1) {
                pacManY = 0;
            }
            if (lvl[pacManY][pacManX] == 1|| lvl[pacManY][pacManX] == 8) {
                pacManY--;
                flag = true
            }
            break;
        }
        case 3:
        {//links
            if (--pacManX < 0) {
                pacManX = sizeX - 1;
            }
            if (lvl[pacManY][pacManX] == 1 || lvl[pacManY][pacManX] == 8) {
                pacManX++;
                flag = true
            }
            break;
        }
    }
    if (flag) {
        pacManX = altPacManX;
        pacManY = altPacManY;
    }
    else {
        lvl[pacManY][pacManX] = 5;
        lvl[altPacManY][pacManX] = 2;
    }
    //alten hintergrund wieder einsetzen
    context.putImageData(pacmanVisitedImageData, altPacManX * factorX, altPacManY * factorY);
    //geist zeichnen
    context.putImageData(pacmanImageData, pacManX * factorX, pacManY * factorY);
}


function isKreuzung(X, Y) {
    if (lvl[X][Y + 1] != 1 && lvl[X][Y + 1] != 8 && lvl[X][Y - 1] != 1 && lvl[X][Y - 1] != 8 && lvl[X + 1][Y] != 1 && lvl[X + 1][Y] != 8)return true;
    else if (lvl[X][Y + 1] != 1 && lvl[X][Y + 1] != 8 && lvl[X][Y - 1] != 1 && lvl[X][Y - 1] != 8 && lvl[X - 1][Y] != 1 && lvl[X - 1][Y] != 8)return true;
    else if (lvl[X + 1][Y] != 1 && lvl[X + 1][Y] != 8 && lvl[X - 1][Y] != 1 && lvl[X - 1][Y] != 8 && lvl[X][Y + 1] != 1 && lvl[X][Y + 1] != 8)return true;
    else if (lvl[X + 1][Y] != 1 && lvl[X + 1][Y] != 8 && lvl[X - 1][Y] != 1 && lvl[X - 1][Y] != 8 && lvl[X][Y - 1] != 1 && lvl[X][Y - 1] != 8)return true;
    return false
}

function lvlZeichen() {
    for (var i = 0; i < sizeX; i++) {
        for (var j = 0; j < sizeY; j++) {
            switch (lvl[i][j]) {
                case 0:
                {//pillen zeichen
                    context.fillStyle = "yellow";
                    context.arc(j * factorX + offsetX, i * factorY + offsetY, dotsize, 0, 2 * Math.PI);
                    context.fill();
                    context.closePath();
                    break;
                }
                case 1:
                {//Wand zeichnen
                    context.fillStyle = "#696969";
                    context.fillRect(j * factorX, i * factorY, factorX, factorY);
                    break;
                }
                case 3 :
                { //leeren raum zeichen
                    context.fillStyle = "#808080";
                    context.fillRect(j * factorX, i * factorY, factorX, factorY);
                    break;
                }
                case 5:
                {
                    //pacman zeichnen
                    context.drawImage(pacman, j * factorX, i * factorY, factorX, factorY);
                    pacmanImageData = context.getImageData(j * factorX, i * factorY, factorX, factorY);
                    pacmanVisitedImageData = context.getImageData((j - 1) + factorX, i * factorY, factorX, factorY);
                    pacManX = j;
                    pacManY = i;
                    break;

                }
                case 6:
                {//geist zeichnen
                    context.drawImage(geist, j * factorX, i * factorY, factorX, factorY);
                    geistX = j;
                    geistY = i;
                    geistImageData = context.getImageData(j * factorX, i * factorY, factorX, factorY);
                    back = context.getImageData((j - 1) * factorX, (i - 1) * factorY, factorX, factorY);
                    altBack = back;
                    break;
                }
                case 7:
                {
                    //große pillen zeichnen
                    context.fillStyle = "yellow";
                    context.arc(j * factorX + offsetX, i * factorY + offsetY, dotsize * 2, 0, 2 * Math.PI);
                    context.fill();
                    context.closePath();
                    break;
                }
            }
        }
    }
}