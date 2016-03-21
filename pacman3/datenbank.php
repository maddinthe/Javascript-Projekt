<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Datenbank</title>
</head>
<body>

<?php
// Verbindungsaufbau und Auswahl der Datenbank
$dbconn = pg_connect("host=localhost dbname=db_pacman user=postgres password=root")
or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());

// Eine SQL-Abfrage ausführen
//$zeit = ;
//$punkte = ;
//$name = ;
//$platz ;
$spiel = "INSERT INTO t_highscore (platz, name, zeit, punkte) VALUES (4,'Turner',TIME '00:25:12',-255)";
$platzierung = "UPDATE t_highscore SET platz = 1 WHERE punkte = MAX()";
$anzeige = "SELECT * FROM t_highscore";
$reset = "DROP TABLE t_highscore";
$neu = "CREATE TABLE t_highscore(platz INTEGER, name VARCHAR(30),zeit TIME,punkte INTEGER)";
pg_query($spiel) or die('Abfrage fehlgeschlagen: ' . pg_last_error());
pg_query($platzierung) or die('Abfrage fehlgeschlagen: ' . pg_last_error());
$highscore = pg_query($anzeige) or die('Abfrage fehlgeschlagen: ' . pg_last_error());



// Ergebnisse in HTML ausgeben
echo "<table>\n";
    while ($line = pg_fetch_array($highscore, null, PGSQL_ASSOC)) {
    echo "\t<tr>\n";
        foreach ($line as $col_value) {
        echo "\t\t<td>$col_value</td>\n";
        }
        echo "\t</tr>\n";
    }
    echo "</table>\n";

if (isset($_GET['Reset'])) {
    pg_query($reset) or die('Abfrage fehlgeschlagen: ' . pg_last_error());
    pg_query($neu) or die('Abfrage fehlgeschlagen: ' . pg_last_error());
}

// Speicher freigeben
pg_free_result($highscore);

// Verbindung schließen
pg_close($dbconn);
?>
<br>
<form action="datenbank.php" method="get">
<input type="button" id="Reset" value="Reset">
</form>

</body>
</html>
