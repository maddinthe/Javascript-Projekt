function punkte() {
    if (zustand.restpillen < 1)return 120000-zustand.zeitSpanne;
    let ret = (120000-zustand.zeitSpanne) * (zustand.restpillen / zustand.gesamtpillen);
    if (zustand.schwierigkeit < 0)
        ret *= 0.75;
    else if (zustand.schwierigkeit > 0)
        ret *= 1.25;
    return ret;
}


function time(ms) {
    return new Date(ms).toISOString().slice(11, 19);
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
    xmlhttp.send("user=" + encodeURIComponent(zustand.spielerName) + "&zeit=" + encodeURIComponent(time(zustand.zeitSpanne)) + "&punkte=" + encodeURIComponent(punkte()));
}



