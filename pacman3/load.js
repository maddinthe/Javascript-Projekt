/**
 * Created by mtheilen on 23.03.2016.
 */
var zustand = {
    status: 0,
    pause: false,
    observer: null,
    aengstlich: false,
    gesamtpillen: 100,
    restpillen: 5,
    spielerName: "platzhalter",
    startZeit:0,
    zeitSpanne: 5,
    geistfarbe:"blue",
    schwierigkeit:1.1,
    spielFeldGroesse:500
};
if(typeof(localStorage) !== "undefined") {
    let spielerName=localStorage.getItem("REVPacSpielerName");
    let spielFeldGroesse=localStorage.getItem("REVPacSpielFeldGroesse");
    let schwierigkeit=localStorage.getItem("REVPacSchwierigkeit");
    let geistfarbe=localStorage.getItem("REVPacGeistfarbe");
    if(geistfarbe!=null)zustand.geistfarbe=geistfarbe;
    if(spielerName!=null)zustand.spielerName=spielerName;
    if(schwierigkeit!=null)zustand.schwierigkeit=Number(schwierigkeit);
    if(spielFeldGroesse!=null)zustand.spielFeldGroesse=Number(spielFeldGroesse);
}