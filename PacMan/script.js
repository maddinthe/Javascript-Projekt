/**
 * Created by mtheilen on 08.03.2016.
 */
"use strict"
var spielfeld=document.getElementById('spielFeld');
var context=spielfeld.getContext("2d");
var draw=false;
function drawLine(event) {
    if (draw) {
        var posX = event.clientX-spielfeld.offsetLeft;
        var posY = event.clientY-spielfeld.offsetTop;
        context.lineTo(posX, posY);
        context.stroke()
    }
}

function start(event) {
    var posX = event.clientX-spielfeld.offsetLeft;
    var posY = event.clientY-spielfeld.offsetTop;
    context.moveTo(posX, posY);
    draw = true;

}

function stop() {
    draw = false;
}
