import { DyH } from '../utils/diffie-Hellman.js';
import alg from '../utils/ModExpontentes'

export default class DyH_G {
    constructor(format, elcomuns, secretos) {
        this.format = format;
        this.secretos = JSON.parse(secretos);
        this.elcomuns = JSON.parse(elcomuns);

        // (secreto_A, secreto_B, alfa, primo) 
        let res = DyH(this.secretos.k, this.secretos.x,  this.elcomuns.a, this.elcomuns.p);
        this.K   = res.K;
        this.y_A = res.A;
        this.y_B = res.B;

        this.C = this.encrypt();
        this.M = this.decrypt();
    }

    encrypt() {
        return ((this.K *  this.elcomuns.m) % this.elcomuns.p);
    }

    decrypt() {
        this.invK = alg.euclidExt(this.K,this.elcomuns.p).inverso;
        return ((this.invK * this.K *  this.elcomuns.m) % this.elcomuns.p);
    }

    render() {
        $(`#res-plaintext`).html(JSON.stringify({
            "yA": this.y_A,
            "yB": this.y_B,
            "K": this.K,
            "C": this.C,
            "K⁻¹": this.invK,
            "M": this.M,
        }).replace(/[\r,]/g, ",  "));
    }
}