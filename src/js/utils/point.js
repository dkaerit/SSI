import alg from "../utils/ModExpontentes"

Array.range = (n) => Array.apply(null,Array(n)).map((_,i) => i);
Array.prototype.chunk = function(n) {return Array.range(Math.ceil(this.length/n)).map((_,i) => this.slice(i*n,i*n+n));}

var mod = function (n, m) {
    var remain = n%m;
    while(remain < 0) remain = remain+m;
    return Math.floor(remain%m);
};

export default class Point {
    constructor(x,y) {
        // coordenadas
        this.x = x;
        this.y = y;
    }

    sumar(other,a,p) {
        console.log(`%c ---- Sumar P+Q: (${this.x},${this.y})+(${other.x},${other.y})`, 'color: #bada55');
        var x3,y3;
        if((this.x == other.x) && (this.y == other.y)) {             
            console.log("%c       P == Q", 'color: #bada55');        // IGUALES
            var num = (3*Math.pow(this.x,2)+a)%p;                    // 3*(x1²) + a
            var den = alg.modInverse(2*other.y, p);                  // ((2*y2)^-1) mod p
            console.log(`%c       num =3*${this.x}^${2}+${a} mod ${p} = ${num}`, 'color: #bada55');
            console.log(`%c       den = (2*${other.y})^-1 mod ${p} = ${den}`, 'color: #bada55');
        } else {   
            console.log("%c       P != Q", 'color: #bada55');        // DISTINTOS
            var num = mod(other.y-this.y,p)                          // (y2-y1)  
            var den = alg.modInverse(other.x-this.x, p);             // ((x2-x1)^-1) mod p
            console.log(`%c       num =${other.y}-${this.y} mod ${p} = ${num}`, 'color: #bada55');
            console.log(`%c       den =(${other.x}-${this.x})^-1 mod ${p} = ${den}`, 'color: #bada55');
        } 

        var lambda = ((num*den)%p); 
        console.log(`%c       λ = ${num}*${den} mod ${p} = ${lambda}`, 'color: #bada55');

        x3 = mod(Math.pow(lambda,2)-this.x-other.x,p)        // λ² - x1 - x2
        y3 = mod(lambda*(this.x-x3)-this.y,p)                // λ* (x1 - x3) -y1
        console.log(`%c       P+Q = (${x3},${y3})`, 'color: #bada55');

        return new Point(x3, y3);
    }

    multi(v,a,p) {
        if(v == 0) return undefined;
        switch(v.constructor.name) {
            case 'Number': { // ESCALAR
                console.log(`%c -- Multiplicar ${v}*(${this.x},${this.y})`, 'color: #C2863E');
                var parejas = Array(v).fill(this).chunk(2); // [[P,P],[P,P],[P]]
                while(parejas[0].length > 1) // mientras no sea  [[P]]
                    parejas = parejas.map(tupla => this.multi(tupla,a,p)).chunk(2); //[[P+Q,S+R]...]
                return parejas[0][0]; // [[P]] 
            } 

            case 'Array': { // TUPLA
                if(v.length == 1) return v[0];         // [P] -> P
                else return v[0].sumar(v[1],a,p); // [P,Q] -> P+Q
            } 
        }
        
    }
}