import alg from '../utils/ModExpontentes'
import { ints, hexs, bins, str } from '../utils/transforms';

var alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
                'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export default class RSA {
    constructor(format, data, key) {
        let dat  = JSON.parse(data);
        this.msg = dat.msg;
        this.p   = dat.p;
        this.q   = dat.q;
        this.d   = dat.d;

        // valores derivados
        this.n   = this.p*this.q;         // n  = p*q
        this.fin = (this.p-1)*(this.q-1); // fi = (p-1)*(q-1)
        this.e   = this.check(this.p,this.q,this.d);
        console.log(`Se calcula e:${this.e}`);
        
        this.tam = this.get_tam();
        console.log(`Como n:${this.n}, se divide el texto en bloques de ${this.tam} caracteres`);

        console.log(this.codificacionNumerica());

        this.res = this.encrypt();
    }

    // operaciones previas
    check(p,q,d) {
        var e = alg.euclidExt(d,this.fin).inverso;

        console.log(`Se comprueba que p:${this.p} y q:${this.q} son primos`);
        if(!alg.lehmanPeralta(p)){
            console.log("Error. p no es primo")
            return false
        }

        if(!alg.lehmanPeralta(q)){
            console.log("Error. q no es primo")
            return false
        }
        
        console.log(`Se comprueba que d:${this.d} es primo con fi(n):${this.fin}`);
        if (alg.euclidExt(d,this.fin).inverso == 0){
            var primos = [2, 3, 5, 7, 11];
            for (var i = 0; i < primos.length; i++){
                if (e == primos[i]) break;
                if (e % primos[i] == 0) {
                    console.log("Error. d no es primo")
                    return false
                }
            }
        }

        return e;
    }

    get_tam() {
        var j = 1;
        while(Math.pow(alfabeto.length, j) < this.n) j++;
        return j-1;
    }

    // codificación
    codificacionNumerica() {
        var caracteres = Math.floor(Math.log(this.n)/Math.log(26));
        var letras_to_num = [];
        var bloques_decimal = "";
        for (var i = 0; i < this.msg.length; i = i+caracteres) {
            var letra_num = 0;
            var aux = caracteres-1;
            for (var j = 0; j < caracteres; j++){
                if(alfabeto.indexOf(this.msg[i+j]) != -1) {
                    letra_num = alfabeto.indexOf(this.msg[i+j]) * Math.pow(26, aux) + letra_num;
                    aux = aux -1
                }
            }
            bloques_decimal = bloques_decimal + "," + letra_num.toString();
            letras_to_num.push(letra_num)

            
        }

        var cifrado_array = [];
        var cifrado = ""
        for (var i = 0; i < letras_to_num.length; i++) {
            cifrado_array.push(alg.expRapida(this.n,letras_to_num[i],this.e));
            cifrado = cifrado + cifrado_array[i].toString() + ',';
        }
        
        return bloques_decimal.substring(1).split(",").map(str => parseInt(str, 10));
    }



    // Encriptar y sesencriptar
    encrypt() {
        this.res = this.codificacionNumerica().map(key => {
            return alg.expRapida(key, this.e, this.n);
        });
        
        return this.res;
    }

    decrypt() {
        this.res = ints.fromString(this.msg).map(entero => 
            alg.expRapida(entero, this.d, this.n)
        );
        return this.res;
    }

    render() {
        console.log(this.res);
        var a = this.res;
        
        $(`#res-plaintext`).html(str.fromInts(a));
        $(`#res-bin`).html(a.map(a => a.toString(2)).join(", "));
        $(`#res-hex`).html(a.map(a => a.toString(16)).join(", "));
        $(`#res-int`).html(this.res.join(', '));
    }

}