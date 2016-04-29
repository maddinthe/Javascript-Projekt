<?php
/**
 * Created by IntelliJ IDEA.
 * User: mtheilen
 * Date: 28.04.2016
 * Time: 07:09
 */
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_pacman";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if (isset($_GET['user']) && isset($_GET['zeit']) && isset($_GET['punkte'])) {
    $menge = $conn->query("SELECT * FROM t_highscore")->num_rows;
    if ($menge > 19) {
        $pk=$conn->query("SELECT pk FROM t_highscore WHERE punkte=(SELECT min(punkte) FROM t_highscore)")->fetch_array()[0];
        $stmt = $conn->prepare("UPDATE t_highscore set name=?,zeit=cast(? AS TIME),punkte=? WHERE pk=$pk");

    } else {
        $stmt = $conn->prepare("INSERT INTO t_highscore(name, zeit, punkte) VALUE (?,CAST(? AS TIME),?)");
    }
    $stmt->bind_param("ssi", $_GET['user'], $_GET['zeit'], $_GET['punkte']);
    $stmt->execute() or die("Insert/Update Fehlgeschlagen: " . $conn->error);
    $stmt->close();
} else {
    $sql = "SELECT * FROM t_highscore ORDER BY punkte DESC LIMIT 10";
    $result = $conn->query($sql) or die("Abfrage Fehlgeschlagen: " . $conn->error);
    echo json_encode(mysqli_fetch_all($result));
}
$conn->close();