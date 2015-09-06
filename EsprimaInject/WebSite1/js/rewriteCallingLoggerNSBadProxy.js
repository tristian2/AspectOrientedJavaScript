//Documentation on using Esprima http://esprima.org/doc/index.html#ast
//todo modularise the code so that we can target specific modules!!
//also modulatrise the sample! use the module pattern http://addyosmani.com/resources/essentialjsdesignpatterns/book/
//now cutting over to namespacing
//Main namespaces
var Acme = Acme || {};
Acme.Tools = Acme.Tools || {};
Acme.Tools.HumanResources = Acme.Tools.HumanResources || {};


Acme.Tools.HumanResources.sourceRewrite = function () {
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
    code = "function ConnectionException(message) {";
    code += "    this.message = message;";
    code += "    this.name = \'ConnectionException\';";
    code += "}";
    code += "function WeatherByCity(city, country) {";
    code += "   var url = \"\/\/brokenproxy.azurewebsites.net/Proxy.aspx?u=http:\/\/api.openweathermap.org\/data\/2.5\/weather?q=\" + city + \",\" + country;";
    code += "   console.log(\"weather rest uri:\" + url);";
    code += "    console.log(\'in function\');";
    code += "    try {";
    code += "       console.log(\'in try\');";
    code += "       $.ajax({";
    code += "       url: url,";
    code += "       type: \'GET\',";
    code += "       beforeSend: function (xhr) {";
    code += "       },";
    code += "       success: function (data, textStatus, xhr) {";
    code += "           $(\"#icon\").attr(\"src\", \"\/\/openweathermap.org\/img\/w\/\" + data.weather[0].icon + \".png\");";
    code += "           console.log(\"Success: status:\" + xhr.status);";
    code += "       },";
    code += "       error: function (xhr, ajaxOptions, thrownError) {";
    //code += "           console.log(\"Fail: status:\" + xhr.status);";
    code += "           $(\"#icon\").attr(\"src\", \"\/\/c1.staticflickr.com\/1\/294\/18789417264_9d8ae67572_b.jpg\");";
    code += "           throw new ConnectionException(\'Weather service not reached\');";   //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
    code += "       },";
    code += "       complete: function () {";
    //code += "           console.log(\"Completed ajax call\" + xhr.status);";
    code += "           console.log(\"Completed ajax call\");";
    code += "       }";
    code += "    });"; 
    code += "    } catch (e) {";
    code += "        console.log(e.message);";
    code += "    }";
    code += "}";
    code += "function before(message) {";
    code += "    console.log(\'before advice\');";
    code += "    var url = \"\/\/logservice.azurewebsites.net\/Logs\";";
    code += "    var currentdate = new Date();";
    code += "    var r = new Object(); ";

    code += "    $.ajax({";
    code += "        url: \'\/\/freegeoip.net\/json\/', ";    
    code += "        type: \'POST\',";
    code += "        dataType: 'jsonp', ";
    code += "        success: function (location) {";
    code += "            r.Date = currentdate;";
    code += "            r.Time = currentdate.getHours() + \":\" + currentdate.getMinutes() + \":\" + currentdate.getSeconds();";
    code += "            r.Type = \"logic\";";
    code += "            r.IP = location.ip;";
    code += "            r.Error = message;";
    code += "            var jr = JSON.stringify(r);";
    code += "            console.log(jr);";
    code += "            $(\'#DisplayInfoLoader\').html(jr);";
    code += "            $.post(url, r);";
    code += "        },";
    code += "        error: function (xhr, ajaxOptions, thrownError) {";
    code += "            console.log(\"error:\" + xhr.responseText + xhr.status);";
    code += "            $(\'#error\').html(xhr.responseText);";
    code += "            $(\'#DisplayInfoLoader\').fadeOut(3000);";
    code += "         }";
    code += "    });";




    code += "}";
    code += "function after() {";
    code += "    console.log(\'after advice\');";
    code += "}";
    code += "WeatherByCity(\"London\", \"uk\");";
    
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
        syntax.body.unshift(esprima.parse('before()'))  //Parsing and modifying Javascript code with Esprima and Escodegen http://www.mattzeunert.com/2013/12/30/parsing-and-modifying-Javascript-code-with-esprima-and-escodegen.html
        syntax.body.push(esprima.parse('after()'))

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
                
                //console.log(obj.type);
                if (obj.type === 'CatchClause') {  //worked out using the parse tree from http://esprima.org/demo/parse.html and the resultamt AST
                    //debugger;
                    //now inject the code 
                    obj.body.body.unshift(esprima.parse('before(e.message);'))
                    obj.body.body.push(esprima.parse('after();'))
                }

                /*if (prop.type == 'CatchClause') {
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
    Acme.Tools.HumanResources.sourceRewrite();
};
