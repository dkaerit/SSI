import { ints, hexs, bins, str } from '../utils/transforms';
import { alph } from '../utils/alph-p2.json';

export default class Vigenere {
    constructor(format, plaintext, key) {
        alert("Importante: Este algoritmo ignora los espacios");
        this.msg = plaintext.toUpperCase();
        this.cond = this.msg.replace(/\s/g, '');
        this.intsCond = this.intsInAlph(this.cond);

        // claves 
        this.key = key.toUpperCase();
        this.lkey = this.lengthenKey();
        this.intsLkey = this.intsInAlph(this.lkey);

        console.log(this.cond, this.intsCond);
        console.log(this.lkey, this.intsLkey);
    }

    lengthenKey() {
        let result = '', aux = 0;
        this.cond.split('').map((it,ix) => {     
            result += this.key[aux];
            (aux == this.key.length-1) ? aux = 0 : aux++;  
        });
        return result;
    }

    encrypt() {
        let res = this.intsCond.map((it,ix) => { // Mapeo el mensaje origen                    
            return ((it + this.intsLkey[ix]) % 26);              // Aplico la función vigenere
        });
        return res;
    }

    decrypt()
    {
        var et = 0;
        return this.intsCond.map((it,ix) => {                // mapeo mensaje cifrado y desenredo la función de vigenere
            if((((it+26) - this.intsLkey[ix]) >= 26)) return ((it+26)%26 - this.intsLkey[ix]); 
            else                                      return ((it+26)    - this.intsLkey[ix]);                         
        }); 
    }

    intsInAlph(str) {
        return str.split('').map((char) => {             // Mapeo el mensaje
            if(char != ' ') return this.char2int(char); // Convierto a decimal caracter por caracter           
        }).filter(function (el) { return el != null;});  // se retorna un array con los enteros 
    }

    toMessage(msg)
    {
        return msg.map((int) => {        // mapeo el mensaje
            return alph[int];            // Paso binario a entero y de entero a caracter 
        }).join('')                      // Concateno (elementos de array) para formar una cadena
    }

    char2int(char) 
    {
        var num;
        return alph.map((it, ix) => {
            if(it === char) {
                num = ix;
                return num;
            } 
        }).find(el => el === num); // reducción de array a entero 
    }

    render() {
        $(`#res-plaintext`).html(this.toMessage(this.res));
        $(`#res-bin`).html(bins.fromString(this.toMessage(this.res)).join(', '));
        $(`#res-hex`).html(hexs.fromString(this.toMessage(this.res)).join(', '));
        $(`#res-int`).html(ints.fromString(this.toMessage(this.res)).join(', '));
    }
}