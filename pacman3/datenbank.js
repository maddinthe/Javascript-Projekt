function punkte() {
    return 0 - ((zustand.gesamtpillen - zustand.restpillen) + (zustand.zeitSpanne / zustand.schwierigkeit*1000));
}


function time(ms) {
    return new Date(ms).toISOString().slice(11,19);
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
while(zustand.status==2)
console.log(time(new Date().getTime()));

function send() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'datenbank.php', true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener('readystatechange', function () {

            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                console.log(xmlhttp.responseText);
            }

    });
    xmlhttp.send("user=" + encodeURIComponent(zustand.spielerName) + "&zeit=" + encodeURIComponent(time(zustand.zeitSpanne)) + "&punkte=" + encodeURIComponent(punkte()));
}



