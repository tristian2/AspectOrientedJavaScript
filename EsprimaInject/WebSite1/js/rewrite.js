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
    //code += "        var n = 50/0;";
    code += "        throw new UserException(\'InvalidMonthNo\');";
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
        syntax = window.esprima.parse(code, { raw: true, tokens: true, range: true, comment: true });
        syntax = window.escodegen.attachComments(syntax, syntax.comments, syntax.tokens);
        //advice to the entire code
        //syntax.body.unshift(esprima.parse('start()'))
        //syntax.body.push(esprima.parse('end()'))

        //code = window.escodegen.generate(syntax, option);
        //console.log(code);
        traverse(syntax);
        code = window.escodegen.generate(syntax, option);
        console.log(code);
        eval(code);
    } catch (e) {
        console.log(e.toString());
    }


    //now recursively traverse JSON structure travesral code...
    function traverse(obj) {
        var ids = [];
        for (var prop in obj) {

            //console.log(typeof obj[prop] + '    ' + prop);
            if (typeof obj[prop] == "object" && obj[prop]) {
                
                console.log(obj.type);
                if (obj.type === 'CatchClause') {
                    //debugger;
                    //now inject the code 
                    obj.body.body.unshift(esprima.parse('start()'))
                    obj.body.body.push(esprima.parse('end()'))
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

/*jslint sloppy:true browser:true */
/*global sourceRewrite:true */
window.onload = function () {
    sourceRewrite();
};
