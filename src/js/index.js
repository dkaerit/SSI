import { ints, hexs, bins, str } from './utils/transforms';

import p1  from './alg/p1-vernam';
import p2  from './alg/p2-vigenere';
import p3  from './alg/p3-rc4';
import p4  from './alg/p4-a5-1';
import p5  from './alg/p5-gen-e0';
import p6  from './alg/p6-multi-snow3g-y-aes';
import p7  from './alg/p7-rijndael';
import p8  from './alg/p8-cbc';
import p9  from './alg/p9-diffle-hellman';
import p10 from './alg/p10-fiat-shamir';
import p11 from './alg/p11-rsa';
import p12 from './alg/p12-gamal-eliptico';

disable(1,1,1,1,1,1);
var objs = [ 0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12 ]

// selectores


// listeners
$('#algoritmo').children().map(it => createEncrypt(objs[it],  $('#algoritmo').children()[it].innerHTML));
$('#algoritmo').children().map(it => createDecrypt(objs[it],  $('#algoritmo').children()[it].innerHTML));

if ($('#ej1').is(':checked')) {
    $('#ej2').attr('disabled','disabled');
} else {
}

// inicialización
$('#algoritmo').change(() => {
    switch($('#algoritmo option:selected').val()) {
        case "1": 
            active(1,1,1,1,1,1);
            disable(0,0,1,0,0,0);  
            $("#formato").val('srt');

            $('#ejemplos').change(() => {
                if($('#algoritmo option:selected').val() == "1") {
                    if($('#ej1').is(':checked')) {
                        $(`#plaintext`).html("SOL");
                        $(`#cipherkey`).html(str.fromBins(["00111100", "00011000", "01110011"]).join(''));
                    } 
                    if($('#ej2').is(':checked')) {
                        $(`#plaintext`).html("[t");
                        $(`#cipherkey`).html(str.fromBins(["00001111", "00100001"]).join(''));
                    }     
                }
            }); 

            ; break;
            
        case "2": 
            active(1,1,1,1,1,1);
            disable(0,0,0,0,0,0);  
            $("#formato").val('srt');
            $('#ej2').attr('disabled','disabled');

            $('#ejemplos').change(() => {
                if($('#algoritmo option:selected').val() == "2") {
                    if($('#ej1').is(':checked')) {
                        $(`#plaintext`).html("ESTE MENSAJE SE AUTODESTRUIRA");
                        $(`#cipherkey`).html("MISION");
                    } 
                }
            }); 
            ; break;

        case "3": 
            ; break;

        case "4":
            ; break;

        case "5":
            ; break;

        case "6":
            ; break;

        case "7":
            ; break;

        case "8":
            active(1,1,1,1,1,1);
            disable(1,0,0,0,0,0); 
            $("#formato").val('hex');

            $('#ejemplos').change(() => {
                if($('#algoritmo option:selected').val() == "8") {
                    if($('#ej1').is(':checked')) {
                        disable(0,0,1,0,0,0); 
                        $(`#plaintext`).html(([
                            "00", "11", "22", "33", "44", "55", "66", "77", 
                            "88", "99", "AA", "BB", "CC", "DD", "EE", "FF", 
                            "00", "00", "00", "00", "00", "00", "00", "00", 
                            "00", "00", "00", "00", "00", "00", "00", "00"
                        ]).join(', '));
                        $(`#cipherkey`).html(([
                            "00","01","02","03","04","05","06","07",
                            "08","09","0A","0B","0C","0D","0E","0F"
                        ]).join(', '));
                    } 
                    if($('#ej2').is(':checked')) {
                        disable(0,0,1,0,0,0); 
                        $(`#plaintext`).html(([
                            "00", "11", "22", "33", "44", "55", "66", "77", 
                            "88", "99", "AA", "BB", "CC", "DD", "EE", "FF", 
                            "00", "00", "00", "00", "00", "00", "00", "00", 
                            "00", "00", "00", "00", "00", "00", "00"
                        ]).join(', '));
                        $(`#cipherkey`).html(([
                            "00","01","02","03","04","05","06","07",
                            "08","09","0A","0B","0C","0D","0E","0F"
                        ]).join(', '));
                    }
                    if($('#manual').is(':checked')) {
                        active(0,0,1,0,0,0); 
                    }
                }
            }); 

            ; break;

        case "9":
            ; break;

        case "10":
            ; break;

        case "11":
            ; break;

        case "12":
            ; break;

        default:
            $('#cipherkey').attr('disabled','disabled');
            $('#plaintext').attr('disabled','disabled');
            $('#encrypt').attr('disabled','disabled');
            ; break;

    }
});

function disable(formato, plaintext, key, enc, des, ej) {
    if(formato)   $('#formato').attr('disabled','disabled');
    if(plaintext) $('#plaintext').attr('disabled','disabled');
    if(key)       $('#cipherkey').attr('disabled','disabled');
    if(enc)       $('#encrypt').attr('disabled','disabled');
    if(des)       $('#decrypt').attr('disabled','disabled');
    if(ej)        $('.form-check-input').attr('disabled','disabled');
}


function active(formato, plaintext, key, enc, des, ej) {
    if(formato)   $('#formato').removeAttr('disabled');
    if(plaintext) $('#plaintext').removeAttr('disabled');
    if(key)       $('#cipherkey').removeAttr('disabled');
    if(enc)       $('#encrypt').removeAttr('disabled');
    if(des)       $('#decrypt').removeAttr('disabled');
    if(ej)        $('.form-check-input').removeAttr('disabled');
}

function createEncrypt(obj, tag) {
    $(`#encrypt`).click(() => {
        if($('#algoritmo option:selected').text() == tag) {
            console.clear();
            let tmp = new obj($('#formato option:selected').val(), $("#plaintext").val(), $("#cipherkey").val());
            tmp.res = tmp.encrypt();
            tmp.render();
        }
    });    
}

function createDecrypt(obj, tag) {
    $(`#decrypt`).click(() => {
        if($('#algoritmo option:selected').text() == tag) {
            let tmp = new obj($('#formato option:selected').val(), $("#plaintext").val(), $("#cipherkey").val());
            tmp.res = tmp.decrypt();
            tmp.render();
        }
    });    
}