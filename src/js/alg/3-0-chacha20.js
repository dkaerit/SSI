import { ints, hexs } from '../utils/transforms';
const ROUNDS = 20;



function sum1Dand2D(oneD,twoD) {
    return oneD.map((el,i) => {
        let j = Math.trunc(i/(twoD.length-1)); 
        let k = i%(twoD[j].length);
        return el + twoD[j][k];
    });
}

export default class ChaCha20 {
    constructor(format, Plaintext, key) {
        
        this.clave = ints.fromHexs(key.split(": ").map(word => word.split(":").reverse().join(""))); 
        //this.contador = ints.fromHexs(prompt("Contador", "01:00:00:00").split(": ").map(word => word.split(":").reverse().join("")));
        //this.nonce = ints.fromHexs(prompt("Nonce", "00:00:00:09: 00:00:00:4a: 00:00:00:00").split(": ").map(word => word.split(":").reverse().join("")));
        this.contador = ints.fromHexs(("01:00:00:00").split(": ").map(word => word.split(":").reverse().join("")));
        this.nonce = ints.fromHexs(("00:00:00:09: 00:00:00:4a: 00:00:00:00").split(": ").map(word => word.split(":").reverse().join("")));

        console.log("clave:", this.clave);       // [[4],[4],[4],[4],[4],[4],[4],[4]]
        console.log("contador:", this.contador); // [[4]]
        console.log("nonce:", this.nonce);       // [[4],[4],[4]]
        
        
        // Estado inicial
        var S = [ 0x61707865, 0x3320646e, 0x79622d32, 0x6b206574 ]
        .concat(this.clave)    // S[4..11]  = K (clave)
        .concat(this.contador) // S[12]     = i (contador)
        .concat(this.nonce)    // S[13..15] = N (nonce)
        
        console.log("ESTADO INICIAL: ");
        console.table([
            hexs.fromInts(S.slice(0,4)),
            hexs.fromInts(S.slice(4,8)),
            hexs.fromInts(S.slice(8,12)),
            hexs.fromInts(S.slice(12,16))
        ]);

        var salida = this.chachaBlock(S);

        console.log("SALIDA DEL GENERADOR: ");
        console.table([
            hexs.fromInts(salida.slice(0,4)),
            hexs.fromInts(salida.slice(4,8)),
            hexs.fromInts(salida.slice(8,12)),
            hexs.fromInts(salida.slice(12,16))
        ]);
    }

    ROTL(a,b) {
        return (((a << b)) | (a >>> (32-b)));
    }

    QR(x,i,j,k,l) {
        var a = x[i], b = x[j], c = x[k], d = x[l];
        a+=b; d^=a; d=this.ROTL(d,16);
        c+=d; b^=c; b=this.ROTL(b,12);
        a+=b; d^=a; d=this.ROTL(d,8);
        c+=d; b^=c; b=this.ROTL(b,7);
        x[i]=a>>>0; x[j]=b>>>0; x[k]=c>>>0; x[l]=d>>>0;
    }

    chachaBlock(input) { // [16]
        var x = new Array(16);  // palabras
        input.map((word,i) => {x[i] = word});
        
        for(var i = 0; i < ROUNDS; i+=2) {
            // Ronda impar
            this.QR(x, 0, 4,  8, 12); // column 0
            this.QR(x, 1, 5,  9, 13); // column 1
            this.QR(x, 2, 6, 10, 14); // column 2
            this.QR(x, 3, 7, 11, 15); // column 3
            // Ronda par
            this.QR(x, 0, 5, 10, 15); // diagon 1
            this.QR(x, 1, 6, 11, 12); // diagon 2
            this.QR(x, 2, 7,  8, 13); // diagon 3
            this.QR(x, 3, 4,  9, 14); // diagon 4
        }
        
        console.log("TRAS LAS 20 ITERACIONES: ");
        console.table([
            hexs.fromInts(x.slice(0,4)),
            hexs.fromInts(x.slice(4,8)),
            hexs.fromInts(x.slice(8,12)),
            hexs.fromInts(x.slice(12,16))
        ]);

        return x.map((word,i) => {
            return word+input[i];
        });
    }

    encrypt() {
        return [];
    }

    decrypt() {
        return [];
    }

    render() {

    }
}