/**
 * Created by mtheilen on 07.03.2016.
 */
"use strict"
var canvas = document.getElementById("drawArea");
var ctx = canvas.getContext('2d');
var draw = false;
function drawLine(event) {
    if (draw) {
        var posX = event.pageX;
        var posY = event.pageY
        ctx.lineTo(posX, posY)
        ctx.stroke()
    }
}

function start(event) {
    var posX = event.pageX;
    var posY = event.pageY;
    ctx.moveTo(posX, posY);
    draw = true;

}

function stop() {
    draw = false;
}