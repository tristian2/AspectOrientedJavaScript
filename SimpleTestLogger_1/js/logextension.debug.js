//list all javacript functions in the page
function getAllMethods(obj) {
    var result = [];
    for (var id in obj) {
        try {
            if (typeof (obj[id]) == "function") {
                result.push(id + ": " + obj[id].toString());
                //debugger;

                /*var old_someFunction = obj[id];
                obj[id] = function () {
                    //alert('Hello');
                    //old_someFunction();
                    old_someFunction.apply(this, arguments);
                    //alert('Goodbye');
                }*/

                    //obj[id] = (function () {
                    //var cached_function = obj[id];
                    //debugger;
                    return function () {
                        try {
                            //cached_function.apply(obj[id],arguments);
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
console.log(getAllMethods(this).join("\n"));// JavaScript source code

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