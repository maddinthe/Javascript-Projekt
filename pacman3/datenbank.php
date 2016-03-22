<?php
// Verbindungsaufbau und Auswahl der Datenbank
$dbconn = pg_connect("host=localhost dbname=db_pacman user=postgres password=root")
or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());




//Nach Beendigung des Spiels füge die Spieldaten als Datensatz hinzu:
if (isset($_POST['user'])) {
    $name = ($_POST ["user"]);
    $zeit = ($_POST ["zeit"]);
    $punkte = ($_POST ["punkte"]);
    echo 'Name= '.$name.' Zeit= '.$zeit.' Punkte= '.$punkte;
    $spiel = "INSERT INTO t_highscore (name, zeit, punkte) VALUES ($name,CAST($zeit AS TIME),$punkte)";
    pg_query($spiel) or die('Abfrage fehlgeschlagen: ' . pg_last_error());

} else {

//Ansonsten Gib den Highscore als Array zurück
    $highscore = pg_query("SELECT * FROM t_highscore ORDER BY punkte DESC LIMIT(10)") or die('Abfrage fehlgeschlagen: ' . pg_last_error());


    echo json_encode(pg_fetch_all($highscore));
//Highscore resetten
    if (isset($_POST['Reset'])) {
        $reset = "DROP TABLE t_highscore";
        $neu = "CREATE TABLE t_highscore(name VARCHAR(30),zeit TIME,punkte INTEGER)";
        pg_query($reset) or die('Abfrage fehlgeschlagen: ' . pg_last_error());
        pg_query($neu) or die('Abfrage fehlgeschlagen: ' . pg_last_error());
    }
    // Speicher freigeben
    pg_free_result($highscore);
}


// Verbindung schließen
pg_close($dbconn);
?>




