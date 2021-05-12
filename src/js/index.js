import { ints, hexs, bins, str } from './utils/transforms';
import Vernam     from './alg/0-0-vernam';
import Vigenere   from './alg/1-0-vigenere';
import RC4        from './alg/2-0-rc4';
import A5         from './alg/2-1-a5-1';
import ChaCha20   from './alg/3-0-chacha20';
import GenE0      from './alg/4-0-gen-e0';
import GenCA      from './alg/4-1-gen-ca-gps';
import Snow3G     from './alg/5-0-multi-snow3g-y-aes';
import AES        from './alg/6-0-rijndael';
import CBC        from './alg/7-0-cbc';
import FiatShamir from './alg/7-1-fiat-shamir';
import DyH_G      from './alg/8-0-elgamal';
import RSA        from './alg/9-0-rsa';
import DyH_GE     from './alg/10-0-diffle&hellman(elgamal elíptico)';
import GE         from './alg/10-1-gamal-eliptico';

disable(1,1,1,1,1,1);
var objs = [ 0, 
    Vernam, Vigenere, RC4, A5, ChaCha20,
    GenE0, GenCA, Snow3G, AES, CBC, FiatShamir, DyH_G, RSA, DyH_GE, GE ];

// selectores


// listeners
$('#algoritmo').children().map(i => createEncrypt(objs[i],  $('#algoritmo').children()[i].innerHTML));
$('#algoritmo').children().map(i => createDecrypt(objs[i],  $('#algoritmo').children()[i].innerHTML));

// desactivar botones de ejemplos al inicio
if ($('#ej1').is(':checked')) $('#ej2').attr('disabled','disabled'); 


