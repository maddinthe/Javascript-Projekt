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
$dbname = "db_packman";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if(isset($_GET['user'])&&isset($_GET['zeit'])&&isset($_GET['punkte'])){
    $stmt= $conn->prepare("INSERT INTO t_highscore(name, zeit, punkte) VALUE (?,CAST(? AS TIME),?)");
    $stmt->bind_param("ssi",$_GET['user'],$_GET['zeit'],$_GET['punkte']);
    $stmt->execute()or die("Insert Fehlgeschlagen: ".$conn->error);
    $stmt->close();
}
else{
    $sql = "SELECT * FROM t_highscore ORDER BY punkte DESC LIMIT 10";
    $result = $conn->query($sql) or die("Abfrage Fehlgeschlagen: ".$conn->error);
    echo json_encode(mysqli_fetch_all($result));
}

$conn->close();
?>