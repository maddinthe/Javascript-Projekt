var username = document.getElementById("usernameEingabe");
var schwierigkeit = 10;
var user = zustand.spielerName;


var punkte = 0-((zustand.gesamtpillen-zustand.restpillen)+(zustand.zeitSpanne/schwierigkeit));

var secDiff = zustand.zeitSpanne / 1000; //in s
var minDiff = zustand.zeitSpanne / 60 / 1000; //in minutes
var hDiff = zustand.zeitSpanne / 3600 / 1000; //in hours


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
//
//xmlhttp.open('POST', 'datenbank.php', true);
//xmlhttp.responseType = 'arraybuffer';
//
//xmlhttp.onload = function(e) {
// var uInt8Array = new Uint8Array(datensatz);
//};