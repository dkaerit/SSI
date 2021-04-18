import { ints, hexs, bins, str } from '../utils/transforms';

export default class p8 {
    constructor(format, plaintext, key) {

        // preparar la clave
        this.key = key.split(',');

        // determinar el IV
        this.iv = prompt("Introduce el IV", "00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00");
        this.iv = this.iv.split(',');

        // separar en bloques
        var txtarr = plaintext.split(', ');
        this.bloques = [];
        var tmp = [];
        txtarr.map((byte,i) => {
            tmp.push(byte);
            if(i%16 == 15 || (i+1) == txtarr.length) {
                this.bloques.push(tmp);
                tmp = [];
            }
        });

        // mostrar los valores iniciales
        console.log("Clave", this.key);
        console.log("IV", this.iv);
        console.log("Plaintext B1", this.bloques[0]);
        console.log("Plaintext B2", this.bloques[1]);
        
        this.bf = [].concat.apply([], this.bloques);
        this.res = ints.fromHexs(this.bf);
    }

    encrypt() {
        return ints.fromHexs(this.bf);
    }

    decrypt() {
        return ints.fromHexs(this.bf);
    }

    render() {
        $(`#res-plaintext`).html(str.fromInts(this.res));
        $(`#res-bin`).html(bins.fromInts(this.res).join(', '));
        $(`#res-hex`).html(hexs.fromInts(this.res).join(', '));
        $(`#res-int`).html(this.res.join(', '));
    }
}