// inicialización
$('#algoritmo').change(() => {
    $('#res-bin').show(); $("label[for='res-bin']").show();
    $('#res-int').show(); $("label[for='res-int']").show();
    $('#res-hex').show(); $("label[for='res-hex']").show();
    switch($('#algoritmo option:selected').val()) { // trataminto de campos y ejemplos
        case "0": // Vernam
            active(1,1,1,1,1,1); // activar todo
            disable(1,0,1,0,0,0); // restringir elegir clave (es aleatoria) y forzamos que el formato sea srt
            $("#formato").val('srt');

            $('#ejemplos').change(() => {
                if($('#algoritmo option:selected').val() == "0") {
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
            
        case "1": // Vigeneres
            active(1,1,1,1,1,1);
            disable(0,0,0,0,0,0);  
            $("#formato").val('srt');
            $('#ej2').attr('disabled','disabled');

            $('#ejemplos').change(() => {
                if($('#algoritmo option:selected').val() == "1") {
                    if($('#ej1').is(':checked')) {
                        $(`#plaintext`).html("ESTE MENSAJE SE AUTODESTRUIRA");
                        $(`#cipherkey`).html("MISION");
                    } 
                }
            }); 
            ; break;

        case "2": 
            ; break;

        case "3":
            ; break;

        case "4": // ChaCha20
            active(1,1,1,1,1,1);
            disable(1,1,0,0,0,0); 
            $('#ej2').attr('disabled','disabled');
            $(`#plaintext`).html("");
            $(`#cipherkey`).html("00:01:02:03: 04:05:06:07: 08:09:0a:0b: 0c:0d:0e:0f: 10:11:12:13: 14:15:16:17: 18:19:1a:1b: 1c:1d:1e:1f");

            $('#ejemplos').change(() => {
                if($('#algoritmo option:selected').val() == "4") {
                    if($('#ej1').is(':checked')) {
                        $(`#plaintext`).html("");
                        $(`#cipherkey`).html("00:01:02:03: 04:05:06:07: 08:09:0a:0b: 0c:0d:0e:0f: 10:11:12:13: 14:15:16:17: 18:19:1a:1b: 1c:1d:1e:1f");
                    }
                }
                
            });
            ; break;

        case "5": 

            ; break;

        case "6": // GenCA
            active(1,1,1,1,1,1);
            disable(1,1,0,0,0,0);
            $(`#cipherkey`).html(JSON.stringify({satelite: 1, longitud: 14}).replace(/[\r,]/g, ",  ")); 
            $('#ej1').attr('disabled','disabled');
            $('#ej2').attr('disabled','disabled');
            ; break;

        case "7": 
            ; break;

        case "8":
            ; break;

        case "9": // CBC
            active(1,1,1,1,1,1);
            disable(1,0,0,0,0,0); 
            $("#formato").val('hex');

            $('#ejemplos').change(() => {
                if($('#algoritmo option:selected').val() == "9") {
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

        case "10": // Fiat-Shamir

            ; break;

        case "11": // ElGamal
            active(1,1,1,1,1,1);
                disable(1,0,0,0,0,0);  
                $(`#plaintext`).html(JSON.stringify({p: 13, a: 4, m: 8}).replace(/[\r,]/g, ",  "));
                $(`#cipherkey`).html(JSON.stringify({k: 5, x: 2}).replace(/[\r,]/g, ",  "));
                $('#ejemplos').change(() => {
                    if($('#algoritmo option:selected').val() == "11") {
                        if($('#ej1').is(':checked')) {
                            disable(1,1,1,0,0,0); 
                            $(`#plaintext`).html(JSON.stringify({p: 43, a: 23, m: 18}).replace(/[\r,]/g, ",  "));
                            $(`#cipherkey`).html(JSON.stringify({k: 25, x: 33}).replace(/[\r,]/g, ",  "));
                        } 
                        if($('#ej2').is(':checked')) {
                            disable(1,1,1,0,0,0); 
                            $(`#plaintext`).html(JSON.stringify({p: 113, a: 43, m: 28}).replace(/[\r,]/g, ",  "));
                            $(`#cipherkey`).html(JSON.stringify({k: 54, x: 71}).replace(/[\r,]/g, ",  "));
                        }
                        if($('#manual').is(':checked')) {
                            active(1,1,1,1,1,1);
                            disable(1,0,0,0,0,0); 
                            $(`#plaintext`).html(JSON.stringify({p: 13, a: 4, m: 8}).replace(/[\r,]/g, ",  "));
                            $(`#cipherkey`).html(JSON.stringify({k: 5, x: 2}).replace(/[\r,]/g, ",  "));
                        }
                    }
                });
            ; break;
        
        
        case "12": // RSA
            active(1,1,1,1,1,1);
            disable(1,0,0,0,0,0); 

            $('#ej2').attr('disabled','disabled');
            $(`#plaintext`).html(JSON.stringify({msg: "MANDA DINEROS", p: 421, q: 7, d: 1619}).replace(/[\r,]/g, ",  "));
            $('#ejemplos').change(() => {
                if($('#algoritmo option:selected').val() == "12") {
                    if($('#ej1').is(':checked')) {
                        disable(1,1,1,0,0,0); 
                        $(`#plaintext`).html(JSON.stringify({msg: "AMIGO MIO", p: 2347, q: 347, d: 5}).replace(/[\r,]/g, ",  "));
                    } 
                    if($('#manual').is(':checked')) {
                        active(1,1,1,1,1,1);
                        disable(1,0,0,0,0,0); 
                        $(`#plaintext`).html(JSON.stringify({msg: "MANDA DINEROS", p: 421, q: 7, d: 1619}).replace(/[\r,]/g, ",  "));
                    }
                }
            });
            ; break;

        case "13": // DyH_GE
            active(1,1,1,1,1,1);
            disable(1,0,0,0,0,0);
            $('#res-bin').hide(); $("label[for='res-bin']").hide();
            $('#res-int').hide(); $("label[for='res-int']").hide();
            $('#res-hex').hide(); $("label[for='res-hex']").hide();
            //alert("Este algoritmo utiliza la curva elíptica E: y²= x³ + ax + b");

            $('#ej2').attr('disabled','disabled');
            $('#ejemplos').change(() => {
                if($('#algoritmo option:selected').val() == "13") {
                    if($('#ej1').is(':checked')) {
                        disable(1,1,1,0,0,0); 
                        $(`#plaintext`).html(JSON.stringify({p: 13, a: 5, b: 3, m: 2}).replace(/[\r,]/g, ",  "));
                        $(`#cipherkey`).html(JSON.stringify({dA: 4, dB: 2, G: [9,6]}).replace(/[\r,]/g, ",  "));
                    } 

                    if($('#manual').is(':checked')) {
                        active(1,1,1,1,1,1);
                        disable(1,0,0,0,0,0); 
                    }
                }
            });
            ; break;

        case "14":
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