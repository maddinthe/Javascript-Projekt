function punkte() {
    if (zustand.restpillen < 1)return 120000 - zustand.zeitSpanne;
    let ret = (120000 - zustand.zeitSpanne) * (zustand.restpillen / zustand.gesamtpillen);
    if (zustand.schwierigkeit < 0)
        ret *= 0.75;
    else if (zustand.schwierigkeit > 0)
        ret *= 1.25;
    return ret;
}


function time(ms) {
    return new Date(ms).toISOString().slice(11, 19);
}

function holen(displayElement) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'datenbank.php', true);
    xmlhttp.addEventListener('readystatechange', function () {

        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let tablecontent=JSON.parse(xmlhttp.responseText);
            console.log(tablecontent);
            if (displayElement != undefined){
                let table=document.createElement("table");
                table.innerHTML="<tr><th>Platz</th><th>Name</th><th>Zeit</th><th>Punkte</th></tr>";
                for (let i in tablecontent){
                    let tr=document.createElement("tr");
                    let platz=document.createElement("td");
                    let name=document.createElement("td");
                    let zeit=document.createElement("td");
                    let punkte=document.createElement("td");
                    platz.innerText=1+Number(i);
                    name.innerText=tablecontent[i].name;
                    zeit.innerText=tablecontent[i].zeit;
                    punkte.innerText=Math.round(tablecontent[i].punkte);
                    tr.appendChild(platz);
                    tr.appendChild(name);
                    tr.appendChild(zeit);
                    tr.appendChild(punkte);
                    table.appendChild(tr);
                }displayElement.appendChild(table);
            }

        }

    });

    xmlhttp.send();
}

/**
 *
 * @param name Spielername
 * @param zeit Gesamtzeit die Abgelaufen ist in ms
 * @param punkte Gesamtpunkte
 */
function send(name, zeit, punkte) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'datenbank.php', true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener('readystatechange', function () {

        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            console.log(xmlhttp.responseText);
        }

    });
    xmlhttp.send("user=" + encodeURIComponent(name) + "&zeit=" + encodeURIComponent(time(zeit)) + "&punkte=" + encodeURIComponent(punkte));
}



