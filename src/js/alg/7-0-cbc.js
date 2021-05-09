import { ints, hexs, bins, str } from '../utils/transforms';
import { Aes } from '../utils/rijndael';

Array.prototype.swap = function(a, b){
    this[a] = this.splice(b, 1, this[a])[0];
    return this;
}

export default class CBC {
    constructor(format, plaintext, key) { // str,str,str
        // array de bloques(arrays) - HEXS
        if(format == "srt") {
            this.iv = prompt("Introduce el IV", "AAAAAAAAAAAAAAAA");
            this.intsMsg = ints.fromString(plaintext);
            this.key     = ints.fromString(key);               
            this.iv      = ints.fromString(this.iv);   
        }
        if(format == "hex") {
            this.iv = prompt("Introduce el IV", "00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00");
            this.intsMsg = ints.fromHexs(plaintext.split(','));
            this.key     = ints.fromHexs(key.split(','));               
            this.iv      = ints.fromHexs(this.iv.split(','));           
        }
        if(format == "bin") {
            this.iv = prompt("Introduce el IV", "000000,000000,000000,000000,000000,000000,000000,000000,000000,000000,000000,000000,000000,000000,000000,000000,000000,");
            this.intsMsg = ints.fromBins(plaintext.split(','));
            this.key     = ints.fromBins(key.split(','));               
            this.iv      = ints.fromBins(this.iv.split(','));
        }
        this.bloques = this.separarEnBloques(plaintext); 
        console.log(`bloques separados: `,this.bloques);
        
        // mostrar los valores iniciales
        console.log("Clave", this.key);
        console.log("IV", this.iv);
        this.bloques.map((bloque,i) => {console.log(`Plaintext B${i}`, bloque);});
        
        // resultado final
        this.res = ints.fromHexs(plaintext);
    }

    encrypt() {
        const aes = new Aes();
        var xor = [];
        var cifrados = [];
        var key = this.key;
    
        this.bloques.map((bloque,i) => {
            xor = [];
            if(i == 0) {
                xor = ints.fromHexs(bloque).map((byte,j) => { return (byte ^ this.iv[j]); }); 
                console.log("xor:", xor);
                cifrados.push(aes.cipher(key,xor));  // agregar bloque cifrado AES
            } else {
                if (bloque.length == 16) {
                    xor = ints.fromHexs(bloque).map((byte,j) => { return (byte ^ cifrados[i-1][j]); }); 
                    cifrados.push(aes.cipher(key,xor));  // agregar bloque cifrado AES
                } else {
                    var cs = this.cypherStealing(i,cifrados[i-1]);
                    xor = ints.fromHexs(cs).map((byte,j) => { return (byte ^ cifrados[i-1][j]); }); 
                    cifrados.push(aes.cipher(key,xor));
                    cifrados.swap(i,i-1);
                } 
                
            }
                       
        });

        console.log(cifrados);
        return [].concat.apply([], cifrados);
    }

    separarEnBloques(plaintext) { // separar en bloques de 16 bytes
        var tmp = [];
        var result = [];
        this.intsMsg.map((byte,i) => { // se mapea la cadena completa
            tmp.push(byte); // recarco array temporal de 16 de longitud
            if(i%16 == 15 || (i+1) == this.intsMsg.length) { // al llegar a mod16 o al final inserto eslabón 
                result.push(tmp);
                tmp = [];
            }
        });
        return result;
    }

    decrypt() {
        const aes = new Aes();
        var key = this.key;
        var cifra, xor, descifrados = [];
        this.bloques.map((bloque,i) => {
            cifra = (i == 0)? this.iv : this.bloques[i-1];
            xor = cifra.map(byte => { return (byte ^ aes.decrypt(key,cifra));});
            descifrados.push(xor);
        });

        return [].concat.apply([], descifrados);
    }

    cypherStealing(nivel,prevc) {
        //console.log(hexs.fromInts(this.bloques[nivel]),hexs.fromInts(prevc))
        
        var bytesMinor = this.bloques[nivel].length; // byte del bloque pequeño
        var bytesMayor = prevc.length;               // bytes del cifrado anterior
        var dif = bytesMayor - bytesMinor;           // diferencia

        var sub = prevc.slice(bytesMinor,bytesMinor+dif); // extraer el sub array extra del cifrado anterior
        for(var i = 0; i < dif; i++) prevc.pop();         // eliminar esos elementos del cifrado anterior
        
        return [].concat.apply(this.bloques[nivel], sub);        
    }

    render() {
        $(`#res-plaintext`).html(str.fromInts(this.res));
        $(`#res-bin`).html(bins.fromInts(this.res).join(', '));
        $(`#res-hex`).html(hexs.fromInts(this.res).join(', '));
        $(`#res-int`).html(this.res.join(', '));
    }
}

