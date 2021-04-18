var ints = {
    fromString(msg) {
        return msg.split('').map((char) => {
            return char.charCodeAt(0);
        });
    },

    fromHexs(arr_hex) {
        if(!Array.isArray(arr_hex)) return parseInt(arr_hex,16);
        else {
            return arr_hex.map((byte) => {
                if(typeof byte == 'string') return parseInt(byte,16);
                else return byte;                
            });
        }
    },

    fromBins(arr_bin) {
        if(!Array.isArray(arr_bin)) return parseInt(arr_bin,2);
        else {
            return arr_bin.map((byte) => {
                return parseInt(byte,2);
            });
        }
    }
}

var hexs = {
    fromInts(arr_int, mode) {
        if(!Array.isArray(arr_int)) {
            if(mode == "number") {
                if(arr_int.toString(16).length < 2) return Number(`0x0${arr_int.toString(16)}`);
                else                                return Number(`0x${arr_int.toString(16)}`);
            } else {
                console.log("entró aquí",arr_int,mode,`${arr_int.toString(16)}`);
                if(arr_int.toString(16).length < 2) return (`0${arr_int.toString(16)}`);
                else                                return (`${arr_int.toString(16)}`);
            }
            
        } 
        else {
            return arr_int.map((byte) => {
                if(byte.toString(16).length < 2) return "0"+byte.toString(16);
                else                             return byte.toString(16);
            });
        }

    },

    fromString(msg)   { return this.fromInts(ints.fromString(msg));   },
    fromBins(arr_bin) { return this.fromInts(ints.fromBins(arr_bin)); }
}


var bins = {
    fromInts(arr_int) {
        if(!Array.isArray(arr_int)) return "0".repeat(8 - arr_int.toString(2).length) + arr_int.toString(2);
        else {
            return arr_int.map((byte) => {
                return "0".repeat(8 - byte.toString(2).length) + byte.toString(2);
            });
        } 
    },

    fromString(msg)   { return this.fromInts(ints.fromString(msg));   },
    fromHexs(arr_hex) { return this.fromInts(ints.fromHexs(arr_hex)); }
}

var str  ={
    fromInts(arr_int) {
        if(!Array.isArray(arr_int)) return String.fromCharCode(arr_int);
        else {
            return arr_int.map((byte,i) => {
                return String.fromCharCode(byte);
            });
        }     
    },

    fromHexs(arr_hex) { return this.fromInts(ints.fromHexs(arr_hex)); },
    fromBins(arr_bin) { return this.fromInts(ints.fromBins(arr_bin)); }
}

export { ints, hexs, bins, str }