//a[[praoch one kinda workks
function foo(a) { alert(a); };
foo.toSource().replace("alert(a)", "alert('function modified - ' + a)").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, "");

console.log(foo.toSource());
console.log(foo.toSource().replace("alert(a)", "alert('function modified - ' + a)").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, "") + '})');
console.log(String(foo));

//.toSource().replace("alert(a)", "alert('function modified - ' + a)").replace(/^function[^{]+{/i,"").replace(/}[^}]*$/i,"")+'})');

console.log(foo.toString().match(/{([\s\S]*)}/)[1]);


//foo = new Function ("a",foo.toSource().replace("alert(a)", "alert('function modified - ' + a)").replace(/^function[^{]+{/i,"").replace(/}[^}]*$/i,"")+'})');
//foo = new Function ("a",String(foo).replace("alert(a)", "alert('function modified - ' + a)").replace(/^function[^{]+{/i,"").replace(/}[^}]*$/i,"")+'})');
foo = new Function("a", "alert('function modified - ' + a)");

foo('p');

///approach one... so now try to incorp my tesdt funtion...

function doit() {
    console.log('in function');
    try {
        var n = 50 / 0;
        throw new UserException('InvalidMonthNo');   //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
        console.log('in try');
    } catch (e) {
        console.log(e.message);
    }
}
doit = new Function(code);

doit();

code


//////////////////





//another approach...
function a() { return 1; }

// redefine
a = (function () {
    var _a = a;
    debugger;
    return function () {
        // You may reuse the original function ...
        // Typical case: Conditionally use old/new behaviour
        var originalResult = _a.apply(this, arguments);
        // ... and modify the logic in any way
        return originalResult + 1;
    };
})();

a();