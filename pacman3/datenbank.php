<?php
// Verbindungsaufbau und Auswahl der Datenbank

$dbconn = pg_connect("host=localhost dbname=db_pacman user=postgres password=root")
or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());

//Nach Beendigung des Spiels füge die Spieldaten als Datensatz hinzu:
if (isset($_POST['user'])) {
    $spiel = "INSERT INTO t_highscore (name, zeit, punkte) VALUES ($1,CAST($2 AS TIME),$3)";
    $result = pg_query_params($dbconn, $spiel, array($_POST ["user"], $_POST ["zeit"], $_POST ["punkte"])) or die('Abfrage fehlgeschlagen: ' . pg_last_error());

} else {

//Ansonsten Gib den Highscore als Array zurück
    $highscore = pg_query("SELECT * FROM t_highscore ORDER BY punkte DESC") or die('Abfrage fehlgeschlagen: ' . pg_last_error());
    echo json_encode(pg_fetch_all($highscore));

//Datenbank begrenzen
    $zaehlen = pg_query("SELECT count(*) FROM t_highscore");
    $encode = json_encode(pg_fetch_all_columns($zaehlen, 0));
    $zahl1 = intval(substr($encode, 2, -2));

    while ($zahl1-- > 20) {
        $kleinster = pg_query("SELECT MIN(punkte) FROM t_highscore");
        $abfrage = json_encode(pg_fetch_all_columns($kleinster, 0));
        $zahl2 = floatval(substr($abfrage, 2, -2));
        pg_query("DELETE FROM t_highscore WHERE punkte=$zahl2") or die('Abfrage fehlgeschlagen: ' . pg_last_error());;

    }


    // Speicher freigeben
    pg_free_result($highscore);
}
// Verbindung schließen
pg_close($dbconn);
?>




