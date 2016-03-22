/**
 * Created by mtheilen on 22.03.2016.
 */

var username = document.getElementById("usernameEingabe");
var schwierigkeit = 10;
var user = username.value;


var punkte = zeitSpanne/schwierigkeit;

var secDiff = zeitSpanne / 1000; //in s
var minDiff = zeitSpanne / 60 / 1000; //in minutes
var hDiff = zeitSpanne / 3600 / 1000; //in hours


var zeit = hDiff+":"+minDiff+":"+secDiff;

var datensatz = {
    user, zeit, punkte
};

var xmlhttp = new XMLHttpRequest();
xmlhttp.open('POST', 'datenbank.php', true);
xmlhttp.addEventListener('readystatechange', function() {

    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        console.log(xmlhttp.responseText);
    }

});
xmlhttp.send();

xmlhttp.open('POST', 'datenbank.php', true);
xhr.responseType = 'arraybuffer';

xhr.onload = function(e) {
    var uInt8Array = new Uint8Array(datensatz);
};



