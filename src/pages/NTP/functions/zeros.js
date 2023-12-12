


export function fZeros(degrees, io) {

    var zeros = "";
    var l = String(degrees).replace(/[\-°?]/g, "").length;
    for (var i = 3; i > l; i--) { zeros += "0"; }
    


    switch (io) {
        case "i":

            return String(degrees).replace(/^(-?)(\d{1,3})$/, `$1${zeros}$2°`);



        case "o":

            return String(degrees).replace(/^(-?)(\d{1,3})$/, `$1${zeros}$2`);



    }

}


