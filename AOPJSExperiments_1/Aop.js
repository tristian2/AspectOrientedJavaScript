
function BBKAOP_getAllFunctions(object) {
    var thisFunctionName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
    var resultArray = [];
    for (var id in object) {
        try {
            if (typeof (object[id]) == "function") {
                var isThisFunction = object[id].toString().match(/function ([^\(]+)/)[1] == thisFunctionName;
                var regex = /\[native code\]/.test(object[id].toSource().toString());
                if (!regex && !isThisFunction) {
                    var isThisFunction = object[id].toString().match(/function ([^\(]+)/)[1] == thisFunctionName;
                    console.log('regex' + regex);
                    console.log('isitme:' + (object[id].toString().match(/function ([^\(]+)/)[1] == thisFunctionName));
                    console.log('function:' + object[id].toString().match(/function ([^\(]+)/)[1]);
                    console.log(isThisFunction);
                    resultArray.push(id + ": " + object[id].toSource());
                }
            }
        }
        catch (err) {
            console.log(err.message);
            resultArray.push("WARNING!!  " + id + ": this function is inaccessible");
        }
    }
    return resultArray;
}
var a = BBKAOP_getAllFunctions(this);
console.log(BBKAOP_getAllFunctions(this).join("\n\n***************************************************************************************************\n\n"));
