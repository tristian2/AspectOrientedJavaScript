//Main namespaces
var Corp = Corp || {};
Corp.Projects = Corp.Projects || {};
Corp.Projects.FinanceProject = Corp.Projects.FinanceProject || {};
Corp.Projects.HRProject = Corp.Projects.HRProject || {};
Corp.Projects.Utilities = Corp.Projects.Utilities || {};

/* test CI*/
Corp.Projects.Utilities = {
    Add: function (a, b) {        // Create the return object
        var result = a + b;
        return result;
    },
    //check to see if the sharepoint publishing page is in edit mode (return a boolean value)
    IsOnEarth: function () {
        return 1;
    }
};

function a() {
    console.log('in a...');
}

this.a();
//this.Add(1+2);
console.log("corporate addition function:" + Corp.Projects.Utilities.Add(2, 3));
//console.log("corporate addition function:" + Add(2,3));



///this works
function foo(a, b) {
    console.log('adding:' + (a + b));
    //m; //ReferenceError: m is not defined  
    eval('alert("Hello world)');  //a 'nice' syntax error, unterminated string literal - program completes
    //%*S(&%TUI; //a syntax error - but program doesnt complete
}

//foo(9,2);


var originalfoo = this.foo;
this.foo = function () {
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

debugger;
foo(9, 2);

console.log("program complete");




///////next monkypoatch a namespaced function

