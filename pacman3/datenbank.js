var username = document.getElementById("usernameEingabe");
var schwierigkeit = 1000;
var user = zustand.spielerName;

function punkte(){
    return 0-((zustand.gesamtpillen-zustand.restpillen)+(zustand.zeitSpanne/schwierigkeit));
}


var secDiff = zustand.zeitSpanne / 1000; //in s
var minDiff = zustand.zeitSpanne / 60 / 1000; //in minutes
var hDiff = zustand.zeitSpanne / 3600 / 1000; //in hours


var zeit = hDiff+":"+minDiff+":"+secDiff;


var datensatz = {
    user, zeit, punkte
};
datensatz.punkte=punkte();

function holen(){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'datenbank.php', true);

    xmlhttp.send();
}
function send(name,zeit,punkte){
    let xmlhttp=new XMLHttpRequest();
    xmlhttp.open('POST', 'datenbank.php', true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener('readystatechange', function () {

        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            console.log(xmlhttp.responseText);
        }

    });
    xmlhttp.send("user="+encodeURIComponent("'"+name+"'")+"&zeit="+encodeURIComponent("'"+zeit+"'")+"&punkte="+encodeURIComponent("'"+punkte+"'"));
}



