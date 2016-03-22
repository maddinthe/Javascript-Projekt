"use stricht;"
function show(id) {
    if(document.getElementById) {
        var mydiv = document.getElementById(id);
        mydiv.style.display = (mydiv.style.display=='block'?'none':'block');
    }
}


function post(){
    var name = $('#name').val();
    var alter = $('#alter').val();

    $.post('validate.php',{postname:name,postage:alter},
    function(daten){

        if(daten=="1"){
            $('#result').html('Alter als 18');
        }
        if(daten=="0"){
            $('#result').html('Alter unter 18');
        }

    });
}