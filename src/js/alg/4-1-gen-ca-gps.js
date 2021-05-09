var taps = [
    /* 1*/[1,5], /* 2*/[2,6],  /* 3*/[3,7],  /* 4*/[4,8], 
    /* 5*/[0,8], /* 6*/[1,9],  /* 7*/[0,7],  /* 8*/[1,8], 
    /* 9*/[2,9], /*10*/[1,2],  /*11*/[2,3],  /*12*/[4,5], 
    /*13*/[5,6], /*14*/[6,7],  /*15*/[7,8],  /*16*/[8,9], 
    /*17*/[0,3], /*18*/[1,4],  /*19*/[2,5],  /*20*/[3,6], 
    /*21*/[4,7], /*22*/[5,8],  /*23*/[0,2],  /*24*/[3,5], 
    /*25*/[4,6], /*26*/[5,7],  /*27*/[6,8],  /*28*/[7,9], 
    /*29*/[0,5], /*30*/[1,6],  /*31*/[2,7],  /*32*/[3,8], 
];

export default class GenCA {
    constructor(format, plaintext, data) {
        var data = JSON.parse(data);
        var sat = taps[data.satelite-1];  // satélite para LFSR2 
        
        var R1 = [1,1,1,1,1,1,1,1,1,1];
        var R2 = [1,1,1,1,1,1,1,1,1,1];

        var cs = [], c1, c2;
        for(let i=0; i<data.longitud; ++i) {
            if(i == 0) console.log(R1.join(""),R2.join(""));
            
            // realimentación
            c1 = this.LFSR(R1, [2,9],         9);
            c2 = this.LFSR(R2, [1,2,5,7,8,9], sat);
            
            // bit de secuencia cifrante
            cs.push(c1^c2); 
            console.log(R1.join(""),R2.join(""), cs[i]);
            
            
        }
        console.log("C/A code:", cs.reverse().join(""));
    }

    LFSR(R,fb,cif) { // [1^1^1..]
        let feed = fb.map(pos => R[pos]).reduce((a,b) => (a^b), 0);
        let c;

        // bits pre xor [R[1]^R[5]]
        if(Array.isArray(cif)) c = cif.map(pos => R[pos]).reduce((a,b) => (a^b), 0);
        else                   c = R[R.length-1];
        
        // realimentación
        R.unshift(feed); R.pop(); 
        
        return c;
    }

    encrypt() {
        return [];
    }

    decrypt() {
        return [];
    }

    render() {

    }
}