/**
 * Created by mtheilen on 08.03.2016.
 */
"use strict"
var spielfeld = document.getElementById('spielFeld');
var context = spielfeld.getContext("2d");

var lvl = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 3, 3, 3, 3, 1, 0, 1, 0, 1, 3, 3, 3, 3, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 3, 3, 1, 0, 1, 0, 1, 3, 3, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [3, 3, 3, 1, 0, 1, 3, 1, 0, 1, 1, 2, 2, 2, 1, 1, 0, 1, 3, 1, 0, 1, 3, 3, 3],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 4, 4, 4, 4, 4, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [2, 2, 2, 2, 0, 0, 0, 0, 0, 1, 4, 4, 5, 4, 4, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2],
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
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];


var sizeX = lvl[0].length;
var sizeY = lvl.length;
var factorX = spielfeld.width / sizeX;
var factorY = spielfeld.height / sizeY;
var offsetX = factorX / 2;
var offsetY = factorY / 2;
var dotsize = (offsetX + offsetY) / 8;
var pacman=document.getElementById("pacman");
lvlZeichen();
function lvlZeichen() {
    for (var i = 0; i < sizeX; i++) {
        for (var j = 0; j < sizeY; j++) {
            switch (lvl[i][j]) {
                case 0:
                {
                    context.fillStyle = "yellow";
                    context.arc(j * factorX + offsetX, i * factorY + offsetY, dotsize, 0, 2 * Math.PI);
                    context.fill();
                    context.closePath();
                    break;
                }
                case 1:
                {
                    context.fillStyle = "#696969";
                    context.fillRect(j * factorX, i * factorY, factorX, factorY);
                    break;
                }
                case 3 :
                {
                    context.fillStyle = "#808080";
                    context.fillRect(j * factorX, i * factorY, factorX, factorY);
                    break;
                }
                case 5:{
                    context.drawImage(pacman,j*factorX,j*factorY,factorX,factorY);

                }
            }


        }
    }
}
