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


$datensatz = [
    'name' => 'Maddin',
    'zeit' => '00:12:13',
    'punkte' => '255',
];
//$zeit = if (datensatz.);
//$punkte = ;
//$name = $username;
//$platz ;



//Nach Beendigung des Spiels füge die Spieldaten als Datensatz hinzu:
if(isset($_POST['datensatz'])){
    $spiel = "INSERT INTO t_highscore (name, zeit, punkte) VALUES ('Turner',TIME '00:25:12',255)";
}

pg_query($spiel) or die('Abfrage fehlgeschlagen: ' . pg_last_error());
$highscore = pg_query("SELECT * FROM t_highscore ORDER BY punkte DESC") or die('Abfrage fehlgeschlagen: ' . pg_last_error());



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
//Highscore resetten
if (isset($_GET['Reset'])) {
    $reset = "DROP TABLE t_highscore";
    $neu = "CREATE TABLE t_highscore(name VARCHAR(30),zeit TIME,punkte INTEGER)";
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
