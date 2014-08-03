//list all javacript functions in the page
function getAllMethods(obj) {
    var result = [];
    for (var id in obj) {
        try {
            if (typeof (obj[id]) == "function") {
                result.push(id + ": " + obj[id].toString());



            }
        } catch (err) {
            result.push(id + ": tris inaccessible");
        }
    }
    return result;
}
console.log(getAllMethods(this).join("\n"));// JavaScript source code




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
