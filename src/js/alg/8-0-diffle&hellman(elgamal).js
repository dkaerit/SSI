import { ints, hexs, bins, str } from '../utils/transforms';
import alg from '../utils/ModExpontentes'

export default class DyH_G {
    constructor(format, elcomuns, secretos) {
        
        this.secretos = JSON.parse(secretos);
        this.elcomuns = JSON.parse(elcomuns);

        this.m = this.elcomuns.m; // mensaje (un entero)
        this.a = this.elcomuns.a; // alfa(a)
        this.p = this.elcomuns.p; // primo(p)

        this.K = this.DyH(this.secretos.k, this.secretos.x); // (secreto_A, secreto_B) 
        this.C = this.encrypt();
        this.M = this.decrypt();
    }

    encrypt() {
        return ((this.K * this.m) % this.p);
    }

    decrypt() {
        this.invK = alg.euclidExt(this.K,this.p);
        return ((this.invK * this.K * this.m) % this.p);
    }

    DyH(x_A, x_B) {
        // 1) Calcular y_A e y_B
        this.y_A = alg.expRapida(this.a, x_A, this.p);
        this.y_B = alg.expRapida(this.a, x_B, this.p);  

        // 2) Generar clave compartida K
        let K1 = alg.expRapida(this.y_B, x_A, this.p);
        let K2 = alg.expRapida(this.y_A, x_B, this.p); 
    
        if(K1 != K2) alert("Error las claves K no son iguales");
        return K1; 
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