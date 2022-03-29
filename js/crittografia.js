var characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";

var keys = new Array();
function encode(){
    $("#input-warning").addClass("d-none");
    characters = $("#valid-characters").val();

    for(let i = 1; i <= 4; i++){    //si prende le chiavi valide
        if($("#in-"+i).val() != ""){
            keys.push($("#in-"+i).val());
        }
    }
    let text = $("#text").val();

    if(keys.length == 0){
        $("#result").val(text); //se non ha dato chiavi, non c'è codifica
        return;
    } 
    
    //inizio codifica
    let result = "";
    for(let i = 0; i < text.length; i++){
        let pos = characters.indexOf(text.charAt(i));
        
        if(pos == -1){
            $("#input-warning").removeClass("d-none");
            return;
        }

        let keyPosition = i % keys.length; //calcola quale chiave utilizzare

        result += characters[(+pos + +keys[keyPosition]) % characters.length]; //(posizione + val-chiave)% tot-char

    }
    //fine codifica
    $("#result").val(result);
    keys = new Array();
}


var d_keys = new Array();
function decode(){
    $("#d-input-warning").addClass("d-none");
    characters = $("#valid-characters").val();

    for(let i = 1; i <= 4; i++){    //si prende le chiavi valide
        if($("#in-d-"+i).val() != ""){
            d_keys.push($("#in-d-"+i).val());
        }
    }

    let text = $("#d-text").val();

    if(d_keys.length == 0){
        $("#d-result").val(text); //se non ha dato chiavi, non c'è decodifica
        return;
    } 

    //inizio decodifica
    let result = "";
    for(let i = 0; i < text.length; i++){
        let pos = characters.indexOf(text.charAt(i));
        
        if(pos == -1){
            $("#d-input-warning").removeClass("d-none");
            return;
        }

        let keyPosition = i % d_keys.length; //calcola quale chiave utilizzare
        result += characters[(+pos - + (d_keys[keyPosition]%characters.length) + characters.length)% characters.length]; //(posizione - val-chiave + tot-char)% tot-char
    }
    //fine decodifica
    $("#d-result").val(result);
    d_keys = new Array();
}

function copyEncodeKeys(){
    for(let i = 1; i <= 4; i++){
        $("#in-d-"+i).val($("#in-"+i).val());
    }
}

$(document).ready(function() {
    new ClipboardJS('#copy-btn');
    $("#valid-characters").val(characters);
});