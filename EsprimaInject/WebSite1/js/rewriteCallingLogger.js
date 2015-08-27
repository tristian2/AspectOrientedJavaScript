//Documentation on using Esprima http://esprima.org/doc/index.html#ast

//todo modularise the code so that we can target specific modules!!
//also modulatrise the sample! use the module pattern http://addyosmani.com/resources/essentialjsdesignpatterns/book/
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
    code += "    var url = \"\/\/logservice.azurewebsites.net\/Logs\";";
    code += "    var currentdate = new Date();";
    code += "    var r = new Object(); \/\/JSON object to store logging data";

    code += "    $.ajax({";
    code += "        url: \'\/\/freegeoip.net\/json\/', \/\/a service to get the clients IP address";
    code += "        type: \'POST\',";
    code += "        dataType: 'jsonp',  \/\/using JSONP for cross domain access";
    code += "        success: function (location) {";
    code += "            r.Date = currentdate;";
    code += "            r.Time = currentdate.getHours() + \":\" + currentdate.getMinutes() + \":\" + currentdate.getSeconds();";
    code += "            r.Type = \"logic\";";
    code += "            r.IP = location.ip;";
    code += "            r.Error = \"oh dear gone pear shaped!\";";
    code += "            jr = JSON.stringify(r);";
    code += "            console.log(jr);";
    code += "            $(\'#DisplayInfoLoader\').html(jr);";
    code += "            $.post(url, r);";
    code += "        },";
    code += "        error: function (xhr, ajaxOptions, thrownError) {";
    code += "            debugger;";
    code += "            console.log(\"error:\" + xhr.responseText + xhr.status);";
    code += "            $(\'#error\').html(xhr.responseText);";
    code += "            $(\'#DisplayInfoLoader\').fadeOut(3000);";
    code += "         }";
    code += "    });";




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
        syntax = window.esprima.parse(code, { raw: true, tokens: true, range: true, comment: true });
        syntax = window.escodegen.attachComments(syntax, syntax.comments, syntax.tokens);
        //advice to the entire code
        syntax.body.unshift(esprima.parse('start()'))  //Parsing and modifying Javascript code with Esprima and Escodegen http://www.mattzeunert.com/2013/12/30/parsing-and-modifying-Javascript-code-with-esprima-and-escodegen.html
        syntax.body.push(esprima.parse('end()'))

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
    //http://stackoverflow.com/questions/2549320/looping-through-an-object-tree-recursively
    function traverse(obj) {
        var ids = [];
        for (var prop in obj) {

            //console.log(typeof obj[prop] + '    ' + prop);
            if (typeof obj[prop] == "object" && obj[prop]) {
                
                console.log(obj.type);
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

/*jslint sloppy:true browser:true */
/*global sourceRewrite:true */
window.onload = function () {
    sourceRewrite();
};
