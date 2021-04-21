Number.prototype.mod = function(b) {
    // Calculate
    return ((this % b) + b) % b;
}


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
    
    euclidExt(num1,num2) { 
        let x = [null, Math.max(num1,num2), Math.min(num1,num2)]; 
        let z = [0, 1]; 

        for(var i = 2; x[i] != 0; i++) {
            x.push(x[i-1] % x[i]); 
            z.push((-Math.trunc(x[i-1]/x[i]) * z[i-1] + z[i-2]).mod(x[1])); 
        }    

        return z[i-2];
    }
}

export default alg;