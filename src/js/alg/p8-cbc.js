import { ints, hexs, bins, str } from '../utils/transforms';
import { AESencrypt as AES} from '../utils/rijndael';

export default class p8 {
    constructor(format, plaintext, key) { // str,str,str
        this.iv = prompt("Introduce el IV", "00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00");
        
        this.key = key.split(',');                       // preparar la clave - HEXS
        this.iv = this.iv.split(',');                    // preparar IV - HEXS
        this.bloques = this.separarEnBloques(plaintext); // array de bloques(arrays) - HEXS
        this.bf = [].concat.apply([], this.bloques);     // bloques concatenados en uno - HEXS
        
        // mostrar los valores iniciales
        console.log("Clave", this.key);
        console.log("IV", this.iv);
        this.bloques.map((bloque,i) => {console.log(`Plaintext B${i}`, bloque);});
        
        // resultado final
        this.res = ints.fromHexs(this.bf);
    }

    encrypt() {
        var b_xor_iv
        this.bloques[0].map((hex,i) => {b_xor_iv.push(hex ^ this.iv[i]);});
        console.log("AES", AES("hola mundo", "hola mundo"));


        return ints.fromHexs(this.bf);
    }

    decrypt() {
        return ints.fromHexs(this.bf);
    }

    separarEnBloques(plaintext) {
        var txtarr = plaintext.split(', ');
        var tmp = [];
        var result = [];
        txtarr.map((byte,i) => {
            tmp.push(byte);
            if(i%16 == 15 || (i+1) == txtarr.length) {
                result.push(tmp);
                tmp = [];
            }
        });
        return result;
    }

    render() {
        $(`#res-plaintext`).html(str.fromInts(this.res));
        $(`#res-bin`).html(bins.fromInts(this.res).join(', '));
        $(`#res-hex`).html(hexs.fromInts(this.res).join(', '));
        $(`#res-int`).html(this.res.join(', '));
    }
}