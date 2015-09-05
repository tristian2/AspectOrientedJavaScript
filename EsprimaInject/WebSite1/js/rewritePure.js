;//Documentation on using Esprima http://esprima.org/doc/index.html#ast
//todo modularise the code so that we can target specific modules!!
//also modulatrise the sample! use the module pattern http://addyosmani.com/resources/essentialjsdesignpatterns/book/
//now cutting over to namespacing
//Main namespaces
var Acme = Acme || {};
Acme.Tools = Acme.Tools || {};
Acme.Tools.HumanResources = Acme.Tools.HumanResources || {};

Acme.Tools.HumanResources.ConnectionException = function (message) {
    this.message = message;
    this.name = 'ConnectionException';
}
Acme.Tools.HumanResources.WeatherByCity  = function (city, country) {
   var url = "//brokenproxy.azurewebsites.net/Proxy.aspx?u=http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country;
   console.log("weather rest uri:" + url);
    console.log('in function');
    try {
       console.log('in try');
       $.ajax({
       url: url,
       type: 'GET',
       beforeSend: function (xhr) {
       },
       success: function (data, textStatus, xhr) {
           $("#icon").attr("src", "//openweathermap.org/img/w/" + data.weather[0].icon + ".png");
           console.log("Success: status:" + xhr.status);
       },
       error: function (xhr, ajaxOptions, thrownError) {
           console.log("Fail: status:" + xhr.status);
           throw new ConnectionException('Weather service not reached');   //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
       },
       complete: function () {
           console.log("Completed ajax call" + xhr.status);
           console.log("Completed ajax call");
       }
    });
    } catch (e) {
        console.log(e.message);
    }
}
Acme.Tools.HumanResources.Before = function (message) {
    debugger;
    console.log('before advice');
    var url = "//logservice.azurewebsites.net/Logs";
    var currentdate = new Date();
    var r = new Object(); 

    $.ajax({
        url: '//freegeoip.net/json/', 
        type: 'POST',
        dataType: 'jsonp',
        success: function (location) {
            r.Date = currentdate;
            r.Time = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
            r.Type = "logic";
            r.IP = location.ip;
            r.Error = message;
            var jr = JSON.stringify(r);
            console.log(jr);
            $('#DisplayInfoLoader').html(jr);
            $.post(url, r);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("error:" + xhr.responseText + xhr.status);
            $('#error').html(xhr.responseText);
            $('#DisplayInfoLoader').fadeOut(3000);
         }
    });
}
Acme.Tools.HumanResources.After =  function () {
    console.log('after advice');
}


Acme.Tools.HumanResources.SourceRewrite = function () {
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
        //syntax = window.esprima.parse(eval('Acme.Tools.HumanResources'), { raw: true, tokens: true, range: true, comment: true });
        //syntax = window.esprima.parse(JSON.stringify(Acme.Tools.HumanResources), { raw: true, tokens: true, range: true, comment: true });
        syntax = window.esprima.parse(Acme.Tools.HumanResources.toSource(), { raw: true, tokens: true, range: true, comment: true });
        syntax = window.escodegen.attachComments(syntax, syntax.comments, syntax.tokens);
        //advice to the entire code
        //syntax.body.unshift(esprima.parse('Acme.Tools.HumanResources.Before()'))  //Parsing and modifying Javascript code with Esprima and Escodegen http://www.mattzeunert.com/2013/12/30/parsing-and-modifying-Javascript-code-with-esprima-and-escodegen.html
        //syntax.body.push(esprima.parse('Acme.Tools.HumanResources.After()'))

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
                    obj.body.body.unshift(esprima.parse('Acme.Tools.HumanResources.Before(message);'))
                    obj.body.body.push(esprima.parse('Acme.Tools.HumanResources.After();'))
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
    Acme.Tools.HumanResources.SourceRewrite();
    Acme.Tools.HumanResources.WeatherByCity("London", "uk");
};
