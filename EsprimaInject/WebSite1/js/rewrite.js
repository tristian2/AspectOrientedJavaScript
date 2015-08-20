//Documentation on using Esprima http://esprima.org/doc/index.html#ast

//todo modularise the code so that we can target specific modules!!
//also modulatrise the sample! use the module pattern http://addyosmani.com/resources/essentialjsdesignpatterns/book/


function start() {
    console.log('before advice');
}
function end() {
    console.log('after advice');
}
//function doit() {
var doit = function () {
    console.log('in function');
    try {
        var n = 50 / 0;
        throw new UserException('InvalidMonthNo');   //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
        console.log('in try');
    } catch (e) {
        console.log(e.message);
    }
};

Function.prototype.call = function () {
    var args = Array.prototype.slice.apply(arguments, [1]);
    return this.apply(arguments[0], args);
};



function UserException(message) {
    this.message = message;
    this.name = 'UserException';
}
    function sourceRewrite() {
    'use strict';

    var code, syntax, indent, quotes, option;
    /*function doit() {  
        console.log('in function');
        try {
            console.log('in try');
        } catch (e) {
            console.log(e);
        }
    }*/
    code = "function UserException(message) {";
    code += "this.message = message;";
    code += "    this.name = \'UserException\';";
    code += "}";
    code += "function doit() {";
    code += "    console.log(\'in function\');";
    code += "    try {";
    code += "        var n = 50/0;";
    code += "        throw new UserException(\'InvalidMonthNo\');";   //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
    code += "        console.log(\'in try\');";
    code += "    } catch (e) {";
    code += "        console.log(e);";
    code += "    }";
    code += "}";
    code += "function start() {";
    code += "    console.log(\'before advice\');";
    code += "}";
    code += "function end() {";
    code += "    console.log(\'after advice\');";
    code += "}";
    code += "doit();";
    
    indent = '\t';
    quotes = 'auto';

    option = {
        comment: true,
        format: {
            indent: {
                style: indent
            },
            quotes: quotes
        }
    };

    try {
        //syntax = window.esprima.parse(code, { raw: true, tokens: true, range: true, comment: true });
        
        //syntax = window.esprima.parse(String(window.sourceRewrite), { raw: true, tokens: true, range: true, comment: true });   //get the source of the functions to be decorated into a string
        syntax = window.esprima.parse(String(window.doit), { raw: true, tokens: true, range: true, comment: true });   //get the source of the functions to be decorated into a string
        syntax = window.escodegen.attachComments(syntax, syntax.comments, syntax.tokens);
        //advice to the entire code
       // syntax.body.unshift(esprima.parse('start()'))  //Parsing and modifying Javascript code with Esprima and Escodegen http://www.mattzeunert.com/2013/12/30/parsing-and-modifying-Javascript-code-with-esprima-and-escodegen.html
        //syntax.body.push(esprima.parse('end()'))

        //code = window.escodegen.generate(syntax, option);
        //console.log(code);
        traverse(syntax);
        code = window.escodegen.generate(syntax, option);
        //console.log(code);
        eval(code);
        
                
        var doit = new Function(code);

        

        throw new UserException('TestExceptionException');
    } catch (e) {
        console.log(e.message.toString());
    }


    //now recursively traverse JSON structure travesral code...
    //http://stackoverflow.com/questions/2549320/looping-through-an-object-tree-recursively
    function traverse(obj) {
        var ids = [];
        for (var prop in obj) {

            //console.log(typeof obj[prop] + '    ' + prop);
            if (typeof obj[prop] == "object" && obj[prop]) {
                
                //console.log(obj.type);
                if (obj.type === 'CatchClause') {  //worked out using the parse tree from http://esprima.org/demo/parse.html and the resultamt AST
                    //debugger;
                    //now inject the code 
                    obj.body.body.unshift(esprima.parse('start();'))
                    obj.body.body.push(esprima.parse('end();'))
                }

          /*      if (prop.type == 'CatchClause') {
                    debugger;
                    ids = obj[prop].map(function (elem) {
                        return elem.id;
                    })
                }
                ids = ids.concat(traverse(obj[prop]));*/
                ids = ids.concat(traverse(obj[prop]));
            }
        }
        //return ids;
    }

    //var ids = traverse(syntax);
//    traverse(syntax);
    //console.log('ids', ids);


}
    sourceRewrite();
    doit();
/*jslint sloppy:true browser:true */
/*global sourceRewrite:true */
/*window.onload = function () {
    sourceRewrite();
};*/
