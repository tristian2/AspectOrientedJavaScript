
function one() {
    console.log("in function one");
}
function two() {
    console.log("in function two");
}
function three() {
    console.log("in function three");
}


//list all javacript functions in the page
function getAllMethods(obj) {
    var result = [];
    for (var id in obj) {
        try {
            if (typeof (obj[id]) == "function") {
                result.push(id + ": " + obj[id].toString());
                //debugger;

                obj[id] = (function () {
                var cached_function = obj[id];
                
                return function () {
                    try {
                        console.log("before"+obj[id]+arguments);
                        cached_function.apply(obj[id],arguments);
                    }
                    catch (err) {
                        console.log(err.message);
                    }
                };

            }());
                

        }
    } catch (err) {
        result.push(id + ": tris inaccessible");
    }
}
return result;
}
//debugger;
//console.log(getAllMethods(this).join("\n"));// JavaScript source code
getAllMethods(this);
one();
two();
three();

/*


someFunction = (function () {
    var cached_function = someFunction;
    return function () {
        try {
            cached_function.apply(this.argument);
        }
        catch (err) {
            console.log(err.message);
        }
    };

}());
*/