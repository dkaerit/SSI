import { ints, hexs, bins, str } from '../utils/transforms';

export default class p1 { // vernam
    constructor(format, plaintext, key) {
        if(format == "srt") {this.intsMsg = ints.fromString(plaintext)}
        if(format == "hex") {this.intsMsg = ints.fromHexs(plaintext)}
        if(format == "int") {}
        if(format == "bin") {this.intsMsg = ints.fromBins(plaintext)}
        

        // gestion de los inputs
        this.key = bins.fromString(key);
        this.generate_key();
        this.intskey = ints.fromString(str.fromBins(this.key).join(''));

        this.msgbin = bins.fromString(plaintext);
        this.res = ints.fromString(plaintext);

        // mensajes consola
        console.log(`"${plaintext}":`, this.msgbin.join(''), this.msgbin.join('').length);
        console.log(`"${str.fromBins(this.key).join('')}":`, this.key.join(''), this.key.join('').length);
    }

    encrypt() {
       return this.res.map((it,ix) => {
        return it ^ this.intskey[ix];
       }); 
    }

    generate_key() {
        let res = [], aux = '';
        this.intsMsg.map((it,ix) => {
            aux = '';
            for(let i = 0; i < 8; i++) aux += Math.round(Math.random()).toString();
            res.push(aux);
        });
        if($('#manual').is(':checked') && (!$("#cipherkey").val())) {
            this.key = res;
            $("#cipherkey").html(str.fromBins(this.key));
        }
    }

    render() {
        $(`#res-plaintext`).html(str.fromInts(this.res));
        $(`#res-bin`).html(bins.fromInts(this.res).join(', '));
        $(`#res-hex`).html(hexs.fromInts(this.res).join(', '));
        $(`#res-int`).html(this.res.join(', '));
    }
}