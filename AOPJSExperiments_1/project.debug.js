//Main namespaces
var Acme = Acme || {};
Acme.Tools = Acme.Tools || {};
Acme.Tools.HumanResources = Acme.Tools.HumanResources || {};
Acme.Tools.Global = Acme.Tools.Global || {};

//handle browsers that can't handle console.log
if (typeof console === "undefined" || typeof console.log === "undefined" ) {
    console = {};
    console.log = function () {};
}if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}

//some closures to see how they are represented in the object hierarchy, how can they be indentified with potential for advice (AOP)
(function () { console.log('closure 1') })(); //??? how to advise - especially before it is executed?
(function () { console.log('closure 2') })(); //??? how to advise - especially before it is executed?
(function () { console.log('closure 3') })(); //??? how to advise - especially before it is executed?

function aGlobalOne() {
    //some code
}
Acme.Tools.HumanResources.functionOne = function ($) {
    //blah
}();
Acme.Tools.HumanResources.functionTwo = function (argument) {
    //blah
}

//some web service calls
Acme.Tools.HumanResources.WeatherByCity = function (city, country) {
    //example http://api.openweathermap.org/data/2.5/weather?q=London,uk
    var url = "http://api.openweathermap.org/data/2.5/weather?q="+city+","+country;
    console.log("weather rest uri:" + url)

    $.ajax({
        url: url,
        type: 'GET',
        contentType: 'application/json',
        beforeSend: function (xhr) {
            //
        },
        success: function (data, textStatus, xhr) {
            //ok
            console.log("Success: status:" + xhr.status);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("Fail: status:" + xhr.status);
        },
        complete: function () {
            //do something
        }
    });
    console.log("leaving Acme WeatherByCity");
};

Acme.Tools.HumanResources.functionThree = function ($) {
    //blah
    //this wont work - so how to get the function name in this case? var thisFunctionName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
    //console.log('in ' + thisFunctionName);
}();

var firstRun = true;
function BBKAOP_getAllFunctions(object) {
    if (firstRun) {
        objectPath = "this"; //this is hardoded  will need to change perhaps
        firstRun = false;
    }

    var thisFunctionName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
    //console.log('thisFunctionName:' + thisFunctionName);
    var resultArray = [];
    for (var id in object) {
        if (['this.chrome', 'this.external','this.Intl','this.a','$','jQuery'].indexOf(objectPath) > -1)
            continue;
        /*console.log('id:' + id.toString());
        console.log('object:' + object.toString());
        console.log('objectpath:' + objectPath.toString());*/
        try {

            //for the second part we need to eschew anything other than custom objects or we will overwhelm th e browser with deep recursion potentially crashing it
            var toClass = {}.toString;

            if (typeof (object[id]) == "function") {
                var isThisFunction = false;
                try {
                    isThisFunction = object[id].toString().match(/function ([^\(]+)/)[1] == thisFunctionName;
                }
                catch(err){
                    isThisFunction = false;
                }
                //var regex = /\[native code\]/.test(object[id].toSource().toString());
                var regex = /\[native code\]/.test(object[id].toString());
                if (!regex && !isThisFunction) {
                    /*var isThisFunction = object[id].toString().match(/function ([^\(]+)/)[1] == thisFunctionName;
                    console.log('regex' + regex);
                    console.log('isitme:' + (object[id].toString().match(/function ([^\(]+)/)[1] == thisFunctionName));
                    console.log('function:' + object[id].toString().match(/function ([^\(]+)/)[1]);
                    console.log(isThisFunction);*/
                    console.log(object[id].toString());
                    //resultArray.push(id + ": " + object[id].toString());
                }
            }
            // for namespaced functions, we could user recursion here?
            //need to filter out internal stuff though
            if (toClass.call(object[id]) == "[object Object]") {
                objectPath = objectPath + '.' + id;
                BBKAOP_getAllFunctions(eval(objectPath)); //!!!eval!
                objectPath=objectPath.slice(0, objectPath.lastIndexOf('.'));
            }
        }
        catch (err) {
            //console.log(err.message);
            //resultArray.push("WARNING!!  " + id + ": this function is inaccessible");
        }
    }
    return;//resultArray;
}
var a = BBKAOP_getAllFunctions(this);
console.log('finished');
Acme.Tools.HumanResources.functionThree();
//Acme.Tools.HumanResources.WeatherByCity("London","uk");
