<?php
// Verbindungsaufbau und Auswahl der Datenbank
$dbconn = pg_connect("host=localhost dbname=hs06-4 user=hs06-4 password=2HCFGtn2")
or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());

//Nach Beendigung des Spiels füge die Spieldaten als Datensatz hinzu:
if (isset($_POST['user'])) {
    $spiel = "INSERT INTO t_highscore (name, zeit, punkte) VALUES ($1,CAST($2 AS TIME),$3)";
    $result = pg_query_params($dbconn, $spiel, array($_POST ["user"], $_POST ["zeit"], $_POST ["punkte"])) or die('Abfrage fehlgeschlagen: ' . pg_last_error());

    //Datenbank begrenzen
    $zahl1=pg_fetch_all_columns(pg_query("SELECT count(*) FROM t_highscore"),0)[0];

    while ($zahl1 > 20) {
        $kleinster = pg_query("SELECT MIN(punkte) FROM t_highscore");
        $abfrage = json_encode(pg_fetch_all_columns($kleinster, 0));
        $zahl2 = floatval(substr($abfrage, 2, -2));
        pg_query("DELETE FROM t_highscore WHERE punkte=$zahl2") or die('Abfrage fehlgeschlagen: ' . pg_last_error());
        $zahl1=pg_fetch_all_columns(pg_query("SELECT count(*) FROM t_highscore"),0)[0];
    }





} else {

//Ansonsten Gib den Highscore als Array zurück
    $highscore = pg_query("SELECT * FROM t_highscore ORDER BY punkte DESC LIMIT 10") or die('Abfrage fehlgeschlagen: ' . pg_last_error());
    echo json_encode(pg_fetch_all($highscore));
    // Speicher freigeben
    pg_free_result($highscore);


}
// Verbindung schließen
pg_close($dbconn);
?>




