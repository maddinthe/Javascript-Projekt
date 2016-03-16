<?php
$size=500;
if(isset($_POST["size"])&&(!is_nan($_POST["size"])))
    $size=$_POST["size"];
?>
<img src="./grafik/pacman.png" id="pacman" alt="" style="display: none">
<img src="./grafik/geist.png" id="geist" alt="" style="display: none"/>
<canvas id="spielFeld" width="<?=$size?>" height="<?=$size?>" style="border: solid black 1px;"">
    Ihr Browser unterstüzt kein HTML5 Canvas!
</canvas>
<br/>
<span id="spieler">Spieler: Wurst</span>
<span id="zeit">Zeit: 00:00</span>


<script src="./script.js"></script>