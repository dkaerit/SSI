import srand from '@f/srand';

var mod = function (n, m) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
};

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

var alg = {
    expRapida(base,exp,m) {
        var x = 1;
        var y = base % m;
        while(exp > 0 && y > 1) {
            if(exp&1) { // impar
                x = (x*y) % m;
                exp -= 1;
            } else {   // par
                y = (y*y) % m;
                exp /= 2
            }
        }
        return x;
    },
    
    euclidExt(a,b) { 
        if(Math.min(a,b) == 0) return {"inverso":1, "mcd":0};
        let x = [null, Math.max(a,b), Math.min(a,b)]; 
        let z = [0, 1]; 

        for(var i = 2; (x[i-1]%x[i]) != 0; i++) {
            x.push(x[i-1]%x[i]); 
            mod(z.push((-Math.trunc(x[i-1]/x[i]) * z[i-1] + z[i-2]),x[1])); 
            if(i > 1000) break;
        }    

        return {"inverso":z[z.length-2], "mcd":x[x.length-1]};
    },

    choose(choices) {
        var index = Math.floor(Math.random() * choices.length);
        return choices[index];
    },

    lehmanPeralta(p) {
        var a, result, primo = true;
        var enteros = [...Array(p).keys()];

        while(primo && (enteros.length > 0)) {
            a = this.choose(enteros);
            enteros.remove(a);
            result = this.expRapida(a, (p-1)/2, p)
            if((result != 1) && (result != p-1)) primo = false;
        }
            
        return primo;
    }
}

export default alg;