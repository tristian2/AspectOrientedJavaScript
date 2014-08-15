//monkey patch all functions //now list all functions in a page for later
//Main namespaces - avoid "polluting" the global namespace
var Corp = Corp || {};
Corp.Projects = Corp.Projects || {};
Corp.Projects.UserProfiles = Corp.Projects.FinanceProject || {};
Corp.Projects.UserProfileViewer = Corp.Projects.HRProject || {};


function a() {
    return 1;
}

function b() {
    return false;
}

function foo(a, b) {
    console.log('adding:' + (a + b));
    //m; //ReferenceError: m is not defined  
    eval('alert("Hello world)');  //a 'nice' syntax error, unterminated string literal - program completes
    //%*S(&%TUI; //a syntax error - but program doesnt complete
}

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
                    resultArray.push(id + ": " + object[id].toSource());

                    var originalfoo = object[id];
                    object[id] = function () {
                        //Do stuff before calling function

                        //Call the function as it would have been called normally:
                        console.log('MONKEY PATCHED!');
                        try {
                            console.log('before in try');
                            originalfoo.apply(this, arguments);
                            console.log('after in try');
                        }
                        //catch(err) {
                        catch (err) {
                            console.log('err' + err.message);
                            console.log('error occurred');
                        }
                        //Run stuff after, here.
                        console.log('after');
                    }
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

console.log(BBKAOP_getAllFunctions(this).join("\n\n***************************************************************************************************\n\n"));
foo(9, 2);

//let's take a look at new foo!
console.log(foo.toSource());
console.log("program complete");
