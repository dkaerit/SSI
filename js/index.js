import { ints, hexs, bins, str } from './utils/transforms';

import p1 from './alg/p1-vernam';
import p2 from './alg/p2-vigenere';
import p3 from './alg/p3-rc4';
import p4 from './alg/p4-a5-1';
import p5 from './alg/p5-gen-e0';
import p6 from './alg/p6-multi-snow3g-y-aes';
import p7 from './alg/p7-rijndael';
import p8 from './alg/p8-cbc';
import p9 from './alg/p9-diffle-hellman';
import p10 from './alg/p10-fiat-shamir';
import p11 from './alg/p11-rsa';
import p12 from './alg/p12-gamal-eliptico';

disable(1,1,1,1);
var objs = [ 0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12 ]


$('#algoritmo').children().map(it => createEvent(objs[it],  $('#algoritmo').children()[it].innerHTML));

$('#algoritmo').change(() => {
    switch($('#algoritmo option:selected').text()) {
        case "P1  - Vernam": 
            active(1,1,1,1);
            disable(0,0,1,0);     
            
            $(`#cipherkey`).html(str.fromBins(["00111100", "00011000", "01110011"]).join(''));  
            ; break;
            
        case "P2  - Vigenere": 
            active(1,1,1,1);
            disable(0,0,1,0);
            
            ; break;

        case "P3  - RC4": 
            active(1,1,1,1);
            disable(0,0,1,0);
            ; break;

        case "P4  - A5-1":
            active(1,1,1,1);
            disable(0,0,1,0); 
            ; break;

        case "P5  - Generador E0 de Bluetooth":
            active(1,1,1,1);
            disable(0,0,1,0); 
            ; break;

        case "P6  - Multiplicación Snow3G y AES":
            active(1,1,1,1);
            disable(0,0,1,0); 
            ; break;

        case "P7  - Rijndael":
            active(1,1,1,1);
            disable(0,0,1,0); 
            ; break;

        case "P8  - CBC":
            active(1,1,1,1);
            disable(0,0,1,0); 
            ; break;

        case "P9  - Diffle-Hellman":
            active(1,1,1,1);
            disable(0,0,1,0);
            ; break;

        case "P10 - Fiat-Shamir":
            active(1,1,1,1);
            disable(0,0,1,0);
            ; break;

        case "P11 - RSA":
            active(1,1,1,1);
            disable(0,0,1,0);
            ; break;

        case "P12 - Gamal Elíptico":
            active(1,1,1,1);
            disable(0,0,1,0);
            ; break;

        default:
            $('#cipherkey').attr('disabled','disabled');
            $('#plaintext').attr('disabled','disabled');
            $('#encrypt').attr('disabled','disabled');
            ; break;

    }
});

function disable(formato, plaintext, key, btn) {
    if(formato)   $('#formato').attr('disabled','disabled');
    if(plaintext) $('#plaintext').attr('disabled','disabled');
    if(key)       $('#cipherkey').attr('disabled','disabled');
    if(btn)       $('#encrypt').attr('disabled','disabled');
}


function active(formato, plaintext, key, btn) {
    if(formato)   $('#formato').removeAttr('disabled');
    if(plaintext) $('#plaintext').removeAttr('disabled');
    if(key)       $('#cipherkey').removeAttr('disabled');
    if(btn)       $('#encrypt').removeAttr('disabled');
}

function createEvent(obj, tag) {
    $(`#encrypt`).click(() => {
        if($('#algoritmo option:selected').text() == tag) 
            new obj($('#formato option:selected').val(), $("#plaintext").val(), $("#cipherkey").val());
    });    
}