import Point from "../utils/point";
import alg from "../utils/ModExpontentes"

export default class DyH_GE {
    constructor(format, data, key) {
        
        // comprobar que G pertenece a la curva 0 <= a,b < p y congruentes 
        var data = JSON.parse(data), key = JSON.parse(key);
        var p = data.p, a = data.a, b = data.b, m = data.m;
        var G = new Point(key.G[0],key.G[1]);

        // VALIDAR ENTRADAS
        this.validarEntradas(a,b,G,p);

        console.log("------ Entradas ------", data, key);
        console.log("------ Salidas  ------");
        
        // CALCULAR PUNTOS
        this.puntos = this.calcularPuntos(a,b,p);
        console.log("Puntos de la curva:", this.puntos);
        // representar graficamente
        this.buildPLot(a,b);

        // CALCULAR CLAVES PUBLICAS
        var CpB = this.keygen(G, key.dB, a, p);
        var CpA = this.keygen(G, key.dA, a, p);
        console.log(`Clave pública de B = ${key.dB}*(${key.G}):`, CpB);
        console.log(`Clave pública de A = ${key.dA}*(${key.G}):`, CpA);
        
        // CALCULAR CLAVE COMPARTIDA
        var CcA = this.keygen(CpB, key.dA, a, p);
        var CcB = this.keygen(CpA, key.dB, a, p);
        console.log("Clave secreta compartida A:", CcA);
        console.log("Clave secreta compartida B:", CcB);

        // CODIFICAR MENSAJE EN FORMATO PUNTO
        var Q = this.codificarMsg(m,p);
        console.log("Mensaje codificado:", Q);

        // CIFRAR MENSAJE
        this.c = {q:Q,cpa:CpA,db:key.dB,a:a,p:p};
        //this.encrypt();
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

    buildPLot(a,b) {
        var xA = [], yA = [];
        this.puntos.map(p => {xA.push(p.x); yA.push(p.y);});
        
        var points = {
            type: 'scatter',
            x: xA,
            y: yA,
            mode: 'markers',
            marker: {
                color: '#28a745',
                line: {
                  color: '#28a745',
                  width: 1,
                },
                symbol: 'circle',
                size: 5
            }
        }
        var xlA = [], ylA = [];
        for(let i = 0; i<10;i++) {
            xlA.push(i);
            ylA.push(Math.sqrt(Math.pow(i,3)+(a*i)+(b)));
            
        }

        /*var line = {
            x: xlA,
            y: ylA,
            type: 'scatter'
          };*/

        var data = [points];
        Plotly.newPlot('chart', data);
    }

    validarEntradas(a,b,G,p) {
        console.log(G)
        var primo = alg.lehmanPeralta(p), vstr = '';
        console.log(`¿p:${p} es primo?`,primo); // comprobar que p es primo
        if(!primo) vstr = " - P no es primo";

        var eliptica = ((4*Math.pow(a,3)+27*Math.pow(b,2))%p != 0);
        console.log(`¿4a³+27b² != 0?`,eliptica);  // validar a,b
        if(!eliptica) vstr += "\n - La curva elíptica es inválida";

        var punto = ((Math.pow(G.y,2))%p == (Math.pow(G.x,3)+a*G.x+b)%p)
        console.log(`¿G es punto de la curva?`,punto);
        if(!punto && primo) vstr += "\n - G no es punto de la cuerva";
        if(vstr != '') alert(vstr);
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
        //$(`#res-bin`).css("background-color", "#e9ecef");
        //$(`#res-hex`).css("background-color", "#e9ecef");
        //$(`#res-int`).css("background-color", "#e9ecef");
        
    }
}