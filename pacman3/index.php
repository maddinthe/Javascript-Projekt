<?php
$size = 500;
$username= "Testname";
if (isset($_GET["size"]) && (!is_nan($_GET["size"])))
    $size = $_GET["size"];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PacMan</title>
    <link rel="stylesheet" href="style.css"/>
    <script src="observer.js"></script>
</head>
<body>
<img src="./grafik/pacman.png" id="pacman" alt="" style="display: none">
<img src="./grafik/geist.png" id="geist" alt="" style="display: none"/>

<div>
    <header style="width:<?= $size ?>px;">
        <img src="./grafik/pacman_marque.gif" alt=""/>
    </header>
    <nav style="width:<?= $size ?>px;">
        <ul>
            <li><a href="#">Arcade</a></li>
            <li><a href="#">Highscore</a></li>
            <li><a href="#">Einstellungen</a></li>
            <li><a href="#">Hilfe</a></li>
        </ul>
    </nav>
    <section style="width:<?= $size ?>px; height:<?= $size ?>px;">
        <canvas id="spielFeld" width="<?= $size ?>" height="<?= $size ?>">Ihr Browser kann kein HTML 5</canvas>
        <canvas id="pacmanFeld" width="<?= $size ?>" height="<?= $size ?>">Ihr Browser kann kein HTML 5</canvas>
        <canvas id="geisterFeld" width="<?= $size ?>" height="<?= $size ?>">Ihr Browser kann kein HTML 5</canvas>
    </section>
    <section>
        <nav style="width:<?= $size ?>px;">
            <ul>
                <li>Username: <?= $username ?> | </li>
                <li>Zeit: <?= time()?></li>
            </ul>
        </nav>
    </section>
    <div class="user">
        <input type="text" placeholder="Username eingeben" name="username" id="username"/>
        <input class="button" type="button" value="Spiel starten" id="spielstart"/>
    </div>
</div>
<script src="pacman.js"></script>
</body>
</html>