var username = document.getElementById("usernameEingabe");
var schwierigkeit = 1000;
var user = zustand.spielerName;


function punkte() {
    return 0 - ((zustand.gesamtpillen - zustand.restpillen) + (zustand.zeitSpanne / schwierigkeit));
}

function zeitbestimmen() {
    var secDiff = Math.floor(zustand.zeitSpanne / 1000); //in s
    var minDiff = Math.floor(zustand.zeitSpanne / (60 * 1000)); //in min
    var hDiff = Math.floor(zustand.zeitSpanne / (3600 * 1000)); //in h
    if (secDiff < 10)
        secDiff = "0" + secDiff;
    if (minDiff < 10)
        minDiff = "0" + minDiff;
    if (hDiff < 10)
        hDiff = "0" + hDiff;
    return hDiff + ":" + minDiff + ":" + secDiff;


}






function holen() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'datenbank.php', true);
    xmlhttp.addEventListener('readystatechange', function () {

        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            console.log(xmlhttp.responseText);
        }

    });

    xmlhttp.send();
}
function send() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'datenbank.php', true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener('readystatechange', function () {

            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                console.log(xmlhttp.responseText);
            }

    });
    xmlhttp.send("user=" + encodeURIComponent(user) + "&zeit=" + encodeURIComponent(zeitbestimmen()) + "&punkte=" + encodeURIComponent(punkte()));
}



