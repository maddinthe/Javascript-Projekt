<?php
$size = 500;
$username;
if (isset($_GET["size"]) && (!is_nan($_GET["size"])))
    $size = $_GET["size"];

if (!isset($_POST["UserName"])) {
    $username = '';
} else {
    $username = $_POST["UserName"];
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PacMan</title>
    <link rel="stylesheet" type="text/css" href="style.css"/>
<!--    <link rel="stylesheet" type="text/css" href="responsive.css" media="(min-width: 320px)" />-->
    <script src="observer.js"></script>
    <script src="load.js"></script>
    <script src="toni.js"></script>

</head>
<body>
<img src="./grafik/pacman.png" id="pacman" alt="" style="display: none">
<img src="./grafik/geist.png" id="geist" alt="" style="display: none"/>

<div>
    <header>
        <img src="./grafik/pacman_marque.gif" alt=""/>
<!--        <div id="reverse-blinker">Reverse!!!</div>-->
        <div class="pacman">
            <img src="./grafik/pacman-161870_1280.png" alt=""/>
        </div>
        <div class="geist">
            <img src="./grafik/birg-149103_1280.png" alt=""/>
        </div>
    </header>
    <div>
        <nav style="width:<?= $size ?>px;">
            <ul>
                <li><a href="" onclick="javascript:show('divArcadeText'); return false">Arcade</a>

                    <div style="display: none" id="divArcadeText">
                        <form action="" method="post">
                            <input type="text" placeholder="Username eingeben" id="usernameEingabe" name="UserName"/>
                            <input class="button" type="submit" value="Spiel starten" id="spielStart" onclick="" ;/>
                        </form>
                    </div>
                </li>
                <li><a href="#">Highscore</a></li>
                <li><a href="#">Einstellungen</a></li>
                <li><a href="" onclick="javascript:show('divHilfeText'); return false">Hilfe</a>

                    <div style="display: none" id="divHilfeText">
                        <h2>So spielt man Reverse Pacman</h2>

                        <p>Man steuert den Pacman mit Hilfe eines Joysticks (oder den Pfeiltasten) durch ein Labyrinth
                            und muss alle darin verteilten Pillen fressen, um eine Ebene (ein Level) höher, weiter zu
                            kommen. Das Originalspiel besitzt 255 Level (und den berühmten SplitScreen).
                            Als Gegner hat Pacman vier farbige Geister, die ihn teilweise zielgerichtet verfolgen (Ihre
                            jeweilige Strategie hat Jamey Pittman ausführlichst dargestellt). Wenn ein Geist ihn
                            berührt, verliert er eines seiner drei Leben und der nächste Pacman muss von der
                            Startposition aus die Aufgabe vollenden, das Labyrinth von Pillen zu befreien und möglichst
                            viele Punkte zu ergattern. Nach dem letzten Leben ist das Spiel vorbei und muss neu
                            gestartet werden, im Original durch den Einwurf neuer Münzen.
                            Doch Pacman hat eine Chance gegen die Verfolger: Die vier blinkenden Kraftpillen in den
                            Ecken machen Pacman unbesiegbar. Nun können die Geister ihm nichts mehr antun, sondern ganz
                            im Gegenteil, Pacman kann sie unschädlich machen; aber nur für kurze Zeit; dann lässt die
                            Wirkung der Kraftpille nach. In den höheren Leveln verkürzt sich die Wirkung der Kraftpille
                            erheblich.
                            Pacman game
                            Pacman Spiel

                            Bonus symbols of Pacman game
                            Die Bonussymbole im Pacman Spiel

                            Ziel des Spiels ist es, möglichst lange am Leben zu bleiben und dabei soviele Punkte zu
                            sammeln, wie möglich: jede einfache Pille bringt 10, jede Kraftpille 50 Punkte.
                            Die Geister nach dem Verzehr einer Kraftpille zu fressen, erhöht den Punktestand um
                            200 für den 1. Geist,
                            400 für den 2.,
                            800 für den 3.
                            und 1600 für den letzten Geist.
                            Die Symbole (im Originalspiel sind es Früchte und später Schlüssel), die je Runde zwei Mal
                            auftauchen, bringen
                            100 Punkte im 1. Level (Kirsche),
                            300 Punkte im 2. (Erdbeere),
                            500 Punkte im 3. und 4. (Orange),
                            700 Punkte im 5 und 6. (Apfel),
                            1000 im 7. und 8. (Weintrauben),
                            2000 im 9. und 10. (Galaxian Raumschiff),
                            3000 im 11 und 12. (Glocke),
                            immer 5000 Punkte ab dem 13. Level (Schlüssel).
                            Bei einer bestimmten Anzahl an Punkten (zuerst 10.000, später 30.000 bzw. 50.000) erhält man
                            ein weiteres Leben, einen weiteren Pacman.
                            Die maximale Punktezahl, die man erreichen kann, wenn man alle möglichen Punkte in den 256
                            Leveln ergattert, ist 3.333.360; diese sammelte erst 1999 Billy Mitchell aus Hollywood
                            (Florida, USA) in rund sechs Stunden Spielzeit. Der Zeitrekord für das Erreichen dieser
                            Maximal-Punktzahl liegt jedoch mittlerweile bei 3 Stunden, 41 Minuten und 22 Sekunden und
                            wurde 2009 von David Race aus Beavercreek, Ohio festgelegt.
                            Das Original-Pacman-Spiel hat natürlich noch zahlreiche Besonderheiten, die außerdem vom
                            Spielgerät abhängig sind, an dem man Pacman spielt. So besitzen die Geister im
                            Original-Arcade-Spiel typische Bewegungsmuster, die starr festgelegt sind (so starr, dass
                            sie Pacman an einer Stelle des Labyrinths nicht finden, wenn man ihn sofort nach dem Start
                            dort positioniert). So sucht nach jedem Spielstart jeder Geist zuerst eine bestrimmte Ecke
                            des Labyrinths auf, bevor er auf die Jagd nach Pacman geht. Dieser so genannte
                            Scatter(Zerstreuungs)-Modus tritt während jedes Levels zweimal auf, ist aber in den höheren
                            Leveln stark verkürzt.
                            Im Strategie-Wiki lässt sich das alles ausführlicher nachlesen.
                            Wer es wirklich supergenau wissen will, für den beschreibt Jamey Pittman in seinem
                            "Pacman-Dossier" jedes Detail des Spiels haarklein. Wer also einen tiefen Einblick in die
                            Seele des kleinen Gelben nehemen will, der muss dieses Dossier studieren.</p>
                    </div>
                </li>
            </ul>
        </nav>
        <section style="width:<?= $size ?>px; height:<?= $size ?>px;">
            <div class="pause inaktiv">Pause</div>
            <div id="start" class="gewonnenverloren">Press Return</div>
            <div id="verloren" class="gewonnenverloren inaktiv">Verloren</div>
            <div id="gewonnen" class="gewonnenverloren inaktiv">Gewonnen</div>
            <div id="zeitContainer">Zeit:<br/>00:00:00</div>
            <div id="userNameContainer">Hans</div>
            <canvas id="spielFeld">Ihr Browser kann kein HTML 5</canvas>
            <canvas id="pacmanFeld">Ihr Browser kann kein HTML 5</canvas>
            <canvas id="geisterFeld">Ihr Browser kann kein HTML 5</canvas>
        </section>
        <footer>

        </footer>
    </div>
</div>
<script src="pacman.js"></script>
<script src="datenbank.js"></script>
</body>
</html>