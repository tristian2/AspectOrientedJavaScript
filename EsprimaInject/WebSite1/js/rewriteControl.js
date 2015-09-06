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

    function ConnectionException(message) {
        this.message = message;
        this.name = 'ConnectionException';
    }
    function WeatherByCity(city, country) {
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
                    $("#icon").attr("src", "//c1.staticflickr.com/1/294/18789417264_9d8ae67572_b.jpg");
                    throw new ConnectionException('Weather service not reached');   //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
                },
                complete: function () {
                    console.log("Completed ajax call");
                }
            });
        } catch (e) {
            console.log(e.message);
        }
    }
    function before(message) {
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
    function after() {
        console.log('after advice');
    }
    WeatherByCity("London", "uk");

}();