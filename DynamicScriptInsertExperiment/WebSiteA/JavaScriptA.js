var a = 43 || [];
console.log("in javascript A on Website A");
$( document ).ready(function() {
    $("#result").text("in javascript A on Website A");
});

(function () {
    var u = "//localhost:55976/javascriptb.js";
    var b = "hello";
    var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript'; g.async = true; g.defer = true; g.src = u; s.parentNode.insertBefore(g, s);
})();