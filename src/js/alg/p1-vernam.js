import { ints, hexs, bins, str } from '../utils/transforms';

export default class p1 { // vernam
    constructor(format, plaintext, key) {
        if(format == "srt") {this.msg = ints.fromString(plaintext)}
        if(format == "hex") {this.msg = ints.fromHexs(plaintext)}
        if(format == "int") {}
        if(format == "bin") {this.msg = ints.fromBins(plaintext)}

        // gestion de los inputs
        this.key = bins.fromString(key);
        this.intskey = ints.fromString(key);

        this.msgbin = bins.fromString(plaintext);
        this.res = ints.fromString(plaintext);

        // encriptación
        this.res = this.encrypt();

        // mensajes consola
        console.log(`"${plaintext}":`, this.msgbin.join(''), this.msgbin.join('').length);
        console.log(`"${key}":`, this.key.join(''), this.key.join('').length);

        // renderizado
        $(`#res-plaintext`).html(str.fromInts(this.res));
        $(`#res-bin`).html(bins.fromInts(this.res).join(', '));
        $(`#res-hex`).html(hexs.fromInts(this.res).join(', '));
        $(`#res-int`).html(this.res.join(', '));
    }

    
    encrypt() {
       return this.res.map((it,ix) => {
        return it,this.intskey[ix], it ^ this.intskey[ix];
       }); 
    }

    generate_key() {

    }
}