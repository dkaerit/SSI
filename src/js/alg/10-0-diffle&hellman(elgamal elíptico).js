import Point from "../utils/point";
import alg from "../utils/ModExpontentes"

export default class DyH_GE {
    constructor(format, data, key) {
        var data = JSON.parse(data), key = JSON.parse(key);
        var p = data.p, a = data.a, b = data.b, m = data.m;
        var G = new Point(key.G[0],key.G[1]);

        console.log("------ Entradas ------", data, key);
        console.log("------ Salidas  ------");
        
        // CALCULAR PUNTOS
        this.puntos = this.calcularPuntos(a,b,p);
        console.log("Puntos de la curva:", this.puntos);

        // CALCULAR CLAVES PUBLICAS
        var CpB = this.keygen(G, key.dB, a, p);
        var CpA = this.keygen(G, key.dA, a, p);
        console.log(`Clave pública de B = ${key.dB}*(${key.G}):`, CpB);
        console.log(`Clave pública de A = ${key.dA}*(${key.G}):`, CpA);
        
        // CALCULAR CLAVE COMPARTIDA
        var CcA = this.keygen(CpB, key.dA, a, p);
        var CcB = this.keygen(CpA, key.dB, a, p);
        console.log("Clave secreta compartida A:", CcA)
        console.log("Clave secreta compartida B:", CcB)

        // CODIFICAR MENSAJE EN FORMATO PUNTO
        var Q = this.codificarMsg(m,p);
        console.log("Mensaje codificado:", Q);

        // CIFRAR MENSAJE
        this.c = {q:Q,cpa:CpA,db:key.dB,a:a,p:p};
        this.encrypt();
    }

    calcularPuntos(a,b,p) { //x³+(a)x+(b) mod (p)
        var ey = [], ex = [], puntos = [];
        // generar valores de x y el residuo cuadrático
        for(let i = 0; i < p; ++i) {                   // i ≡ x,y
            ex.push([i, (Math.pow(i,3)+(a*i)+(b))%p]); // x, x³+ax+b(mod p)
            ey.push([Math.pow(i,2)%p, i]);             // y²(mod p), y
        }

        // Determinar puntos coincidentes
        ey.map(py => {
            ex.map(px => { 
                if(px[1]==py[0]) puntos.push(new Point(px[0],py[1]));
            })
        });
        return puntos.sort((a,b) => (a.x==b.x)?(a.y-b.y):(a.x-b.x));
    }

    keygen(P, key, a, p) {return P.multi(key, a, p)}
    
    codificarMsg(m,P) {
        const M = Math.pow(2,m.toString(2).length);
        const h = P/M|0;  
        console.log("M:", M);
        console.log(`h:`,h,`< ${P}/${M}`);

        var Q; 
        for(let j = 0;  Q == undefined; j++) 
            this.puntos.map(p => {
                if((!Q) && (m*h+j == p.x)) Q = p;
            });       

        return Q;
    }

    encrypt() {
        var Q = this.c.q, CpA = this.c.cpa, dB = this.c.db, a = this.c.a, p = this.c.p;
        this.sum = Q.sumar(this.keygen(CpA, dB, a, p),a,p);
        console.log("Mensaje cifrado:", {mc: this.sum, publicKey:CpA});
        return this.sum;
    }

    decrypt() {}

    render() {
        $(`#res-plaintext`).html(`(${this.sum.x},${this.sum.y})`);
        $(`#res-bin`).css("background-color", "#e9ecef");
        $(`#res-hex`).css("background-color", "#e9ecef");
        $(`#res-int`).css("background-color", "#e9ecef");
        
    }
}