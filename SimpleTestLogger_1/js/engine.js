/* tristian obrien dec 2013 IWT coursework 1
 * main javascript for the movies solution
 */

/*global variables*/
var globalQuery = "";  //the query that is built from the various controls available to all methods, not the best but it works
//var error=""; perhaps use later for say logging


//get xml method
function getXML(xmlUrl) {
    var xhr = $.ajax({
        url: xmlUrl,
        datatype: "xml",
        contentType: "application/xml",
        async: false,
        success: function (response) {
        }
    });
    return xhr.responseXML;
}

//get xsl sublty different from the getxsl method for chrome compatability
//relies on the DOMParser github project by other developers
function getXSL(xmlUrl) {
    var xhr = $.ajax({
        url: xmlUrl,
        datatype: "xml",
        contentType: "application/xml",
        async: false,
        success: function (response) {
        }
    });

    var parser = new DOMParser();
    var doc = parser.parseFromString(xhr.responseText, "application/xml");
    return doc;
}

//handles loading the xml ans xml, transforming, applying the XSL operator to the for-each and foothold for sort
function beginProcessing(load, sort) {
    var xmlDoc = getXML("xml/remakes.xml");
    var stylesheet = getXSL("xml/remakes.xsl");

    if (load) {
        $(stylesheet).find("xsl\\:for-each ,for-each").first().attr("select", parseQuery());

    }
    if (!!sort) {
        console.log("sort:" + $(stylesheet).find("xsl\\:sort, sort").first().attr("select"));
        $(stylesheet).find("xsl\\:sort, sort").first().attr("select", "ryear");
    }

    if (typeof (XSLTProcessor) != "undefined") {
        var processor = new XSLTProcessor();

        try {
            processor.importStylesheet(stylesheet);
            var result = processor.transformToFragment(xmlDoc, document);
            try {
                $.browser.chrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());

                //not ideal, but no consistent way to count child nodes across browsers!
                if ($.browser.chrome) {
                    console.log("size:(chrome)" + result.childNodes[1].children[1].childNodes.length);

                } else {
                    console.log("size:" + result.childNodes[0].lastChild.firstChild.childNodes[1].childNodes.length);
                }

                $("#target").css("border", "3px solid red");
                $("#target").html(result);
            }
            catch (err) {
                //we can assume this is due to no movies for the terms by the user, neat way to provide a sensible message to the user
                console.log("Error description: " + err.message);
                $("#target").text("sorry, no movies!");
            }
        }
        catch (err) {
            //we can assume this is due to wrong terms by the user, neat way to provide a sensible message to the user
            console.log("Error description: " + err.message);
            $("#target").text("sorry, no movies, have you checked the terms you have entered, maybe your year isnt valid?");
        }
    }
    else {
        document.writeln("your browser does not support this code.  contact the administrator");
        console.log("unsupported browser");
    }

}

//returns the global query when asked for it, todo, remove the global variable perhaps
function parseQuery() {
    var tempquery = "";

    globalQuery = globalQuery.substr(0, globalQuery.length - 2);
    return globalQuery;
}

function sort(column) {
    console.log("gonna sort by:" + column);
}

//depending on the form elements, whether they have a vlaue or not, a xsl query is built 
//all text treated as contains, will support <>= and number operators
function buildQuery() {

    var tempQuery = "";
    $.each($(".formElement"), function (key, value) {

        switch (value.id) {

            case "remakeTitle":
                if (value.value != "")
                    tempQuery = parseTitle(value.value, "remake title", "remakeTitle", "rtitle");
                break;
            case "remakeFraction":
                if (value.value != "")
                    tempQuery = parseFraction(value.value, "remake fraction", "remakeFraction", "fraction");
                break;
            case "originalYear":
                if (value.value != "")
                    tempQuery = parseYear(value.value, "original year", "originalYear", "syear");
                break;
            case "remakeYear":
                if (value.value != "")
                    tempQuery = parseYear(value.value, "remake year", "remakeYear", "ryear");
                break;
            case "originalTitle":
                if (value.value != "")
                    tempQuery = parseTitle(value.value, "original title", "originalTitle", "stitle");
                break;
        }
    });
}

//parses any title - enables user not to worry about case sensitivity
function parseTitle(term, origin, control, node) {
    var titleQuery = "";
    var valid = false;

    if (term != "") {
        valid = true;

        //xslt is case sensitive, users are not!
        titleQuery = titleQuery + "remakes/remake[contains(translate(" + node + ",$smallcase,$uppercase), translate(\'" + term + "\',$smallcase,$uppercase))] " + $('input[name=refine]:radio:checked')[0].value + " ";
        //for now
        globalQuery = globalQuery + titleQuery;
    }

    return titleQuery;
}

//parses any year value, supports no, =, < or > operators
function parseYear(term, origin, control, node) {
    var yearQuery = "";
    var valid = false;
    var operator = "=";
    //regex for year, four digits
    var url = /\d{4}/;

    if (term.indexOf("<") > -1) {
        term = term.substr(1, term.length);
        operator = "<";
    }
    if (term.indexOf("=") > -1) {
        term = term.substr(1, term.length);
        operator = "=";
    }
    if (term.indexOf(">") > -1) {
        term = term.substr(1, term.length);
        operator = ">";
    }

    if (term.match(url) != null) {
        valid = true;
        yearQuery = yearQuery + "remakes/remake[" + node + operator + term + "] " + $('input[name=refine]:radio:checked')[0].value + " ";

        //for now
        globalQuery = globalQuery + yearQuery;
    }

    return yearQuery;
}

//parses fraction, supports decimal and <,>,+ operators
function parseFraction(term, origin, control, node) {
    var fractionQuery = "";
    var valid = false;
    var operator = "=";
    var url = /\d+\.?\d*/;

    if (term.indexOf("<") > -1) {
        term = term.substr(1, term.length);
        operator = "<";
    }
    if (term.indexOf("=") > -1) {
        term = term.substr(1, term.length);
        operator = "=";
    }
    if (term.indexOf(">") > -1) {
        term = term.substr(1, term.length);
        operator = ">";
    }

    if (term.match(url) != null) {
        valid = true;
        fractionQuery = fractionQuery + "remakes/remake[" + node + operator + term + "] " + $('input[name=refine]:radio:checked')[0].value + " ";

        //for now
        globalQuery = globalQuery + fractionQuery;
    }

    return fractionQuery;
}


//acitavte the jquery when the page is ready, begin processing to load all the movies
$(document).ready(function () {
    console.clear();

    beginProcessing(false, false);

    //listen to the run button and tell the beginprocessing funtion its not a first load of the page and to expect criteria
    $("#run").click(function () {
        globalQuery = "";
        buildQuery();
        beginProcessing(true, false);
        //enables the tablesorter
        $("#movieTable").tablesorter();
    });

    //reset the form
    $("#reset").click(function () {
        location.reload(true);
        //enables the tablesorter
        $("#movieTable").tablesorter();
    });

    //enables the tablesorter
    $("#movieTable").tablesorter();

});

