<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<div id="test">bla</div>
<script>


    var xhr=new XMLHttpRequest();
    xhr.open('POST',"ajax-test/ajax.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.addEventListener('readystatechange', function() {

        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("test").innerHTML=xhr.responseText;
        }

    });

    xhr.send('name=Toni&Zeit=100');
</script>
</body>
</html>