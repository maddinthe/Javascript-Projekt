/**
 * Created by mtheilen on 16.03.2016.
 * PacMan-Reverse gebaut von T_Kertz Cpt. T.Turner und Maddinthe
 */
"use strict";
(function () {
    var zustand = {
        reload: null,
        status: -1,
        pause: false,
        observer: null,
        aengstlich: false,
        gesamtpillen: 100,
        restpillen: 5,
        spielerName: "",
        startZeit: 0,
        zeitSpanne: 5,
        geistfarbe: "blau",
        schwierigkeit: -2,
        spielFeldGroesse: 500,
        ton: true
    };
    if (typeof(localStorage) !== "undefined") {
        let spielerName = localStorage.getItem("REVPacSpielerName");
        let spielFeldGroesse = localStorage.getItem("REVPacSpielFeldGroesse");
        let schwierigkeit = localStorage.getItem("REVPacSchwierigkeit");
        let geistfarbe = localStorage.getItem("REVPacGeistfarbe");
        let alterSpielstand = localStorage.getItem("REVPacAlterSpielstand");
        let ton = localStorage.getItem("REVPacTon");
        if (geistfarbe != null)zustand.geistfarbe = geistfarbe;
        if (spielerName != null)zustand.spielerName = spielerName;
        if (schwierigkeit != null)zustand.schwierigkeit = Number(schwierigkeit);
        if (spielFeldGroesse != null)zustand.spielFeldGroesse = Number(spielFeldGroesse);
        if (alterSpielstand != null) {
            if(confirm("Alter Spielstand gefunden, laden ?")){
                zustand.reload=alterSpielstand;
            }else zustand.reload=null;
        }
        if (ton != null)zustand.ton = (ton == "true");
    }
    var Spielvariablen = {
        spielFlaeche: null,
        FrameCounterGeist: 0,
        FrameCounterPac: 0,
        lock: false,
        levelstand: 0,
        gesamtzeit: 0,
        punkte: 0,
        schwierigkeitGeaendert: false,
        Richtungen: {
            hoch: 0,
            runter: 2,
            rechts: 3,
            links: 1
        },
        Feldtypen: {
            wand: 0,
            hohlraum: 1,
            tuer: 2,
            geisterHaus: 3,
            pille: 4,
            grPille: 5,
            pacManSpawn: 6,
            geistSpawn: 7,
            leerFlaeche: 8
        },
        Farben: {
            wand: "#696969",
            hohlraum: "#808080",
            tuer: "#FF0000",
            geisterHaus: "#0000FF",
            pille: "yellow",
            grPille: "yellow",
            geistSpawn: "#0000FF"
        },
        level: [//level 1
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 0, 0, 4, 0, 1, 1, 1, 1, 0, 4, 0, 4, 0, 1, 1, 1, 1, 0, 4, 0, 0, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 1, 1, 0, 4, 0, 4, 0, 1, 1, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 0, 0, 4, 4, 4, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 4, 4, 4, 0, 0, 4, 0],
                [0, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0],
                [0, 0, 0, 0, 4, 0, 0, 0, 4, 4, 4, 4, 5, 4, 4, 4, 4, 0, 0, 0, 4, 0, 0, 0, 0],
                [1, 1, 1, 0, 4, 0, 1, 0, 4, 0, 0, 2, 2, 2, 0, 0, 4, 0, 1, 0, 4, 0, 1, 1, 1],
                [0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 3, 3, 3, 3, 3, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0],
                [8, 8, 8, 6, 4, 4, 4, 4, 4, 0, 3, 3, 7, 3, 3, 0, 4, 4, 4, 4, 4, 8, 8, 8, 8],
                [0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 3, 3, 3, 3, 3, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0],
                [1, 1, 1, 0, 4, 0, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 1, 0, 4, 0, 1, 1, 1],
                [0, 0, 0, 0, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 0, 0, 0, 0],
                [0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0],
                [0, 0, 4, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 4, 0, 4, 0, 0],
                [0, 4, 4, 0, 4, 0, 4, 0, 1, 1, 0, 4, 0, 4, 0, 1, 1, 0, 4, 0, 4, 0, 4, 4, 0],
                [0, 4, 0, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 4, 0, 0, 4, 0],
                [0, 4, 0, 0, 4, 0, 4, 0, 0, 5, 0, 4, 0, 4, 0, 5, 0, 0, 4, 0, 4, 0, 0, 4, 0],
                [0, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            ////level2
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 4, 4, 0],
                [0, 0, 4, 0, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 0, 4, 0, 0],
                [0, 0, 4, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 4, 0, 0],
                [0, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 0, 4, 0, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 0],
                [0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 4, 4, 4, 4, 4, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0],
                [1, 1, 1, 0, 4, 0, 4, 4, 4, 4, 4, 0, 4, 0, 4, 4, 4, 4, 4, 0, 4, 0, 1, 1, 1],
                [0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
                [8, 8, 8, 6, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 8, 8, 8, 8],
                [0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
                [1, 1, 1, 0, 4, 0, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 0, 4, 0, 1, 1, 1],
                [0, 0, 0, 0, 4, 0, 4, 0, 0, 0, 4, 0, 4, 0, 4, 0, 0, 0, 4, 0, 4, 0, 0, 0, 0],
                [0, 4, 0, 0, 4, 0, 4, 0, 0, 0, 4, 0, 4, 0, 4, 0, 0, 0, 4, 0, 4, 0, 0, 4, 0],
                [0, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 4, 0, 0, 2, 2, 2, 0, 0, 4, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 4, 4, 4, 0, 1, 0, 4, 0, 3, 3, 3, 3, 3, 0, 4, 0, 1, 0, 4, 4, 4, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 4, 0, 3, 3, 7, 3, 3, 0, 4, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 5, 4, 4, 4, 4, 4, 4, 4, 0, 3, 3, 3, 3, 3, 0, 4, 4, 4, 4, 4, 4, 4, 5, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            //level 3
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 4, 5, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 0, 0, 0],
                [8, 4, 4, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 4, 6, 8],
                [0, 0, 0, 0, 4, 0, 1, 1, 1, 0, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 0, 4, 0, 0, 0],
                [0, 1, 1, 0, 4, 0, 1, 1, 1, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 5, 0, 1, 0],
                [0, 1, 1, 0, 4, 0, 0, 0, 1, 1, 0, 0, 4, 0, 1, 1, 0, 4, 0, 1, 0, 4, 0, 1, 0],
                [0, 1, 1, 0, 4, 4, 4, 0, 0, 0, 4, 4, 4, 0, 1, 1, 0, 4, 0, 0, 0, 4, 0, 1, 0],
                [0, 1, 1, 0, 0, 0, 4, 4, 5, 4, 4, 0, 4, 0, 1, 1, 0, 4, 0, 4, 4, 4, 0, 1, 0],
                [0, 1, 1, 1, 1, 0, 0, 0, 4, 0, 0, 0, 4, 0, 1, 1, 0, 4, 0, 4, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 1, 0, 4, 0, 1, 1, 0, 4, 0, 4, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 1, 0, 4, 0, 1, 1, 0, 4, 0, 4, 0, 0, 0, 1, 0],
                [0, 3, 3, 3, 0, 0, 4, 0, 4, 0, 0, 0, 4, 0, 1, 1, 0, 5, 4, 4, 4, 4, 0, 1, 0],
                [0, 3, 3, 3, 2, 0, 4, 0, 4, 4, 4, 4, 4, 0, 1, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0],
                [0, 3, 7, 3, 2, 4, 4, 0, 0, 0, 0, 0, 4, 0, 1, 0, 4, 4, 0, 1, 0, 4, 4, 0, 0],
                [0, 3, 3, 3, 2, 0, 4, 0, 1, 1, 1, 0, 4, 0, 1, 0, 0, 4, 0, 1, 0, 4, 0, 0, 0],
                [0, 3, 3, 3, 0, 0, 4, 0, 1, 1, 1, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 4, 4, 4, 0],
                [0, 0, 0, 0, 0, 0, 4, 0, 1, 1, 1, 0, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 4, 0],
                [0, 1, 1, 1, 1, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
                [0, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4, 0],
                [0, 1, 1, 1, 1, 0, 4, 0, 0, 0, 0, 0, 4, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4, 0],
                [0, 1, 1, 0, 0, 0, 4, 0, 0, 1, 1, 0, 4, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
                [0, 1, 1, 0, 0, 4, 4, 4, 0, 1, 1, 0, 4, 0, 1, 0, 4, 4, 4, 4, 4, 4, 4, 5, 0],
                [0, 1, 1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 1, 1, 0, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            //level 4
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 3, 3, 3, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0],
                [0, 3, 3, 3, 2, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 4, 0],
                [0, 3, 7, 3, 2, 4, 0, 1, 1, 1, 0, 4, 0, 1, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0],
                [0, 3, 3, 3, 2, 4, 0, 0, 0, 1, 0, 4, 0, 1, 1, 1, 1, 0, 4, 0, 0, 0, 0, 0, 0],
                [0, 3, 3, 3, 0, 4, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 0],
                [0, 1, 0, 4, 4, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 1, 0],
                [0, 1, 0, 4, 0, 0, 0, 1, 0, 4, 0, 1, 1, 0, 4, 0, 0, 0, 4, 4, 4, 4, 0, 1, 0],
                [0, 1, 0, 4, 0, 1, 1, 1, 0, 4, 0, 1, 1, 0, 5, 4, 4, 4, 4, 0, 0, 4, 0, 1, 0],
                [0, 1, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 1, 0],
                [0, 1, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 4, 0, 1, 0],
                [0, 1, 0, 5, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 1, 0],
                [0, 1, 0, 4, 0, 1, 1, 1, 0, 4, 0, 0, 4, 0, 1, 0, 4, 4, 4, 4, 4, 4, 0, 1, 0],
                [0, 0, 0, 4, 0, 1, 1, 1, 0, 4, 0, 0, 4, 0, 1, 0, 4, 0, 0, 0, 0, 5, 0, 1, 0],
                [0, 0, 4, 4, 0, 1, 1, 1, 0, 4, 4, 4, 4, 0, 1, 0, 4, 0, 1, 1, 0, 4, 0, 1, 0],
                [0, 0, 0, 4, 0, 1, 1, 1, 0, 4, 0, 0, 4, 0, 0, 0, 4, 0, 1, 1, 0, 4, 0, 1, 0],
                [0, 1, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 4, 4, 4, 4, 5, 0, 1, 1, 0, 4, 0, 1, 0],
                [0, 1, 0, 4, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 4, 0, 0, 1, 1, 0, 4, 0, 1, 0],
                [0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 1, 1, 1, 0, 4, 0, 1, 1, 1, 0, 4, 0, 0, 0],
                [8, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 1, 1, 1, 0, 4, 0, 1, 1, 1, 0, 4, 4, 6, 8],
                [0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 4, 0],
                [0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 4, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            //level 5
            [[0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 6, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0],
                [0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 8, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0],
                [0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 8, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0],
                [0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 1, 1, 1, 1, 0, 4, 0, 1, 1, 1, 1, 1, 0, 4, 0, 0, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 0, 0, 4, 0, 1, 1, 1, 1, 1, 0, 4, 0, 1, 1, 1, 1, 1, 0, 4, 0, 0, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 0, 0, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 4, 0, 0, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 5, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 2, 2, 2, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0],
                [0, 4, 0, 0, 0, 4, 0, 0, 4, 0, 3, 3, 3, 3, 3, 0, 4, 0, 0, 4, 0, 0, 0, 4, 0],
                [0, 4, 0, 0, 0, 4, 0, 0, 4, 0, 3, 3, 7, 3, 3, 0, 4, 0, 0, 4, 0, 0, 0, 4, 0],
                [0, 5, 4, 4, 4, 4, 4, 4, 4, 0, 3, 3, 3, 3, 3, 0, 4, 4, 4, 4, 4, 4, 4, 5, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0]],
            //level 6
            [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 5, 4, 4, 4, 4, 4, 4, 4, 0, 3, 3, 3, 3, 3, 0, 4, 4, 4, 4, 4, 4, 4, 5, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 4, 0, 3, 3, 7, 3, 3, 0, 4, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 4, 0, 3, 3, 3, 3, 3, 0, 4, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 2, 2, 2, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 0, 0, 4, 4, 4, 4, 4, 0, 1, 0, 4, 0, 1, 0, 4, 4, 4, 4, 4, 0, 0, 4, 0],
                [0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0],
                [0, 4, 0, 0, 0, 0, 4, 4, 5, 4, 4, 0, 4, 0, 4, 4, 5, 4, 4, 0, 0, 0, 0, 4, 0],
                [0, 4, 4, 4, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4, 4, 4, 0],
                [0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0],
                [8, 6, 8, 8, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 8, 8, 8],
                [0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0],
                [0, 4, 4, 4, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4, 4, 4, 0],
                [0, 4, 0, 0, 0, 0, 4, 4, 5, 4, 4, 0, 4, 0, 4, 4, 5, 4, 4, 0, 0, 0, 0, 4, 0],
                [0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0],
                [0, 4, 0, 0, 4, 4, 4, 4, 4, 0, 1, 0, 4, 0, 1, 0, 4, 4, 4, 4, 4, 0, 0, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 1, 0, 4, 0, 1, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0],
                [0, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]],

        intervalle: {
            eins: null,
            zwei: null,
            abgelaufeneZeit: null,
            zeitAnzeige: null,
            punktAnzeige: null
        },
        abgelaufeneZeit: 0,
        listener: null,
        funtionen: {
            nonflucht: function () {
                Spielvariablen.spielFlaeche.pacManWeglaufentoggle();
            }
            ,
            flucht: function () {
                Spielvariablen.spielFlaeche.pacManWeglaufentoggle();
                Spielvariablen.spielFlaeche.toogleTimerAn = false;
            }
            ,
            zeitanzeige: function () {
                let zeit = Spielvariablen.abgelaufeneZeit;
                let zeitcontainer = document.getElementById("zeitContainer");
                if (Spielvariablen.levelstand > 0) {
                    zeitcontainer.innerHTML = time(zeit + Spielvariablen.gesamtzeit);
                }
                else zeitcontainer.innerHTML = time(zeit);
            }
            ,
            keylistener: function (e) {
                switch (e.keyCode) {
                    case 37:
                    {
                        Spielvariablen.spielFlaeche.geist.richtungNeu = Spielvariablen.Richtungen.links;
                        e.cancelBubble = true; //eventweiterreichung unterbinden um scollen zu verhindern
                        e.returnValue = false; //dito
                        break;
                    }
                    case 65:
                    {
                        Spielvariablen.spielFlaeche.geist.richtungNeu = Spielvariablen.Richtungen.links;
                        e.cancelBubble = true; //eventweiterreichung unterbinden um scollen zu verhindern
                        e.returnValue = false; //dito
                        break;
                    }
                    case 38:
                    {
                        Spielvariablen.spielFlaeche.geist.richtungNeu = Spielvariablen.Richtungen.hoch;
                        e.cancelBubble = true;
                        e.returnValue = false;
                        break;
                    }
                    case 87:
                    {
                        Spielvariablen.spielFlaeche.geist.richtungNeu = Spielvariablen.Richtungen.hoch;
                        e.cancelBubble = true;
                        e.returnValue = false;
                        break;

                    }
                    case 39:
                    {
                        Spielvariablen.spielFlaeche.geist.richtungNeu = Spielvariablen.Richtungen.rechts;
                        e.cancelBubble = true;
                        e.returnValue = false;
                        break;
                    }
                    case 68:
                    {
                        Spielvariablen.spielFlaeche.geist.richtungNeu = Spielvariablen.Richtungen.rechts;
                        e.cancelBubble = true;
                        e.returnValue = false;
                        break;
                    }
                    case 40:
                    {
                        Spielvariablen.spielFlaeche.geist.richtungNeu = Spielvariablen.Richtungen.runter;
                        e.cancelBubble = true;
                        e.returnValue = false;
                        break;
                    }
                    case 83:
                    {
                        Spielvariablen.spielFlaeche.geist.richtungNeu = Spielvariablen.Richtungen.runter;
                        e.cancelBubble = true;
                        e.returnValue = false;
                        break;
                    }
                    case 32:
                    {
                        zustand.pause = !zustand.pause;
                        break;
                    }

                    case 13:
                    {
                        if (zustand.status == 3) {
                            zustand.status = 1;
                        } else if (zustand.status == 1) {
                            zustand.status = 2
                        }
                        break;
                    }

                }
            }
            ,
            shuffle: function (array) {
                let zufall, temp;
                for (let i = array.length; i > 0; i--) {
                    zufall = Math.floor(Math.random() * i);
                    temp = array[i - 1];
                    array[i - 1] = array[zufall];
                    array[zufall] = temp;
                }
            }
            ,
            punkteAnzeige: function () {
                if (Spielvariablen.levelstand > 0) {
                    document.getElementById("punkteContainer").innerText = (punkte() + Spielvariablen.punkte) + "";
                } else document.getElementById("punkteContainer").innerText = punkte() + "";
            }
            ,
            navListener: function (e) {
                if (e.target.tagName == "LI") {
                    let div = document.getElementById(e.target.innerText);
                    if (div != undefined) {
                        let menuTextDivs = document.getElementsByClassName("menuText");
                        if (div.classList.contains("inaktiv")) {
                            div.classList.remove("inaktiv");
                            if (zustand.status == 2)zustand.pause = true;
                            if (div.id == "Highscore") {
                                holen(div);
                            }
                        } else {
                            div.classList.add("inaktiv");
                            //zustand.pause = false;
                        }
                        for (let i = 0; i < menuTextDivs.length; i++) {
                            if (menuTextDivs[i] != undefined && menuTextDivs[i] != div) {
                                menuTextDivs[i].classList.add("inaktiv");

                            }

                        }

                    }
                }

            },
            verwirrt: function () {
                zustand.aengstlich = false;
            },
            einstellungenListener: function (e) {
                if (e.target.name == "schwierigkeit") {
                    console.log(e.target.id);
                    switch (e.target.id) {
                        case "normal":
                        {
                            zustand.schwierigkeit = 0;

                            break;
                        }
                        case "leicht":
                        {
                            zustand.schwierigkeit = -2;
                            break;
                        }
                        case "schwer":
                        {
                            zustand.schwierigkeit = 2;
                            break;
                        }

                    }
                    localStorage.setItem("REVPacSchwierigkeit", zustand.schwierigkeit);
                    Spielvariablen.schwierigkeitGeaendert = true;

                }
                else if (e.target.name == "farbe") {
                    console.log(e.target.id);
                    zustand.geistfarbe = e.target.id;
                    localStorage.setItem("REVPacGeistfarbe", zustand.geistfarbe);
                }
                else if (e.target.id == "ton") {
                    localStorage.setItem("REVPacTon", e.target.checked);
                    zustand.ton = (e.target.checked);
                    let audio = document.getElementsByTagName("audio");
                    for (let i = 0; i < audio.length; i++) {
                        audio[i].muted = !zustand.ton;

                    }
                    document.getElementById("ton").checked = zustand.ton;
                } else if (e.target.id == "speichern") {
                    if (Spielvariablen.schwierigkeitGeaendert)location.reload();
                    else {
                        document.getElementById("Einstellungen").classList.add("inaktiv");
                    }

                }


            }
        }
    };

//datenbankanteil
    /**
     * Berechnet den aktuellen Punktestand im aktuellen level
     * @returns {number} punktestand
     */
    function punkte() {
        if (zustand.restpillen < 1)return 120000 - Spielvariablen.abgelaufeneZeit;
        let ret = (120000 - Spielvariablen.abgelaufeneZeit) * (Spielvariablen.spielFlaeche.pillen.length / zustand.gesamtpillen);
        if (zustand.schwierigkeit < 0)
            ret *= 0.75;
        else if (zustand.schwierigkeit > 0)
            ret *= 1.25;
        return Math.round(ret);
    }

    /**
     * Baut milisekunden in einen HH:MM:SS string um
     * @param ms zeitspanne in Millisekunden
     * @returns {string} zeitspanne umgerechnet in HH:MM:SS
     */
    function time(ms) {
        return new Date(ms).toISOString().slice(11, 19);
    }

    /**
     * Fügt die ergebnistabelle ins DisplayElement ein
     * @param displayElement HTML-Element in dem das ergebnis angezeigt werden soll
     */
    function holen(displayElement) {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'datenbank.php', true);
        xmlhttp.addEventListener('readystatechange', function () {

            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                let tablecontent = JSON.parse(xmlhttp.responseText);
                if (displayElement != undefined) {
                    displayElement.innerHTML = "<h3>Reverse PacMan Bestenliste</h3>";
                    let table = document.createElement("table");
                    let tbody = document.createElement("tbody");
                    table.appendChild(tbody);
                    tbody.innerHTML = "<tr><th>Platz</th><th>Name</th><th>Zeit</th><th>Punkte</th></tr>";
                    for (let i = 0; i < tablecontent.length; i++) {
                        let tr = document.createElement("tr");
                        let platz = document.createElement("td");
                        let name = document.createElement("td");
                        let zeit = document.createElement("td");
                        let punkte = document.createElement("td");
                        platz.innerText = "" + (1 + Number(i));
                        name.innerText = tablecontent[i].name;
                        //noinspection JSUnresolvedVariable
                        zeit.innerText = tablecontent[i].zeit;
                        punkte.innerText = "" + Math.round(tablecontent[i].punkte);
                        tr.appendChild(platz);
                        tr.appendChild(name);
                        tr.appendChild(zeit);
                        tr.appendChild(punkte);
                        tbody.appendChild(tr);
                    }
                    displayElement.appendChild(table);
                }

            }

        });

        xmlhttp.send();
    }

    /**
     * Schreibt den Spieler mit Gesamtzeit und Punktestand in die Datenbank
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

//datenbankanteil ende


    function controller_start() {
        if(zustand.reload!=null){
            let restore=JSON.parse(zustand.reload);
            zustand.reload=null;
            Spielvariablen.punkte=restore[1];
            Spielvariablen.levelstand=restore[2];
            Spielvariablen.gesamtzeit=restore[0];
        }
        let gewonnenverloren = document.getElementsByClassName("gewonnenVerloren");
        for (let i = 0; i < gewonnenverloren.length; i++) {
            if (gewonnenverloren[i].id === "start") {
                gewonnenverloren[i].classList.remove("inaktiv");
            }
            else {
                if (gewonnenverloren[i] instanceof Node)
                    gewonnenverloren[i].classList.add("inaktiv");
            }
        }

        let spielFeld = document.getElementById("spielFeld");
        let pacManFeld = document.getElementById("pacmanFeld");
        let Geistfeld = document.getElementById("geisterFeld");
        let PillenFeld = document.getElementById("pillenFeld");
        spielFeld.width = zustand.spielFeldGroesse;
        spielFeld.height = zustand.spielFeldGroesse;
        Geistfeld.width = zustand.spielFeldGroesse;
        Geistfeld.height = zustand.spielFeldGroesse;
        pacManFeld.width = zustand.spielFeldGroesse;
        pacManFeld.height = zustand.spielFeldGroesse;
        PillenFeld.height = zustand.spielFeldGroesse;
        PillenFeld.width = zustand.spielFeldGroesse;
        pacManFeld.style.zIndex = 0;
        Spielvariablen.spielFlaeche = new SpielFlaeche(spielFeld, pacManFeld, Geistfeld, PillenFeld, Spielvariablen.level[Spielvariablen.levelstand]);
        if (Spielvariablen.listener == null) {
            Spielvariablen.listener = window.addEventListener("keydown", Spielvariablen.funtionen.keylistener);
            Spielvariablen.listener = Spielvariablen.funtionen.keylistener;
        }
        document.getElementById("userNameContainer").innerText = zustand.spielerName;
        if (Spielvariablen.levelstand > 0)document.getElementById("levelwechsel").play();
        else document.getElementById("opening").play();
    }

    function controller_spielen() {
        document.getElementById("waka").play();
        let start = document.getElementById("start");
        start.classList.add("inaktiv");
        Spielvariablen.Spielstart = true;
        Spielvariablen.intervalle.abgelaufeneZeit = setInterval(function () {
            if (!zustand.pause)Spielvariablen.abgelaufeneZeit = Spielvariablen.abgelaufeneZeit + 10;
        }, 10);
        Spielvariablen.funtionen.zeitanzeige();
        Spielvariablen.intervalle.zeitAnzeige = setInterval(function () {
            Spielvariablen.funtionen.zeitanzeige();
        }, 1000);
        //noinspection JSCheckFunctionSignatures
        Spielvariablen.intervalle.punktAnzeige = setInterval(Spielvariablen.funtionen.punkteAnzeige, 100);
        requestAnimationFrame(function () {
            Spielvariablen.spielFlaeche.figurenZeichnen()
        });

    }

    function controller_levelende() {
        Spielvariablen.Spielstart = false;
        clearInterval((Spielvariablen.intervalle.abgelaufeneZeit));
        clearInterval((Spielvariablen.intervalle.zeitAnzeige));
        clearInterval(Spielvariablen.intervalle.punktAnzeige);
        clearTimeout(Spielvariablen.funtionen.flucht());
        clearTimeout(Spielvariablen.funtionen.nonflucht());
        document.getElementById("waka").pause();
        zustand.restpillen = Spielvariablen.spielFlaeche.pillen.length;
        console.log(time(Spielvariablen.abgelaufeneZeit));
        console.log(punkte());
        Spielvariablen.funtionen.punkteAnzeige();
        Spielvariablen.punkte += punkte();
        Spielvariablen.gesamtzeit += Spielvariablen.abgelaufeneZeit;
        zustand.zeitSpanne = Spielvariablen.abgelaufeneZeit;
        Spielvariablen.abgelaufeneZeit = 0;
        let element = null;
        if (zustand.restpillen > 0 && !zustand.aengstlich) {
            element = document.getElementById("gewonnen");
            document.getElementById("gegessen").play();
            Spielvariablen.levelstand++;
            if (Spielvariablen.levelstand == Spielvariablen.level.length) {
                zustand.status = 4;
                Spielvariablen.levelstand = 0;
            }

        } else {
            if (zustand.aengstlich)document.getElementById("gestorben").play();
            element = document.getElementById("verloren");
            Spielvariablen.spielFlaeche.pacManCanvas.style.zIndex = 1;
            Spielvariablen.levelstand = 0;
            Spielvariablen.punkte = 0;
            Spielvariablen.gesamtzeit = 0;
        }


        element.classList.remove("inaktiv");
        if (zustand.aengstlich) {
            zustand.aengstlich = false;
        }
    }

    function controller_Seitenaufbau() {
        let breite = document.getElementsByClassName("breite");
        let hoehe = document.getElementsByClassName("hoehe");
        for (let i = 0; i < breite.length; i++) {
            breite[i].style.width = zustand.spielFeldGroesse + "px";
        }
        for (let i = 0; i < hoehe.length; i++) {
            hoehe[i].style.height = zustand.spielFeldGroesse + "px";
        }
        //noinspection JSCheckFunctionSignatures
        document.getElementById("navList").addEventListener("click", Spielvariablen.funtionen.navListener);
        document.getElementById("spielStart").addEventListener("click", function () {
            zustand.spielerName = document.getElementById("usernameEingabe").value;
            document.getElementById("Name").classList.add("inaktiv");
        });

        //noinspection JSCheckFunctionSignatures
        document.getElementById("Einstellungen").addEventListener("click", Spielvariablen.funtionen.einstellungenListener);

        let audio = document.getElementsByTagName("audio");
        for (let i = 0; i < audio.length; i++) {
            audio[i].muted = !zustand.ton;

        }
        document.getElementById("ton").checked = zustand.ton;
        document.getElementById(zustand.geistfarbe).checked = true;
        switch (zustand.schwierigkeit) {
            case -2:
            {
                document.getElementById("leicht").checked = true;
                break;
            }
            case 0:
            {
                document.getElementById("normal").checked = true;
                break;
            }
            case 2:
            {
                document.getElementById("schwer").checked = true;
                break;
            }
        }
        if (zustand.spielerName === "")
            document.getElementById("Name").classList.remove("inaktiv");


        document.getElementById("usernameEingabe").addEventListener("keydown", function (e) {

            if (e.keyCode == 13) {
                e.cancelBubble = true; //eventweiterreichung für enter unterbinden
                e.returnValue = false; //dito
                zustand.spielerName = e.target.value;
            }
        });
        zustand.status = 1
    }

    function controller_spielende() {
        let endeDiv = document.getElementById("ende");
        endeDiv.innerHTML = '<h3>Spielende</h3><hr>' +
            '<table><tbody>' +
            '<tr><td>Name:</td><td>' + zustand.spielerName + '</td></tr>' +
            '<tr><td>Gesamtzeit:</td><td>' + time(Spielvariablen.gesamtzeit) + '</td></tr>' +
            '<tr><td>Gesamtpunkte:</td><td>' + Spielvariablen.punkte + '</td></tr>' +
            '</tbody>' +
            '</table>' +
            '<h3>Return drücken für Neustart</h3>';
        endeDiv.classList.remove("inaktiv");
        window.addEventListener("keydown", function (e) {
            if (e.keyCode == 13)
                location.reload();
        });

        send(zustand.spielerName, Spielvariablen.gesamtzeit, Spielvariablen.punkte);
    }

//observer
    Object.observe(zustand, function (changes) {
        changes.forEach(function (change) {
            if (change.name === 'status') {
                switch (change.object.status) {
                    case 0:
                    {
                        controller_Seitenaufbau();
                        break;
                    }
                    case 1:
                    {
                        controller_start();
                        break;
                    }
                    case 2:
                    {
                        controller_spielen();
                        break;
                    }
                    case 3:
                    {
                        controller_levelende();
                        break;
                    }
                    case 4:
                    {
                        controller_spielende();
                        break;
                    }
                }
            }
            else if (change.name === "pause") {
                if (zustand.status == 2) {

                    let pausediv = document.getElementsByClassName("pause");
                    for (let i = 0; i < pausediv.length; i++) {
                        if (zustand.pause) {
                            pausediv[i].classList.remove("inaktiv");
                            document.getElementById("waka").pause();
                        }
                        else {
                            pausediv[i].classList.add("inaktiv");
                            document.getElementById("waka").play();
                        }
                    }
                }

            }
            else if (change.name === "aengstlich") {
                Spielvariablen.spielFlaeche.toggleAengstlichLevel();
            }
            else if (change.name === "geistfarbe") {
                Spielvariablen.spielFlaeche.geist.farbeaendern();

            }
            else if (change.name === "spielerName") {
                document.getElementById("usernameEingabe").value = zustand.spielerName;
                localStorage.setItem("REVPacSpielerName", zustand.spielerName);
                document.getElementById("userNameContainer").innerText = zustand.spielerName;
                document.getElementById("Name").classList.add("inkativ");
            }
        });
    });
    var load = window.addEventListener("load", function () {
        zustand.status = 0;
    });
    window.addEventListener("unload", function () {
            if(Spielvariablen.levelstand>1){
                let save = [];
                save.push(Spielvariablen.gesamtzeit);
                save.push(Spielvariablen.punkte);
                save.push(Spielvariablen.levelstand);
                localStorage.setItem("REVPacAlterSpielstand", JSON.stringify(save));
            }else localStorage.removeItem("REVPacAlterSpielstand");

    });
//<<------------------Klassendefinition------------------>>

    /**
     * Grundlage des Navigationsgrids
     */
    class Knoten {
        constructor(knotenOben, knotenLinks, posX, posY, pille) {
            this.knotenOben = knotenOben;
            this.knotenUnten = null;
            this.knotenLinks = knotenLinks;
            this.knotenRechts = null;
            this.f = 0;
            this.g = 0;
            this.h = 0;
            this.parent = null;
            this.posX = posX;
            this.posY = posY;
            this.pille = pille;
            if (knotenOben instanceof Knoten) {
                knotenOben.knotenUnten = this;
            }
            if (knotenLinks instanceof Knoten) {
                knotenLinks.knotenRechts = this;
            }
        }

        get nachbarn() {
            let ret = [];
            if (this.knotenLinks instanceof Knoten)ret.push(this.knotenLinks);
            if (this.knotenOben instanceof Knoten)ret.push(this.knotenOben);
            if (this.knotenRechts instanceof Knoten)ret.push(this.knotenRechts);
            if (this.knotenUnten instanceof Knoten)ret.push(this.knotenUnten);
            return ret;
        }

        nexthop(richtung) {
            switch (richtung) {
                case Spielvariablen.Richtungen.hoch:
                {
                    if (this.knotenOben instanceof Knoten)return Spielvariablen.Richtungen.hoch;
                    if (this.knotenLinks instanceof Knoten) return Spielvariablen.Richtungen.links;
                    if (this.knotenRechts instanceof Knoten) return Spielvariablen.Richtungen.rechts;
                    return Spielvariablen.Richtungen.runter;
                }
                case Spielvariablen.Richtungen.rechts:
                {
                    if (this.knotenRechts instanceof Knoten)return Spielvariablen.Richtungen.rechts;
                    if (this.knotenOben instanceof Knoten) return Spielvariablen.Richtungen.hoch;
                    if (this.knotenUnten instanceof Knoten) return Spielvariablen.Richtungen.runter;
                    return Spielvariablen.Richtungen.links;
                }
                case Spielvariablen.Richtungen.runter:
                {
                    if (this.knotenUnten instanceof Knoten)return Spielvariablen.Richtungen.runter;
                    if (this.knotenLinks instanceof Knoten) return Spielvariablen.Richtungen.links;
                    if (this.knotenRechts instanceof Knoten) return Spielvariablen.Richtungen.rechts;
                    return Spielvariablen.Richtungen.hoch;
                }
                case Spielvariablen.Richtungen.links:
                {
                    if (this.knotenLinks instanceof Knoten)return Spielvariablen.Richtungen.links;
                    if (this.knotenOben instanceof Knoten) return Spielvariablen.Richtungen.hoch;
                    if (this.knotenUnten instanceof Knoten) return Spielvariablen.Richtungen.runter;
                    return Spielvariablen.Richtungen.rechts;
                }
            }

        }


    }
    class SpielObjekt {
        /**
         * Constructor für Spielobjekt
         * @param posX X-Position des Objekts
         * @param posY Y-Position des Objekts
         */
        constructor(posX, posY) {
            this.posX = posX;
            this.posY = posY;
            this.imageData = null;
            this.offsetX = 0;
            this.offsetY = 0
        }

        getAbstand(posX, posY) {
            let abstandX = Math.abs(posX - this.posX);
            let abstandY = Math.abs(posY - this.posY);
            return Math.sqrt((abstandX * abstandX) + (abstandY * abstandY));
        }
    }
    class Pille extends SpielObjekt {
        constructor(posX, posY, groesse, isGross) {
            super(posX, posY);
            this.isGross = isGross;
            this.imageData = this.createPilleImageData(groesse);
        }

        createPilleImageData(groesse) {
            let canvas = document.createElement('canvas');
            let context = canvas.getContext("2d");
            context.strokeStyle = this.isGross ? Spielvariablen.Farben.grPille : Spielvariablen.Farben.pille;
            context.fillStyle = this.isGross ? Spielvariablen.Farben.grPille : Spielvariablen.Farben.pille;
            context.arc(groesse / 2, groesse / 2, this.isGross ? groesse * 0.35 : groesse * 0.2, 0, 2 * Math.PI);
            context.fill();
            return context.getImageData(0, 0, groesse, groesse);

        }
    }
    class PacMan extends SpielObjekt {
        constructor(posX, posY, groesse) {
            super(posX, posY, groesse);
            this.image = document.getElementById("pacman");
            this.richtung = Spielvariablen.Richtungen.hoch;
            this.darfwegglaufen = true;
            this.animationCount = 0;
        }

    }
    class Geist extends SpielObjekt {
        constructor(posX, posY, groesse, farbe) {
            super(posX, posY, groesse);
            this.image = document.getElementById("Geist-" + farbe);
            this.richtung = null;
            this.richtungNeu = null;
            this.isMoving = false;
        }

        farbeaendern() {
            this.farbe = zustand.geistfarbe;
            this.image = document.getElementById("Geist-" + this.farbe);

        }

    }
    class SpielFlaeche {
        constructor(levelCanvas, pacManCanvas, geistCanvas, pillenCanvas, level) {
            this.pacManCanvas = pacManCanvas;
            this.levelContext = levelCanvas.getContext("2d");
            this.pacManContext = pacManCanvas.getContext("2d");
            this.geistContext = geistCanvas.getContext("2d");
            this.pillenContext = pillenCanvas.getContext("2d");
            this.width = levelCanvas.width;
            this.height = levelCanvas.height;
            this.level = level;
            this.pillen = [];
            this.geist = null;
            this.pacMan = null;
            this.factor = this.width / level.length;
            this.knoten = [];
            this.toogleTimerAn = false;
            this.beendet = false;
            this.tempoPac = 10 - zustand.schwierigkeit;
            this.tempoGeist = 10;
            this.offsetDivPac = this.factor / this.tempoPac;
            this.offsetDivGeist = this.factor / this.tempoGeist;
            this.animationFrame = 0;
            this.animationCount = 0;
            this.zeichnen();
            zustand.gesamtpillen = this.pillen.length;
            zustand.restpillen = zustand.gesamtpillen;
            this.figurenZeichnen();
        }

        zeichnen() {
            for (let i = 0; i < this.level.length; i++) {
                this.knoten[i] = [];
                for (let j = 0; j < this.level[i].length; j++) {
                    //noinspection FallThroughInSwitchStatementJS
                    switch (this.level[i][j]) {
                        case Spielvariablen.Feldtypen.wand:
                        {
                            this.levelContext.fillStyle = Spielvariablen.Farben.wand;
                            this.levelContext.fillRect(j * this.factor, i * this.factor, this.factor, this.factor);
                            this.knoten[i][j] = null;
                            break;
                        }

                        case Spielvariablen.Feldtypen.geistSpawn:
                        {
                            this.geist = new Geist(j, i, this.factor, zustand.geistfarbe);
                        }
                        case Spielvariablen.Feldtypen.geisterHaus:
                        {
                            this.levelContext.fillStyle = Spielvariablen.Farben.geisterHaus;
                            this.levelContext.fillRect(j * this.factor, i * this.factor, this.factor, this.factor);
                            this.knoten[i][j] = new Knoten(this.knoten[i - 1][j], this.knoten[i][j - 1], j, i, null);
                            break;
                        }
                        case Spielvariablen.Feldtypen.pacManSpawn:
                        {
                            this.pacMan = new PacMan(j, i, this.factor);
                        }
                        case Spielvariablen.Feldtypen.leerFlaeche:
                        {
                            this.levelContext.clearRect(j * this.factor, i * this.factor, this.factor, this.factor);
                            this.knoten[i][j] = new Knoten((i - 1 < 0) ? undefined : this.knoten[i - 1][j], this.knoten[i][j - 1], j, i, null);  //verhindern das das zweite array undefined ist und knallt
                            if (j == this.level[i].length - 1) {                        //levelübergang von oben nach unten oder von rechts nach links schaffen füllwort
                                this.knoten[i][j].knotenRechts = this.knoten[i][0];
                                this.knoten[i][0].knotenLinks = this.knoten[i][j];
                            }
                            if (i == this.level.length - 1) {
                                this.knoten[i][j].knotenUnten = this.knoten[0][j];
                                this.knoten[0][j].knotenOben = this.knoten[i][j];
                            }
                            break;
                        }
                        case Spielvariablen.Feldtypen.hohlraum:
                        {
                            this.levelContext.fillStyle = Spielvariablen.Farben.hohlraum;
                            this.levelContext.fillRect(j * this.factor, i * this.factor, this.factor, this.factor);
                            this.knoten[i][j] = null;
                            break;
                        }
                        case Spielvariablen.Feldtypen.tuer:
                        {

                            this.levelContext.fillStyle = Spielvariablen.Farben.geistSpawn;
                            this.levelContext.fillRect(j * this.factor, i * this.factor, this.factor, this.factor);
                            this.levelContext.fillStyle = Spielvariablen.Farben.tuer;
                            this.levelContext.fillRect(j * this.factor + this.factor / 4, i * this.factor + this.factor / 4, this.factor / 2, this.factor / 2);

                            this.knoten[i][j] = new Knoten(this.knoten[i - 1][j], this.knoten[i][j - 1], j, i, null);
                            break;
                        }
                        case Spielvariablen.Feldtypen.pille:
                        {
                            let pille = new Pille(j, i, this.factor, false);
                            this.pillen.push(pille);
                            this.knoten[i][j] = new Knoten(this.knoten[i - 1][j], this.knoten[i][j - 1], j, i, pille);
                            break;
                        }
                        case Spielvariablen.Feldtypen.grPille:
                        {
                            let pille = new Pille(j, i, this.factor, true);
                            this.pillen.push(pille);
                            this.knoten[i][j] = new Knoten(this.knoten[i - 1][j], this.knoten[i][j - 1], j, i, pille);
                            break;
                        }


                    }
                }
            }
        }

        pacManWeglaufentoggle() {

            this.pacMan.darfwegglaufen = !this.pacMan.darfwegglaufen;
        }

        toggleAengstlichLevel() {
            let panik = document.getElementById("panik");
            if (panik.classList.contains("inaktiv"))panik.classList.remove("inaktiv");
            else panik.classList.add("inaktiv");
            negative(this.levelContext, this.width, this.height);
            function negative(context, width, height) {
                var imageData = context.getImageData(0, 0, width, height);
                var pixels = imageData.data;
                for (var i = 0; i < pixels.length; i += 4) {
                    pixels[i] = 255 - pixels[i];   // red
                    pixels[i + 1] = 255 - pixels[i + 1]; // green
                    pixels[i + 2] = 255 - pixels[i + 2]; // blue
                    // i+3 is alpha (the fourth element)
                }

                // overwrite original image
                context.putImageData(imageData, 0, 0);
            }


        }

        figurenZeichnen() {
            if (Spielvariablen.Spielstart && !zustand.pause) {
                if (Spielvariablen.FrameCounterGeist++ >= this.tempoGeist) {
                    Spielvariablen.FrameCounterGeist = 0;
                    this.geist.offsetX = 0;
                    this.geist.offsetY = 0;
                    this.geistBewegen();
                }
                if (Spielvariablen.FrameCounterPac++ >= this.tempoPac) {
                    Spielvariablen.FrameCounterPac = 0;
                    this.pacMan.offsetX = 0;
                    this.pacMan.offsetY = 0;
                    this.pacManBewegen();
                }
            }


            this.pacManContext.clearRect(0, 0, this.width, this.height);
            this.geistContext.clearRect(0, 0, this.width, this.height);
            if (this.animationCount % 10 == 0) {
                this.pillenContext.clearRect(0, 0, this.width, this.height);
                for (let i = 0; i < this.pillen.length; i++)
                    this.pillenContext.putImageData(this.pillen[i].imageData, this.pillen[i].posX * this.factor, this.pillen[i].posY * this.factor);
                //pacman richtung wechseln und animation
            }
            if (this.animationCount++ % 10 == 0 && !zustand.pause && Spielvariablen.Spielstart) {
                if (++this.animationFrame > 2)this.animationFrame = 0;
            }

            this.pacManContext.save();
            this.pacManContext.translate(this.pacMan.posX * this.factor + this.pacMan.offsetX + this.factor / 2, this.pacMan.posY * this.factor + this.pacMan.offsetY + this.factor / 2);
            this.pacManContext.rotate(this.pacMan.richtung * Math.PI / 2);
            this.pacManContext.drawImage(this.pacMan.image, this.animationFrame * 100, 0, 100, 100, -this.factor / 2, -this.factor / 2, this.factor, this.factor);
            this.pacManContext.restore();

            //pacman richtung wechseln und animation ende


            this.geistContext.drawImage(this.geist.image, this.geist.posX * this.factor + this.geist.offsetX, this.geist.posY * this.factor + this.geist.offsetY, this.factor, this.factor);
            if (this.pacMan.offsetX > 0)this.pacMan.offsetX -= this.offsetDivPac;
            if (this.pacMan.offsetX < 0)this.pacMan.offsetX += this.offsetDivPac;
            if (this.pacMan.offsetY < 0)this.pacMan.offsetY += this.offsetDivPac;
            if (this.pacMan.offsetY > 0)this.pacMan.offsetY -= this.offsetDivPac;
            if (this.geist.offsetX > 0)this.geist.offsetX -= this.offsetDivGeist;
            if (this.geist.offsetX < 0)this.geist.offsetX += this.offsetDivGeist;
            if (this.geist.offsetY < 0)this.geist.offsetY += this.offsetDivGeist;
            if (this.geist.offsetY > 0)this.geist.offsetY -= this.offsetDivGeist;
            if (zustand.status == 2)requestAnimationFrame(function () {
                Spielvariablen.spielFlaeche.figurenZeichnen();
            });
            else if ((Math.abs(this.pacMan.offsetX) + Math.abs(this.pacMan.offsetY) + Math.abs(this.geist.offsetX) + Math.abs(this.geist.offsetY)) > 4) requestAnimationFrame(function () {
                Spielvariablen.spielFlaeche.zuEndeZeichnen();
            });

        }

        pacManBewegen() {
            let knoten = this.knoten;
            let geist = this.geist;
            let pacman = this.pacMan;
            let pillen = this.pillen;
            if (!this.beendet) {
                let PacManAltX = pacman.posX;
                let PacManAltY = pacman.posY;
                if (zustand.aengstlich) {
                    let zielRoute = astar.search(knoten, pacman.posX, pacman.posY, geist.posX, geist.posY);
                    pacman.posX = zielRoute[0].posX;
                    pacman.posY = zielRoute[0].posY;


                } else if ((pacman.darfwegglaufen && pacman.getAbstand(geist.posX, geist.posY) < 6) || !geist.isMoving) {
                    let aktKnoten = knoten[pacman.posY][pacman.posX];
                    let auswege = aktKnoten.nachbarn;
                    let bestnachbar = auswege[0];
                    let bestabstand = geist.getAbstand(bestnachbar.posX, bestnachbar.posY);
                    for (let i = 1; i < auswege.length; i++) {
                        let neuabstand = geist.getAbstand(auswege[i].posX, auswege[i].posY);
                        if (neuabstand > bestabstand) {
                            bestabstand = neuabstand;
                            bestnachbar = auswege[i];
                        }
                    }
                    pacman.posX = bestnachbar.posX;
                    pacman.posY = bestnachbar.posY;

                    if (!this.toogleTimerAn) {
                        //noinspection JSCheckFunctionSignatures
                        clearTimeout(Spielvariablen.funtionen.flucht);
                        //noinspection JSCheckFunctionSignatures
                        clearTimeout(Spielvariablen.funtionen.nonflucht);
                        //noinspection JSCheckFunctionSignatures
                        setTimeout(Spielvariablen.funtionen.flucht, 5000);
                        //noinspection JSCheckFunctionSignatures
                        setTimeout(Spielvariablen.funtionen.nonflucht, 7000);
                        this.toogleTimerAn = true;
                    }

                }
                else {
                    //--nächste pille rausfinden mittels manhattan distanz rausfinden;
                    Spielvariablen.funtionen.shuffle(pillen);
                    let nahestPille = 0;
                    let nahestPilleManhattan = 1000;
                    if (pillen.length == 0) {
                        zustand.status = 3;
                        Spielvariablen.Spielstart = false;
                        return;
                    }
                    for (let i = 0; i < pillen.length; i++) {
                        let manhattan = astar.manhattan(pacman.posX, pacman.posY, pillen[i].posX, pillen[i].posY);
                        if (manhattan < nahestPilleManhattan) {
                            nahestPilleManhattan = manhattan;
                            nahestPille = i;
                        }
                    }

                    let zielPille = pillen[nahestPille];
                    let zielRoute = astar.search(knoten, pacman.posX, pacman.posY, zielPille.posX, zielPille.posY);
                    pacman.posX = zielRoute[0].posX;
                    pacman.posY = zielRoute[0].posY;
                }
                if (knoten[pacman.posY][pacman.posX].pille != null) {
                    let pille = knoten[pacman.posY][pacman.posX].pille;
                    knoten[pacman.posY][pacman.posX].pille = null;
                    pillen.splice(pillen.indexOf(pille), 1);
                    if (pille.isGross) {
                        zustand.aengstlich = true;
                        //noinspection JSCheckFunctionSignatures
                        clearTimeout(Spielvariablen.funtionen.verwirrt);
                        //noinspection JSCheckFunctionSignatures
                        setTimeout(Spielvariablen.funtionen.verwirrt, 10000);
                    }
                }

                if (PacManAltY < pacman.posY) {
                    pacman.offsetY = -this.factor;
                    pacman.richtung = Spielvariablen.Richtungen.links;
                }
                if (PacManAltY > pacman.posY) {
                    pacman.offsetY = this.factor;
                    pacman.richtung = Spielvariablen.Richtungen.rechts;
                }
                if (PacManAltX < pacman.posX) {
                    pacman.offsetX = -this.factor;
                    pacman.richtung = Spielvariablen.Richtungen.hoch;
                }
                if (PacManAltX > pacman.posX) {
                    pacman.offsetX = this.factor;
                    pacman.richtung = Spielvariablen.Richtungen.runter;
                }


                if (pacman.posX == geist.posX && pacman.posY == geist.posY) {
                    this.beendet = true;
                }
                //PacMan Bewegen Ende

                //gewinnüberprüfung
                if (this.beendet) {
                    zustand.status = 3;
                    Spielvariablen.Spielstart = false;
                }


            }

        }

        geistBewegen() {
            //variablen heranholen zur leichteren lesbarkeit

            let knoten = this.knoten;
            let geist = this.geist;
            let pacman = this.pacMan;
            let level = this.level;
            let geistAltX = this.geist.posX;
            let geistAltY = this.geist.posY;
            geist.isMoving = false;
            if (knoten[geist.posY][geist.posX].nexthop(geist.richtungNeu) == geist.richtungNeu) {
                geist.richtung = geist.richtungNeu;
                switch (geist.richtung) {
                    case Spielvariablen.Richtungen.hoch:
                    {
                        geist.posY--;
                        geist.offsetY = this.factor;
                        break;
                    }
                    case Spielvariablen.Richtungen.links:
                    {
                        geist.posX--;
                        geist.offsetX = this.factor;
                        break;
                    }
                    case Spielvariablen.Richtungen.rechts:
                    {
                        geist.posX++;
                        geist.offsetX = -this.factor;
                        break;
                    }
                    case Spielvariablen.Richtungen.runter:
                    {
                        geist.offsetY = -this.factor;
                        geist.posY++;
                        break;
                    }
                }
                if (geist.posX < 0)geist.posX = knoten[0].length - 1;
                if (geist.posY < 0)geist.posY = knoten.length - 1;
                if (geist.posX > knoten[0].length - 1)geist.posX = 0;
                if (geist.posY > knoten.length - 1)geist.posY = 0;
                if (pacman.posX == geist.posX && pacman.posY == geist.posY) this.beendet = true;

                if (!(geist.posX == geistAltX && geist.posY == geistAltY))geist.isMoving = true;

            }
            if (level[geist.posY][geist.posX] == Spielvariablen.Feldtypen.geisterHaus || level[geist.posY][geist.posX] == Spielvariablen.Feldtypen.geistSpawn || level[geist.posY][geist.posX] == Spielvariablen.Feldtypen.tuer)zustand.aengstlich = false;
            geist.richtung = 5;


            if (this.beendet) {
                zustand.status = 3;
                Spielvariablen.Spielstart = false;
            }
        }

        zuEndeZeichnen() {
            this.pacManContext.clearRect(0, 0, this.width, this.height);
            this.geistContext.clearRect(0, 0, this.width, this.height);
            //pacman richtung wechseln und animation
            if (this.animationCount++ % 10 == 0) {
                if (++this.animationFrame > 2)this.animationFrame = 0;
            }

            this.pacManContext.save();
            this.pacManContext.translate(this.pacMan.posX * this.factor + this.pacMan.offsetX + this.factor / 2, this.pacMan.posY * this.factor + this.pacMan.offsetY + this.factor / 2);
            this.pacManContext.rotate(this.pacMan.richtung * Math.PI / 2);
            this.pacManContext.drawImage(this.pacMan.image, this.animationFrame * 100, 0, 100, 100, -this.factor / 2, -this.factor / 2, this.factor, this.factor);
            this.pacManContext.restore();

            //pacman richtung wechseln und animation ende

            for (let i = 0; i < this.pillen.length; i++)
                this.pacManContext.putImageData(this.pillen[i].imageData, this.pillen[i].posX * this.factor, this.pillen[i].posY * this.factor);

            this.geistContext.drawImage(this.geist.image, this.geist.posX * this.factor + this.geist.offsetX, this.geist.posY * this.factor + this.geist.offsetY, this.factor, this.factor);
            if (this.pacMan.offsetX > 0)this.pacMan.offsetX -= this.offsetDivPac;
            if (this.pacMan.offsetX < 0)this.pacMan.offsetX += this.offsetDivPac;
            if (this.pacMan.offsetY < 0)this.pacMan.offsetY += this.offsetDivPac;
            if (this.pacMan.offsetY > 0)this.pacMan.offsetY -= this.offsetDivPac;
            if (this.geist.offsetX > 0)this.geist.offsetX -= this.offsetDivGeist;
            if (this.geist.offsetX < 0)this.geist.offsetX += this.offsetDivGeist;
            if (this.geist.offsetY < 0)this.geist.offsetY += this.offsetDivGeist;
            if (this.geist.offsetY > 0)this.geist.offsetY -= this.offsetDivGeist;

            if (Math.abs(this.pacMan.offsetX) + Math.abs(this.pacMan.offsetY) + Math.abs(this.geist.offsetX) + Math.abs(this.geist.offsetY) > 4)
                requestAnimationFrame(function () {
                    Spielvariablen.spielFlaeche.zuEndeZeichnen();
                })
        }

    }
    class astar {
        //Astar bildet den Routingalgorythmus A* für unsere art Grid ab
        /**
         * Initalisierung des grids auf standarDwerte
         * @param grid hier wird das zu initalisierende grid benötigt
         */
        static init(grid) {
            for (let y = 0; y < grid.length; y++) {
                for (let x = 0; x < grid[y].length; x++) {
                    let node = grid[x][y];
                    if (node instanceof Knoten) {
                        node.f = 0;
                        node.g = 0;
                        node.h = 0;
                        node.parent = null;
                    }
                }
            }
        }

        /**
         * Routensuche
         * @param grid Grid in dem die route gesucht werden soll
         * @param startX X-Koordinate des Starts
         * @param startY Y-Koordinate des Starts
         * @param endX X-Koordinate des Ziels
         * @param endY Y-Koordinate des Ziels
         * @returns {*} gibt ein Array zurück indem die beste Route abgebildet ist, ist leer wenn fehler(z.B. keine Route)
         */
        static search(grid, startX, startY, endX, endY) {
            astar.init(grid);
            let openlist = [];
            let closedlist = [];
            openlist.push(grid[startY][startX]);
            while (openlist.length > 0) {
                //kleinsten f(x) raussuchen zum weiterarbeiten
                let kleinsInd = 0;
                for (let i = 0; i < openlist.length; i++) {
                    if (openlist[i].f < openlist[kleinsInd].f)kleinsInd = i;
                }
                let aktKnoten = openlist[kleinsInd];
                //ende <-- ergebnis gefunden ermittelten pfad zurückgeben
                if (aktKnoten.posX == endX && aktKnoten.posY == endY) {
                    let akt = aktKnoten;
                    let ret = [];
                    while (akt.parent != null) {
                        ret.push(akt);
                        akt = akt.parent
                    }
                    return ret.reverse();

                }
                //normalfall <-- aktNode von open ind closedlist und alle nachbarn abklappern;
                openlist.splice(openlist.indexOf(aktKnoten), 1);
                closedlist.push(aktKnoten);
                let nachbarn = aktKnoten.nachbarn;
                for (let i = 0; i < nachbarn.length; i++) {
                    let nachbar = nachbarn[i];
                    if (closedlist.indexOf(nachbar) > -1) {
                        //schon abgegraster knoten
                        continue;
                    }
                    //die gPunkte geben die Distanz vom Start zum aktuellen knoten an
                    //nun müssen wir prüfen ob der pfad über den wir diesen nachbarn erreicht haben
                    //der kürzeste ist den wir bis jetzt kennen;
                    let gPunkte = aktKnoten.g + 1;
                    let gPunkteIsBester = false;
                    if (!(openlist.indexOf(nachbar) > -1)) {
                        //diesen Knoten erreichen wir das erste mal alse muss es der aktuell beste weg sein
                        //ausserdem müssen wir nun die Manhatttandistanz=h nehmen
                        gPunkteIsBester = true;
                        nachbar.h = astar.manhattan(nachbar.posX, nachbar.posY, endX, endY);
                        openlist.push(nachbar);
                    } else if (gPunkte < nachbar.g) {
                        //diesen Knoten haben wir gesehen aber beim letzten war die distanz schlechter
                        gPunkteIsBester = true;
                    }
                    if (gPunkteIsBester) {
                        nachbar.parent = aktKnoten;
                        nachbar.g = gPunkte;
                        nachbar.f = nachbar.g + nachbar.h;
                        nachbar.debug = "F: " + nachbar.f + "<br>G: " + nachbar.g + "<br>H: " + nachbar.h;

                    }
                }
            }
            //kein ergebnis gefunden leeres array=fehler;
            return [];

        }

        /**
         * Berechnet die Manhattandistanz zwischen zwei punkten
         * @param posStartX X-Koordinate des Starts
         * @param posStartY Y-Koordinate des Starts
         * @param posEndeX X-Koordinate des Ziels
         * @param posEndeY Y-Koordinate des Ziels
         * @returns {number} Liefert den Abstand nach |posStartX-posEndeX|+|posStartY-posEndeY|
         */
        static manhattan(posStartX, posStartY, posEndeX, posEndeY) {
            let dx = Math.abs(posStartX - posEndeX);
            let dy = Math.abs(posStartY - posEndeY);
            return dx + dy;
        }
    }
}());
