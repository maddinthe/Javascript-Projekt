<?php
$pages = ['spiel' => 'Spiel',
    'highscore' => 'Highscores',
    'einstellungen' => 'Einstellungen',
    'hilfe' => 'Hilfe',
    'ueber' => 'Über das Spiel'];
if (isset($_GET['page']) && isset($pages[$_GET['page']])) {
    $currentPage = $_GET['page'];
} else $currentPage = 'spiel';
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Reverse Pac-Man</title>
    <link rel="stylesheet" href="style.css"/>
</head>
<body>
<div id="all">
    <?php
    require 'head.php';
    echo "<div id='main'>";
    require 'navigation.php';
    require 'content.php';
    echo"</div>";
    require 'foot.php';
    ?>
</div>


</body>
</html>
