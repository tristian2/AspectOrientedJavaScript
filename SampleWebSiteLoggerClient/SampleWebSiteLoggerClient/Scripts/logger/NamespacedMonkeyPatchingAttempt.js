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
        console.log('adding:' + (a + b));
        m; //ReferenceError: m is not defined  
        //eval('alert("Hello world)');  //a 'nice' syntax error, unterminated string literal - program completes
        //%*S(&%TUI; //a syntax error - but program doesnt complete
        return result;
    },
    //check to see if the sharepoint publishing page is in edit mode (return a boolean value)
    IsOnEarth: function () {
        return 1;
    }
};


var originalfoo = Corp.Projects.Utilities.Add;
Corp.Projects.Utilities.Add = function () {
    //Do stuff before calling function

    //Call the function as it would have been called normally:
    console.log('MONKEY PATCHED!');
    try {
        console.log('before in try');
        originalfoo.apply(Corp.Projects.Utilities, arguments);
        console.log('after in try');
    }
    //catch(err) {
    catch (err) {
        console.log('err' + err.message);
        console.log('error occurred');
    }
    finally {
        console.log('Monkey finally');
    }
    //Run stuff after, here.
    console.log('Monkey after try catch block ');
}

debugger;
console.log("program complete");

var b = Corp.Projects.Utilities.Add(2, 4);// JavaScript source code
console.log("Source of Monkey patched Namespaced function: " + Corp.Projects.Utilities.Add.toSource());
