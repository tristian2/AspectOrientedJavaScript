//Main namespaces
var Acme = Acme || {};
Acme.Tools = Acme.Tools || {};
Acme.Tools.HumanResources = Acme.Tools.HumanResources || {};
Acme.Tools.Global = Acme.Tools.Global || {};

//handle browsers that can't handle console.log
if (typeof console === "undefined" || typeof console.log === "undefined" ) {
    console = {};
    console.log = function () {};
}if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}
/*
Acme.Tools.Global.NetsuiteRestHost = function () {
    var netsuiteHost = "";
    console.log(window.location.hostname);
    switch(window.location.hostname) {
        case "tkdev.Acme.com":
            netsuiteHost = "rest.sandbox.netsuite.com/";
            break;
        case "tk.Acme.com":
            netsuiteHost = "rest.netsuite.com/";
            break;
        default:
            netsuiteHost = "rest.sandbox.netsuite.com/";
            break;
    }  
    return netsuiteHost;
};

Acme.Tools.Global.NetsuiteFormsHost = function () {
    var netsuiteHost = "";
    console.log(window.location.hostname);
    switch (window.location.hostname) {
        case "tkdev.Acme.com":
            netsuiteHost = "forms.sandbox.netsuite.com/";
            break;
        case "tk.Acme.com":
            netsuiteHost = "forms.netsuite.com/";
            break;
        default:
            netsuiteHost = "forms.sandbox.netsuite.com/";
            break;
    }
    return netsuiteHost;
};

Acme.Tools.Global.NetsuiteScriptletPath = function () {
    var path = "app/site/hosting/scriptlet.nl";
    return path;
};

Acme.Tools.Global.NetsuiteRestletPath = function () {
    var path = "app/site/hosting/restlet.nl";
    return path;
};

//whilst sandbox and prod are not synced restlet/suitelets may have different ids
Acme.Tools.Global.NetsuiteCancelLeaveItemRestletId = function () {
    var id= "";
    console.log(window.location.hostname);
    switch (window.location.hostname) {
        case "tkdev.Acme.com":
            id = 556;
            break;
        case "tk.Acme.com":
            id = 556;
            break;
        default:
            id = 556;
            break;
    }
    return id;
};

Acme.Tools.Global.NetsuiteEmployeeLeaveRestletId = function () {
    var id = "";
    console.log(window.location.hostname);
    switch (window.location.hostname) {
        case "tkdev.Acme.com":
            id = 341;
            break;
        case "tk.Acme.com":
            id = 341;
            break;
        default:
            id = 341;
            break;
    }
    return id;
};

Acme.Tools.Global.ProxyPage = function () {
    var proxyurl = "";
    switch (window.location.hostname) {
        case "tk.Acme.com":
            proxyurl = "https://portal.Acme.com/AcmeNSProxy/proxy.aspx";
            break;
        default:
            proxyurl = "http://192.168.62.19/AcmeNSProxy/proxy.aspx";
            break;
    }
    return proxyurl;
};

Acme.Tools.Global.HolidayFile = function () {
    var holidayFile = "";
    switch (window.location.hostname) {
        case "tk.Acme.com":
            holidayFile = _spPageContextInfo.webAbsoluteUrl + "/Style%20Library/HumanResources/xml/netsuiteremainingholiday.txt";
            break;
        default:
            holidayFile = _spPageContextInfo.webAbsoluteUrl + "/Style%20Library/HumanResources/xml/netsuiteremainingholiday.txt";
            break;
    }
    return holidayFile;
};

Acme.Tools.Global.HolidayJSON = function (email) {
    var oLoader = SP.UI.ModalDialog.showWaitScreenWithNoClose(SP.Res.dialogLoading15);
    var rawNS = $.url.build({
        protocol: 'https',
        host: Acme.Tools.Global.NetsuiteRestHost(),
        path: Acme.Tools.Global.NetsuiteRestletPath(),
        params: {
            script: Acme.Tools.Global.NetsuiteEmployeeLeaveRestletId(),
            deploy: '1',
            empemail: email
        }
    });
    var ns = $.url.encode(rawNS);
    var url = Acme.Tools.Global.ProxyPage() + "?m=rest&u=" + ns;    

    $.getJSON(url, function (response) {
        $('#HolidayDataAnnualDaysValue_Label').text(response[0].annualdays);
        $('#HolidayDataDaysCarriedValue_Label').text(response[0].dayscarried);
        $('#HolidayDataLeaveTakenValue_Label').text(response[0].leavetaken);
        $('#HolidayDataApprovedPendingValue_Label').text(response[0].approvedpending);
        $('#HolidayDataLeaveRemainingValue_Label').text(response[0].leaveremaining);
        $('#HolidayDataLeaveDueValue_Label').text(response[0].leavedue);
        $('#HolidayDataLeaveAnnualTakenValue_Label').text(response[0].leaveannualtaken);
        $('#HolidayDataLeaveCarriedTakenValue_Label').text(response[0].leavecarriedtaken);
        $('#HolidayDataLeaveAnnualPendingValue_Label').text(response[0].annualpending);
        $('#HolidayDataLeaveCarriedPendingValue_Label').text(response[0].leavecarriedpending);
        $('#HolidayDataLeaveAnnualRemainingValue_Label').text(response[0].leaveannualremaining);
        $('#HolidayDataLeaveCarriedRemainingValue_Label').text(response[0].carrieddaysremaining);
    }).always(function () { oLoader.close(); });
    
};
Acme.Tools.Global.History = function (email) {
    var oLoader = SP.UI.ModalDialog.showWaitScreenWithNoClose(SP.Res.dialogLoading15);
    var rawNS = $.url.build({
        protocol: 'https',
        host: Acme.Tools.Global.NetsuiteRestHost(),
        path: Acme.Tools.Global.NetsuiteRestletPath(),
        params: {
            script: Acme.Tools.Global.NetsuiteEmployeeLeaveRestletId(),
            deploy: '1',
            empemail: email
        }
    });
    var ns = $.url.encode(rawNS);
    var url = Acme.Tools.Global.ProxyPage() + "?m=rest&u=" + ns;

    //need to place code to extract leaverrequests 
    $.getJSON(url, function (response) {
        $.each(response, function (i, v) {
            if (v.email == email) {
                $.each(v.leaverequests, function (j, w) {
                    var markup = Acme.Tools.HumanResources.RenderCancel(w.recorded, w.leaveid, Acme.Tools.Global.ProxyPage());

                    $('<tr>').append($('<td style="border:1px solid #000000;">').html(w.startdate))
                        .append($('<td style="border:1px solid #000000;">').html(w.enddate))
                        .append($('<td style="border:1px solid #000000;">').html(w.leavetype))
                        .append($('<td style="border:1px solid #000000;">').html(w.leavestatus))
                        .append($('<td style="border:1px solid #000000;">').html(w.leavetotal))
                        .append($('<td style="border:1px solid #000000;">').html(markup))
                    .appendTo('#tableHistory');
                });
                return;
            }
        });
    }).always(function () { oLoader.close(); });
};
Acme.Tools.Global.EmployeeStatusFile = function () {
    var statusFile = "";
    switch (window.location.hostname) {
        case "tk.Acme.com":
            statusFile = _spPageContextInfo.webAbsoluteUrl + "/Style%20Library/HumanResources/xml/netsuite_workerstatus.xml";
            break;
        default:
            statusFile = _spPageContextInfo.webAbsoluteUrl + "/Style%20Library/HumanResources/xml/netsuite_workerstatus.xml";
            break;
    }
    return statusFile;
};

Acme.Tools.HumanResources = {
    //Helper method to convert an XML string to a JSON obj
    //http://davidwalsh.name/convert-xml-json
    XmlToJson: function (xml) {
        // Create the return object
        var obj = {};

        if (xml.nodeType == 1) { // element
            // do attributes
            if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) { // text
            obj = xml.nodeValue;
        }

        // do children
        if (xml.hasChildNodes()) {
            for (var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (typeof (obj[nodeName]) == "undefined") {
                    obj[nodeName] = Acme.Tools.HumanResources.XmlToJson(item);
                } else {
                    if (typeof (obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(Acme.Tools.HumanResources.XmlToJson(item));
                }
            }
        }
        return obj;
    },
    //check to see if the sharepoint publishing page is in edit mode (return a boolean value)
    IsPageInEditMode: function () {
        return document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value === 1;
    }
};

/*!------------------------------
 * jquery.ajax.fake.js
 * http://anasnakawa.github.com/jquery.ajax.fake
 * license: MIT (http://opensource.org/licenses/mit-license.php)
 * ------------------------------
 */
// ------------------------------
// author : Anas Nakawa
//      anas.nakawa@gmail.com
//      @anasnakawa
// ------------------------------

(function ($) {

    // caching original jquery ajax method
    var ajax = $.ajax
    , fakeWebServices = {}
    , deferred = $.Deferred()
    , defaults = {
        fake: false  // is it fake ?
      , wait: 10  // how long should wait before return ajax response 
    }

    , ajaxFake = function (options) {

        // not fake, just return the original jquery ajax
        if ($.ajax.isFake === false) {
            return ajax.apply(this, arguments);
        }

        if (!options.fake) {
            return ajax.apply(this, arguments);
        }

        options = $.extend(defaults, options);

        if (!fakeWebServices[options.url]) {
            $.error('{url} 404 not found'.replace(/{url}/, options.url));
            return deferred.reject('404');
        }

        // fake it..
        setTimeout(function () {
            var data = fakeWebServices[options.url](options.data);
            if (options.success) {
                options.success(data);
            }
            if (options.complete) {
                options.complete(data);
            }
            deferred.resolve(data);

        }, options.wait);

        // return a promise object
        return deferred.promise();
    }

    , registerFakeWebService = function (url, callback) {
        fakeWebServices[url] = function (data) {
            return callback(data);
        }
    }

    console.log("fake service");
    // expose to jquery api
    // --------------------
    $.ajax = ajaxFake;
    $.ajax.fake = {
        defaults: defaults
      , registerWebservice: registerFakeWebService
      , webServices: fakeWebServices
    };

})(jQuery);

/*(function ($) {
    var fake = $.ajax.fake;
    fake.registerWebservice(_spPageContextInfo.siteAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties", function (data) {
        return [
              {
                  "text": "this is faked"
              }
        ]
    });

})(jQuery);*/
/*
Name: jsDate
Desc: VBScript native Date functions emulated for Javascript
Author: Rob Eberhardt, Slingshot Solutions - http://slingfive.com/
Note: see jsDate.txt for more info
http://code.google.com/p/gkkd-jogja/source/browse/trunk/js/jsDate.js?r=60
*/

// constants
vbGeneralDate = 0; vbLongDate = 1; vbShortDate = 2; vbLongTime = 3; vbShortTime = 4;  // NamedFormat
vbUseSystemDayOfWeek = 0; vbSunday = 1; vbMonday = 2; vbTuesday = 3; vbWednesday = 4; vbThursday = 5; vbFriday = 6; vbSaturday = 7;	// FirstDayOfWeek
vbUseSystem = 0; vbFirstJan1 = 1; vbFirstFourDays = 2; vbFirstFullWeek = 3;	// FirstWeekOfYear

// arrays (1-based)
Date.MonthNames = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
Date.WeekdayNames = [null, 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];




Date.IsDate = function (p_Expression) {
    return !isNaN(new Date(p_Expression));		// <-- review further
}

Date.CDate = function (p_Date) {
    if (Date.IsDate(p_Date)) { return new Date(p_Date); }

    var strTry = p_Date.replace(/\-/g, '/').replace(/\./g, '/').replace(/ /g, '/');	// fix separators
    strTry = strTry.replace(/pm$/i, " pm").replace(/am$/i, " am");	// and meridian spacing
    if (Date.IsDate(strTry)) { return new Date(strTry); }

    var strTryYear = strTry + '/' + new Date().getFullYear();	// append year
    if (Date.IsDate(strTryYear)) { return new Date(strTryYear); }


    if (strTry.indexOf(":")) {	// if appears to have time
        var strTryYear2 = strTry.replace(/ /, '/' + new Date().getFullYear() + ' ');	// insert year
        if (Date.IsDate(strTryYear2)) { return new Date(strTryYear2); }

        var strTryDate = new Date().toDateString() + ' ' + p_Date;	// pre-pend current date
        if (Date.IsDate(strTryDate)) { return new Date(strTryDate); }
    }

    return false;	// double as looser IsDate
    //throw("Error #13 - Type mismatch");	// or is this better? 
}



Date.DateAdd = function (p_Interval, p_Number, p_Date) {
    if (!Date.CDate(p_Date)) { return "invalid date: '" + p_Date + "'"; }
    if (isNaN(p_Number)) { return "invalid number: '" + p_Number + "'"; }

    p_Number = new Number(p_Number);
    var dt = Date.CDate(p_Date);

    switch (p_Interval.toLowerCase()) {
        case "yyyy": {
            dt.setFullYear(dt.getFullYear() + p_Number);
            break;
        }
        case "q": {
            dt.setMonth(dt.getMonth() + (p_Number * 3));
            break;
        }
        case "m": {
            dt.setMonth(dt.getMonth() + p_Number);
            break;
        }
        case "y":			// day of year
        case "d":			// day
        case "w": {		// weekday
            dt.setDate(dt.getDate() + p_Number);
            break;
        }
        case "ww": {	// week of year
            dt.setDate(dt.getDate() + (p_Number * 7));
            break;
        }
        case "h": {
            dt.setHours(dt.getHours() + p_Number);
            break;
        }
        case "n": {		// minute
            dt.setMinutes(dt.getMinutes() + p_Number);
            break;
        }
        case "s": {
            dt.setSeconds(dt.getSeconds() + p_Number);
            break;
        }
        case "ms": {	// JS extension
            dt.setMilliseconds(dt.getMilliseconds() + p_Number);
            break;
        }
        default: {
            return "invalid interval: '" + p_Interval + "'";
        }
    }
    return dt;
}



Date.DateDiff = function (p_Interval, p_Date1, p_Date2, p_FirstDayOfWeek) {
    if (!Date.CDate(p_Date1)) { return "invalid date: '" + p_Date1 + "'"; }
    if (!Date.CDate(p_Date2)) { return "invalid date: '" + p_Date2 + "'"; }
    p_FirstDayOfWeek = (isNaN(p_FirstDayOfWeek) || p_FirstDayOfWeek == 0) ? vbSunday : parseInt(p_FirstDayOfWeek);	// set default & cast

    var dt1 = Date.CDate(p_Date1);
    var dt2 = Date.CDate(p_Date2);

    // correct DST-affected intervals ("d" & bigger)
    if ("h,n,s,ms".indexOf(p_Interval.toLowerCase()) == -1) {
        if (p_Date1.toString().indexOf(":") == -1) { dt1.setUTCHours(0, 0, 0, 0) };	// no time, assume 12am
        if (p_Date2.toString().indexOf(":") == -1) { dt2.setUTCHours(0, 0, 0, 0) };	// no time, assume 12am
    }


    // get ms between UTC dates and make into "difference" date
    var iDiffMS = dt2.valueOf() - dt1.valueOf();
    var dtDiff = new Date(iDiffMS);

    // calc various diffs
    var nYears = dt2.getUTCFullYear() - dt1.getUTCFullYear();
    var nMonths = dt2.getUTCMonth() - dt1.getUTCMonth() + (nYears != 0 ? nYears * 12 : 0);
    var nQuarters = parseInt(nMonths / 3);	//<<-- different than VBScript, which watches rollover not completion

    var nMilliseconds = iDiffMS;
    var nSeconds = parseInt(iDiffMS / 1000);
    var nMinutes = parseInt(nSeconds / 60);
    var nHours = parseInt(nMinutes / 60);
    var nDays = parseInt(nHours / 24);	// <-- now fixed for DST switch days
    var nWeeks = parseInt(nDays / 7);


    if (p_Interval.toLowerCase() == 'ww') {
        // set dates to 1st & last FirstDayOfWeek
        var offset = Date.DatePart("w", dt1, p_FirstDayOfWeek) - 1;
        if (offset) { dt1.setDate(dt1.getDate() + 7 - offset); }
        var offset = Date.DatePart("w", dt2, p_FirstDayOfWeek) - 1;
        if (offset) { dt2.setDate(dt2.getDate() - offset); }
        // recurse to "w" with adjusted dates
        var nCalWeeks = Date.DateDiff("w", dt1, dt2) + 1;
    }
    // TODO: similar for 'w'?


    // return difference
    switch (p_Interval.toLowerCase()) {
        case "yyyy": return nYears;
        case "q": return nQuarters;
        case "m": return nMonths;
        case "y":			// day of year
        case "d": return nDays;
        case "w": return nWeeks;
        case "ww": return nCalWeeks; // week of year	
        case "h": return nHours;
        case "n": return nMinutes;
        case "s": return nSeconds;
        case "ms": return nMilliseconds;	// not in VBScript
        default: return "invalid interval: '" + p_Interval + "'";
    }
}




Date.DatePart = function (p_Interval, p_Date, p_FirstDayOfWeek) {
    if (!Date.CDate(p_Date)) { return "invalid date: '" + p_Date + "'"; }

    var dtPart = Date.CDate(p_Date);

    switch (p_Interval.toLowerCase()) {
        case "yyyy": return dtPart.getFullYear();
        case "q": return parseInt(dtPart.getMonth() / 3) + 1;
        case "m": return dtPart.getMonth() + 1;
        case "y": return Date.DateDiff("y", "1/1/" + dtPart.getFullYear(), dtPart) + 1;	// day of year
        case "d": return dtPart.getDate();
        case "w": return Date.Weekday(dtPart.getDay() + 1, p_FirstDayOfWeek);		// weekday
        case "ww": return Date.DateDiff("ww", "1/1/" + dtPart.getFullYear(), dtPart, p_FirstDayOfWeek) + 1;	// week of year
        case "h": return dtPart.getHours();
        case "n": return dtPart.getMinutes();
        case "s": return dtPart.getSeconds();
        case "ms": return dtPart.getMilliseconds();	// <-- JS extension, NOT in VBScript
        default: return "invalid interval: '" + p_Interval + "'";
    }
}



Date.MonthName = function (p_Month, p_Abbreviate) {
    if (isNaN(p_Month)) {	// v0.94- compat: extract real param from passed date
        if (!Date.CDate(p_Month)) { return "invalid month: '" + p_Month + "'"; }
        p_Month = DatePart("m", Date.CDate(p_Month));
    }

    var retVal = Date.MonthNames[p_Month];
    if (p_Abbreviate == true) { retVal = retVal.substring(0, 3) }	// abbr to 3 chars
    return retVal;
}


Date.WeekdayName = function (p_Weekday, p_Abbreviate, p_FirstDayOfWeek) {
    if (isNaN(p_Weekday)) {	// v0.94- compat: extract real param from passed date
        if (!Date.CDate(p_Weekday)) { return "invalid weekday: '" + p_Weekday + "'"; }
        p_Weekday = DatePart("w", Date.CDate(p_Weekday));
    }
    p_FirstDayOfWeek = (isNaN(p_FirstDayOfWeek) || p_FirstDayOfWeek == 0) ? vbSunday : parseInt(p_FirstDayOfWeek);	// set default & cast

    var nWeekdayNameIdx = ((p_FirstDayOfWeek - 1 + parseInt(p_Weekday) - 1 + 7) % 7) + 1;	// compensate nWeekdayNameIdx for p_FirstDayOfWeek
    var retVal = Date.WeekdayNames[nWeekdayNameIdx];
    if (p_Abbreviate == true) { retVal = retVal.substring(0, 3) }	// abbr to 3 chars
    return retVal;
}


// adjusts weekday for week starting on p_FirstDayOfWeek
Date.Weekday = function (p_Weekday, p_FirstDayOfWeek) {
    p_FirstDayOfWeek = (isNaN(p_FirstDayOfWeek) || p_FirstDayOfWeek == 0) ? vbSunday : parseInt(p_FirstDayOfWeek);	// set default & cast

    return ((parseInt(p_Weekday) - p_FirstDayOfWeek + 7) % 7) + 1;
}





Date.FormatDateTime = function (p_Date, p_NamedFormat) {
    if (p_Date.toUpperCase().substring(0, 3) == "NOW") { p_Date = new Date() };
    if (!Date.CDate(p_Date)) { return "invalid date: '" + p_Date + "'"; }
    if (isNaN(p_NamedFormat)) { p_NamedFormat = vbGeneralDate };

    var dt = Date.CDate(p_Date);

    switch (parseInt(p_NamedFormat)) {
        case vbGeneralDate: return dt.toString();
        case vbLongDate: return Format(p_Date, 'DDDD, MMMM D, YYYY');
        case vbShortDate: return Format(p_Date, 'MM/DD/YYYY');
        case vbLongTime: return dt.toLocaleTimeString();
        case vbShortTime: return Format(p_Date, 'HH:MM:SS');
        default: return "invalid NamedFormat: '" + p_NamedFormat + "'";
    }
}


Date.Format = function (p_Date, p_Format, p_FirstDayOfWeek, p_firstweekofyear) {
    if (!Date.CDate(p_Date)) { return "invalid date: '" + p_Date + "'"; }
    if (!p_Format || p_Format == '') { return dt.toString() };

    var dt = Date.CDate(p_Date);

    // Zero-padding formatter
    this.pad = function (p_str) {
        if (p_str.toString().length == 1) { p_str = '0' + p_str }
        return p_str;
    }

    var ampm = dt.getHours() >= 12 ? 'PM' : 'AM'
    var hr = dt.getHours();
    if (hr == 0) { hr = 12 };
    if (hr > 12) { hr -= 12 };
    var strShortTime = hr + ':' + this.pad(dt.getMinutes()) + ':' + this.pad(dt.getSeconds()) + ' ' + ampm;
    var strShortDate = (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + new String(dt.getFullYear()).substring(2, 4);
    var strLongDate = Date.MonthName(dt.getMonth() + 1) + ' ' + dt.getDate() + ', ' + dt.getFullYear();		//

    var retVal = p_Format;

    // switch tokens whose alpha replacements could be accidentally captured
    retVal = retVal.replace(new RegExp('C', 'gi'), 'CCCC');
    retVal = retVal.replace(new RegExp('mmmm', 'gi'), 'XXXX');
    retVal = retVal.replace(new RegExp('mmm', 'gi'), 'XXX');
    retVal = retVal.replace(new RegExp('dddddd', 'gi'), 'AAAAAA');
    retVal = retVal.replace(new RegExp('ddddd', 'gi'), 'AAAAA');
    retVal = retVal.replace(new RegExp('dddd', 'gi'), 'AAAA');
    retVal = retVal.replace(new RegExp('ddd', 'gi'), 'AAA');
    retVal = retVal.replace(new RegExp('timezone', 'gi'), 'ZZZZ');
    retVal = retVal.replace(new RegExp('time24', 'gi'), 'TTTT');
    retVal = retVal.replace(new RegExp('time', 'gi'), 'TTT');

    // now do simple token replacements
    retVal = retVal.replace(new RegExp('yyyy', 'gi'), dt.getFullYear());
    retVal = retVal.replace(new RegExp('yy', 'gi'), new String(dt.getFullYear()).substring(2, 4));
    retVal = retVal.replace(new RegExp('y', 'gi'), Date.DatePart("y", dt));
    retVal = retVal.replace(new RegExp('q', 'gi'), Date.DatePart("q", dt));
    retVal = retVal.replace(new RegExp('mm', 'gi'), (dt.getMonth() + 1));
    retVal = retVal.replace(new RegExp('m', 'gi'), (dt.getMonth() + 1));
    retVal = retVal.replace(new RegExp('dd', 'gi'), this.pad(dt.getDate()));
    retVal = retVal.replace(new RegExp('d', 'gi'), dt.getDate());
    retVal = retVal.replace(new RegExp('hh', 'gi'), this.pad(dt.getHours()));
    retVal = retVal.replace(new RegExp('h', 'gi'), dt.getHours());
    retVal = retVal.replace(new RegExp('nn', 'gi'), this.pad(dt.getMinutes()));
    retVal = retVal.replace(new RegExp('n', 'gi'), dt.getMinutes());
    retVal = retVal.replace(new RegExp('ss', 'gi'), this.pad(dt.getSeconds()));
    retVal = retVal.replace(new RegExp('s', 'gi'), dt.getSeconds());
    retVal = retVal.replace(new RegExp('t t t t t', 'gi'), strShortTime);
    retVal = retVal.replace(new RegExp('am/pm', 'g'), dt.getHours() >= 12 ? 'pm' : 'am');
    retVal = retVal.replace(new RegExp('AM/PM', 'g'), dt.getHours() >= 12 ? 'PM' : 'AM');
    retVal = retVal.replace(new RegExp('a/p', 'g'), dt.getHours() >= 12 ? 'p' : 'a');
    retVal = retVal.replace(new RegExp('A/P', 'g'), dt.getHours() >= 12 ? 'P' : 'A');
    retVal = retVal.replace(new RegExp('AMPM', 'g'), dt.getHours() >= 12 ? 'pm' : 'am');
    // (always proceed largest same-lettered token to smallest)

    // now finish the previously set-aside tokens 
    retVal = retVal.replace(new RegExp('XXXX', 'gi'), Date.MonthName(dt.getMonth() + 1, false));	//
    retVal = retVal.replace(new RegExp('XXX', 'gi'), Date.MonthName(dt.getMonth() + 1, true));	//
    retVal = retVal.replace(new RegExp('AAAAAA', 'gi'), strLongDate);
    retVal = retVal.replace(new RegExp('AAAAA', 'gi'), strShortDate);
    retVal = retVal.replace(new RegExp('AAAA', 'gi'), Date.WeekdayName(dt.getDay() + 1, false, p_FirstDayOfWeek));	// 
    retVal = retVal.replace(new RegExp('AAA', 'gi'), Date.WeekdayName(dt.getDay() + 1, true, p_FirstDayOfWeek));	// 
    retVal = retVal.replace(new RegExp('TTTT', 'gi'), dt.getHours() + ':' + this.pad(dt.getMinutes()));
    retVal = retVal.replace(new RegExp('TTT', 'gi'), hr + ':' + this.pad(dt.getMinutes()) + ' ' + ampm);
    retVal = retVal.replace(new RegExp('CCCC', 'gi'), strShortDate + ' ' + strShortTime);

    // finally timezone
    tz = dt.getTimezoneOffset();
    timezone = (tz < 0) ? ('GMT-' + tz / 60) : (tz == 0) ? ('GMT') : ('GMT+' + tz / 60);
    retVal = retVal.replace(new RegExp('ZZZZ', 'gi'), timezone);

    return retVal;
}



// ====================================

/* if desired, map new methods to direct functions
*/
IsDate = Date.IsDate;
CDate = Date.CDate;
DateAdd = Date.DateAdd;
DateDiff = Date.DateDiff;
DatePart = Date.DatePart;
MonthName = Date.MonthName;
WeekdayName = Date.WeekdayName;
Weekday = Date.Weekday;
FormatDateTime = Date.FormatDateTime;
Format = Date.Format;



/* and other capitalizations for easier porting
isDate = IsDate;
dateAdd = DateAdd;
dateDiff = DateDiff;
datePart = DatePart;
monthName = MonthName;
weekdayName = WeekdayName;
formatDateTime = FormatDateTime;
format = Format;

isdate = IsDate;
dateadd = DateAdd;
datediff = DateDiff;
datepart = DatePart;
monthname = MonthName;
weekdayname = WeekdayName;
formatdatetime = FormatDateTime;

ISDATE = IsDate;
DATEADD = DateAdd;
DATEDIFF = DateDiff;
DATEPART = DatePart;
MONTHNAME = MonthName;
WEEKDAYNAME = WeekdayName;
FORMATDATETIME = FormatDateTime;
FORMAT = Format;
*/
//Main namespaces
var Acme = Acme || {};
Acme.Tools = Acme.Tools || {};
Acme.Tools.HumanResources = Acme.Tools.HumanResources || {};
Acme.Tools.Global = Acme.Tools.Global || {};

//handle browsers that can't handle console.log
if (typeof console === "undefined" || typeof console.log === "undefined") {
    console = {};
    console.log = function () { };
}/* test CI*/
Acme.Tools.HumanResources = {
    //Helper method to convert an XML string to a JSON obj
    //http://davidwalsh.name/convert-xml-json
    XmlToJson: function (xml) {
        // Create the return object
        var obj = {};

        if (xml.nodeType == 1) { // element
            // do attributes
            if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) { // text
            obj = xml.nodeValue;
        }

        // do children
        if (xml.hasChildNodes()) {
            for (var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (typeof (obj[nodeName]) == "undefined") {
                    obj[nodeName] = Acme.Tools.HumanResources.XmlToJson(item);
                } else {
                    if (typeof (obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(Acme.Tools.HumanResources.XmlToJson(item));
                }
            }
        }
        return obj;
    },
    //check to see if the sharepoint publishing page is in edit mode (return a boolean value)
    IsPageInEditMode: function () {
        return document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value === 1;
    }
};




// check jQuery library, and load from local if it was not loaded from CDN
window.jQuery || RegisterSod('jQuery', '~sitecollection/Style Library/HumanResources/jquery-1.10.2.min.js');

// check Knockout library, and load from local if it was not loaded from CDN
//window.ko || RegisterSod('knockOut', '~sitecollection/Style Library/HumanResources/knockout-2.3.0.js');

Acme.Tools.HumanResources = Acme.Tools.HumanResources || {};

//deferreds array for jQuery promises
Acme.Tools.Deferreds = new Array();


Acme.Tools.HumanResources.LeaveRequest = function ($) {
    //get user email first, asynchronously
    //then reun the other parts also asynchronously
    var clientContext;
    var user;
    var thisUserEmail;
    var oLoader;

    // Make sure the SharePoint script file 'sp.js' is loaded before your
    // code runs.
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', getUserObject);

    function getUserObject() {
        oLoader = SP.UI.ModalDialog.showWaitScreenWithNoClose(SP.Res.dialogLoading15);
        console.log(oLoader);
        clientContext = SP.ClientContext.get_current();
        user = clientContext.get_web().get_currentUser();
        clientContext.load(user);
        clientContext.executeQueryAsync(onQuerySucceeded, onQueryFailed);
    }
    function onQuerySucceeded() {
        thisUserEmail = user.get_email();
        console.log('in Acme.Tools.HumanResources.LeaveRequest');

        //Acme.Tools.HumanResources.Loading();
        $(document).ready(function () {
            $("#tableHistory").hide();
            // Fetch the JSON data for the Remaining holiday entitlement
            var jqxhr = $.getJSON(Acme.Tools.Global.HolidayFile(), null, function (data) {
                $.each(data, function () {
                    if (this.email == thisUserEmail) {
                        // Found the use in the JSON file, output their NetSuite Holiday Data
                        $('#HolidayDataAnnualDaysValue_Label').text(this.annualdays);
                        $('#HolidayDataDaysCarriedValue_Label').text(this.dayscarried);
                        $('#HolidayDataLeaveTakenValue_Label').text(this.leavetaken);
                        $('#HolidayDataApprovedPendingValue_Label').text(this.approvedpending);
                        $('#HolidayDataLeaveRemainingValue_Label').text(this.leaveremaining);
                        $('#HolidayDataLeaveDueValue_Label').text(this.leavedue);
                        $('#HolidayDataLeaveAnnualTakenValue_Label').text(this.leaveannualtaken);
                        $('#HolidayDataLeaveCarriedTakenValue_Label').text(this.leavecarriedtaken);
                        $('#HolidayDataLeaveAnnualPendingValue_Label').text(this.annualpending);
                        $('#HolidayDataLeaveCarriedPendingValue_Label').text(this.leavecarriedpending);
                        $('#HolidayDataLeaveAnnualRemainingValue_Label').text(this.leaveannualremaining);
                        $('#HolidayDataLeaveCarriedRemainingValue_Label').text(this.carrieddaysremaining);
                    }
                });
            });

            $('#Button_Save').attr('disabled', 'disabled');

            // Gets the NetSuite XML file for populating certain fields
            $.ajax({
                type: "GET",
                url: Acme.Tools.Global.EmployeeStatusFile(),
                dataType: "xml",
                success: function (xml) {
                    // Leave Type
                    $(xml).find('leavetype').each(function () {
                        $id = $(this).find('id').text();
                        $leavetype = $(this).find('value').text();
                        $('#LeaveType_DropDownChoice').append($('<option></option>').val($id).html($leavetype));
                    });

                    // Subsidiary
                    $(xml).find('subsidiary').each(function () {
                        $id = $(this).find('id:first').text();
                        $subsidiary = $(this).find('value:first').text();
                        $('#Subsidiary_DropDownChoice').append($('<option></option>').val($id).html($subsidiary));
                    });
                }
            });

            $('#RequesterEmail_Label').text(thisUserEmail);
            $('#RequesterEmail_TextField').val(thisUserEmail);

            $('#Button_Cancel').click(function () {
                alert("No cancel option.\n\nJust navigate away from this form.");
            });

            $('#FullDay_DropDownChoice').change(function () {
                if ($('#FullDay_DropDownChoice option:selected').text() == "Half Day" && $("#DaysLeave_TextField").val() == "1") {
                    $("#DaysLeave_TextField").val("0.5");
                    $("#DaysLeave_Label").text("0.5");
                    $("#DaysLeave_Label_Explanation").hide();
                }
                else if ($('#FullDay_DropDownChoice option:selected').text() == "Full Day(s)" && $("#DaysLeave_TextField").val() == "0.5") {
                    $("#DaysLeave_TextField").val("1");
                    $("#DaysLeave_Label").text("1");
                    $("#DaysLeave_Label_Explanation").hide();
                }
            });
            $("#Button_ShowHistory").click(function () {
                $('#divShowLoading').text(" ... please wait ...");
                oLoader = SP.UI.ModalDialog.showWaitScreenWithNoClose(SP.Res.dialogLoading15);
                $('#divShowLoading').text("");
                $("#tableHistory").show();
                $("#tableHistory").find("tr:gt(0)").remove();

                //need to place code to extract leaverrequests 
                var jqxhr = $.getJSON(Acme.Tools.Global.HolidayFile(), null, function (data, status, xhr) {
                    $.each(data, function (i, v) {
                        if (v.email == thisUserEmail) {
                            $.each(v.leaverequests, function (j, w) {
                                console.log(w.leaveid)
                                var markup = Acme.Tools.HumanResources.RenderCancel(w.recorded, w.leaveid, Acme.Tools.Global.ProxyPage());

                                $('<tr>').append($('<td style="border:1px solid #000000;">').html(w.startdate))
	                                .append($('<td style="border:1px solid #000000;">').html(w.enddate))
	                                .append($('<td style="border:1px solid #000000;">').html(w.leavetype))
	                                .append($('<td style="border:1px solid #000000;">').html(w.leavestatus))
	                                .append($('<td style="border:1px solid #000000;">').html(w.leavetotal))
	                                .append($('<td style="border:1px solid #000000;">').html(markup))
	                            .appendTo('#tableHistory');
                            });
                            return;
                        }
                    });
                });
                oLoader.close();
            });

            // Date function sets up the Date Picker and ensures that the end date is after the start date (through the UI)	
            var dates = $("#Start_DateTimeField, #End_DateTimeField").datepicker({
                dateFormat: 'dd-mm-yy',
                firstDay: 1,
                defaultDate: "+1w",
                changeMonth: true,
                changeYear: true,
                numberOfMonths: 3,
                beforeShowDay: $.datepicker.noWeekends,
                onSelect: function (selectedDate) {
                    var option = this.id == "Start_DateTimeField" ? "minDate" : "maxDate",
	                instance = $(this).data("datepicker"),
	                date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
                    dates.not(this).datepicker("option", option, date);

                    var start = $('#Start_DateTimeField').datepicker("getDate");
                    var end = $('#End_DateTimeField').datepicker("getDate");
                    if (start != null && end != null) {
                        // Get the date diff and if > 1 day, remove the half day option
                        var diff = Math.floor((Date.parse(end) - Date.parse(start)) / 86400000); // 0 for a single day, > 0 for multiple days
                        if (diff > 0) {
                            $("#FullDay_DropDownChoice option[value='T']").remove();
                            $("#DaysLeave_TextField").val("?");
                            $("#DaysLeave_Label").text("?");
                            $("#DaysLeave_Label_Explanation").show();
                        }
                        else {
                            if ($("#FullDay_DropDownChoice option[value='T']").length == 0) {
                                $('#FullDay_DropDownChoice').append('<option value="T" >Half Day</option>');
                            }
                            if ($('#FullDay_DropDownChoice option:selected').text() == "Half Day") {
                                $("#DaysLeave_TextField").val("0.5");
                                $("#DaysLeave_Label").text("0.5");
                                $("#DaysLeave_Label_Explanation").hide();
                            }
                            else if ($('#FullDay_DropDownChoice option:selected').text() == "Full Day(s)") {
                                $("#DaysLeave_TextField").val("1");
                                $("#DaysLeave_Label").text("1");
                                $("#DaysLeave_Label_Explanation").hide();
                            }
                        }


                        // Get the calcuated days holiday required
                        $('#DaysLeave_Label_Explanation').text(" ... please wait ...");
                        oLoader = SP.UI.ModalDialog.showWaitScreenWithNoClose(SP.Res.dialogLoading15);
                        var netsuiteDayCounterUrl = "https://" + Acme.Tools.Global.NetsuiteFormsHost() + Acme.Tools.Global.NetsuiteScriptletPath() + "?script=324&deploy=1&compid=601905&h=112aec6dd53010225f84"
                        netsuiteDayCounterUrl += "&subsidiary=" + $("#Subsidiary_DropDownChoice option:selected").val();
                        netsuiteDayCounterUrl += "&startdate=" + $('#Start_DateTimeField').val().replace(/[-]/g, "/");
                        netsuiteDayCounterUrl += "&enddate=" + $('#End_DateTimeField').val().replace(/[-]/g, "/");
                        netsuiteDayCounterUrl += "&halfDay=" + $("#FullDay_DropDownChoice option:selected").val();

                        var ns = $.url.encode(netsuiteDayCounterUrl);
                        var url = Acme.Tools.Global.ProxyPage() + "?u=" + ns;
                        console.log("Acme url to proxy:" + url)
                        // Debug
                        $('#Result').html(url);
                        $('#UnecodedResult').html(netsuiteDayCounterUrl);

                        console.log('Get the calcuated days holiday required, url to send netsuite:' + url);
                        $.ajax({
                            url: url,
                            type: 'POST',
                            data: {}, // <- set="" empty="" data="" (req=""'d for post) 
                            success: function (data, textStatus) {
                                oLoader.close();
                                if (textStatus.indexOf("success") != -1) {
                                    if (isNaN(data)) {
                                        alert(data);
                                        return;
                                    }

                                    if (parseInt(data) <= 30) {
                                        if (data == "0.5") {
                                            $("#DaysLeave_TextField").val("0.5");
                                            $("#DaysLeave_Label").text("0.5");
                                        }
                                        else {
                                            $("#DaysLeave_TextField").val(parseInt(data));
                                            $("#DaysLeave_Label").text(parseInt(data));
                                        }
                                        $("#DaysLeave_Label_Explanation").hide();
                                        $('#Button_Save').removeAttr('disabled');
                                    }
                                    else {
                                        alert("Sorry, as you are requesting more than 30 days leave, please see you line manager instead of using this form.");
                                    }
                                }
                                else {
                                    alert("Sorry, there has been an error with the retrieval of the actual days required. Please check the details and try again (refresh the page).\n\nIf the error persists, please contact Mimeshare Support and notify them of the message below:\n\n\n" + data);
                                };
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                console.log("Error occured while retrieving leave request history" + xhr.status);
                                console.log(thrownError);
                            }
                        });

                    }
                }
            });
        });
        oLoader.close();
    }
    function onQueryFailed(sender, args) {
        console.log('Error: ' + args.get_message());
        thisUserEmail = "";
        oLoader.close();
    }
    console.log('leaving Acme.Tools.HumanResources.LeaveRequest');
}

Acme.Tools.HumanResources.LeaveRequestv2 = function ($) {
    //get user email first, asynchronously
    //then reun the other parts also asynchronously
    var clientContext;
    var user;
    var thisUserEmail;
    var oLoader;

    // Make sure the SharePoint script file 'sp.js' is loaded before your
    // code runs.
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', getUserObject);

    function getUserObject() {
        clientContext = SP.ClientContext.get_current();
        user = clientContext.get_web().get_currentUser();
        clientContext.load(user);
        clientContext.executeQueryAsync(onQuerySucceeded, onQueryFailed);
    }
    function onQuerySucceeded() {
        thisUserEmail = user.get_email();
        console.log('in Acme.Tools.HumanResources.LeaveRequestv2');

        //Acme.Tools.HumanResources.Loading();
        $(document).ready(function () {
            $("#tableHistory").hide();
            // Fetch the JSON data for the Remaining holiday entitlement
            $.getJSON(Acme.Tools.Global.HolidayJSON(thisUserEmail));

            $('#Button_Save').attr('disabled', 'disabled');

            // Gets the NetSuite XML file for populating certain fields
            $.ajax({
                type: "GET",
                url: Acme.Tools.Global.EmployeeStatusFile(),
                dataType: "xml",
                success: function (xml) {
                    // Leave Type
                    $(xml).find('leavetype').each(function () {
                        $id = $(this).find('id').text();
                        $leavetype = $(this).find('value').text();
                        $('#LeaveType_DropDownChoice').append($('<option></option>').val($id).html($leavetype));
                    });

                    // Subsidiary
                    $(xml).find('subsidiary').each(function () {
                        $id = $(this).find('id:first').text();
                        $subsidiary = $(this).find('value:first').text();
                        $('#Subsidiary_DropDownChoice').append($('<option></option>').val($id).html($subsidiary));
                    });
                }
            });

            $('#RequesterEmail_Label').text(thisUserEmail);
            $('#RequesterEmail_TextField').val(thisUserEmail);

            $('#Button_Cancel').click(function () {
                alert("No cancel option.\n\nJust navigate away from this form.");
            });

            $('#FullDay_DropDownChoice').change(function () {
                if ($('#FullDay_DropDownChoice option:selected').text() == "Half Day" && $("#DaysLeave_TextField").val() == "1") {
                    $("#DaysLeave_TextField").val("0.5");
                    $("#DaysLeave_Label").text("0.5");
                    $("#DaysLeave_Label_Explanation").hide();
                }
                else if ($('#FullDay_DropDownChoice option:selected').text() == "Full Day(s)" && $("#DaysLeave_TextField").val() == "0.5") {
                    $("#DaysLeave_TextField").val("1");
                    $("#DaysLeave_Label").text("1");
                    $("#DaysLeave_Label_Explanation").hide();
                }
            });
            $("#Button_ShowHistory").click(function () {
                $('#divShowLoading').text(" ... please wait ...");
                $('#divShowLoading').text("");
                $("#tableHistory").show();
                $("#tableHistory").find("tr:gt(0)").remove();
                Acme.Tools.Global.History(thisUserEmail);
            });

            // Date function sets up the Date Picker and ensures that the end date is after the start date (through the UI)	
            var dates = $("#Start_DateTimeField, #End_DateTimeField").datepicker({
                dateFormat: 'dd-mm-yy',
                firstDay: 1,
                defaultDate: "+1w",
                changeMonth: true,
                changeYear: true,
                numberOfMonths: 3,
                beforeShowDay: $.datepicker.noWeekends,
                onSelect: function (selectedDate) {
                    var option = this.id == "Start_DateTimeField" ? "minDate" : "maxDate",
	                instance = $(this).data("datepicker"),
	                date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
                    dates.not(this).datepicker("option", option, date);

                    var start = $('#Start_DateTimeField').datepicker("getDate");
                    var end = $('#End_DateTimeField').datepicker("getDate");
                    if (start != null && end != null) {
                        // Get the date diff and if > 1 day, remove the half day option
                        var diff = Math.floor((Date.parse(end) - Date.parse(start)) / 86400000); // 0 for a single day, > 0 for multiple days
                        if (diff > 0) {
                            $("#FullDay_DropDownChoice option[value='T']").remove();
                            $("#DaysLeave_TextField").val("?");
                            $("#DaysLeave_Label").text("?");
                            $("#DaysLeave_Label_Explanation").show();
                        }
                        else {
                            if ($("#FullDay_DropDownChoice option[value='T']").length == 0) {
                                $('#FullDay_DropDownChoice').append('<option value="T" >Half Day</option>');
                            }
                            if ($('#FullDay_DropDownChoice option:selected').text() == "Half Day") {
                                $("#DaysLeave_TextField").val("0.5");
                                $("#DaysLeave_Label").text("0.5");
                                $("#DaysLeave_Label_Explanation").hide();
                            }
                            else if ($('#FullDay_DropDownChoice option:selected').text() == "Full Day(s)") {
                                $("#DaysLeave_TextField").val("1");
                                $("#DaysLeave_Label").text("1");
                                $("#DaysLeave_Label_Explanation").hide();
                            }
                        }


                        // Get the calcuated days holiday required
                        $('#DaysLeave_Label_Explanation').text(" ... please wait ...");
                        oLoader = SP.UI.ModalDialog.showWaitScreenWithNoClose(SP.Res.dialogLoading15);
                        var netsuiteDayCounterUrl = "https://" + Acme.Tools.Global.NetsuiteFormsHost() + Acme.Tools.Global.NetsuiteScriptletPath() + "?script=324&deploy=1&compid=601905&h=112aec6dd53010225f84"
                        netsuiteDayCounterUrl += "&subsidiary=" + $("#Subsidiary_DropDownChoice option:selected").val();
                        netsuiteDayCounterUrl += "&startdate=" + $('#Start_DateTimeField').val().replace(/[-]/g, "/");
                        netsuiteDayCounterUrl += "&enddate=" + $('#End_DateTimeField').val().replace(/[-]/g, "/");
                        netsuiteDayCounterUrl += "&halfDay=" + $("#FullDay_DropDownChoice option:selected").val();

                        var ns = $.url.encode(netsuiteDayCounterUrl);
                        var url = Acme.Tools.Global.ProxyPage() + "?u=" + ns;
                        console.log("Acme url to proxy:" + url)
                        // Debug
                        $('#Result').html(url);
                        $('#UnecodedResult').html(netsuiteDayCounterUrl);

                        console.log('Get the calcuated days holiday required, url to send netsuite:' + url);
                        $.ajax({
                            url: url,
                            type: 'POST',
                            data: {}, // <- set="" empty="" data="" (req=""'d for post) 
                            success: function (data, textStatus) {
                                oLoader.close();
                                if (textStatus.indexOf("success") != -1) {
                                    if (isNaN(data)) {
                                        alert(data);
                                        return;
                                    }

                                    if (parseInt(data) <= 30) {
                                        if (data == "0.5") {
                                            $("#DaysLeave_TextField").val("0.5");
                                            $("#DaysLeave_Label").text("0.5");
                                        }
                                        else {
                                            $("#DaysLeave_TextField").val(parseInt(data));
                                            $("#DaysLeave_Label").text(parseInt(data));
                                        }
                                        $("#DaysLeave_Label_Explanation").hide();
                                        $('#Button_Save').removeAttr('disabled');
                                    }
                                    else {
                                        alert("Sorry, as you are requesting more than 30 days leave, please see you line manager instead of using this form.");
                                    }
                                }
                                else {
                                    alert("Sorry, there has been an error with the retrieval of the actual days required. Please check the details and try again (refresh the page).\n\nIf the error persists, please contact Mimeshare Support and notify them of the message below:\n\n\n" + data);
                                };
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                console.log("Error occured while retrieving leave request history" + xhr.status);
                                console.log(thrownError);
                            }
                        });

                    }
                }
            });
        });
        oLoader.close();
    }
    function onQueryFailed(sender, args) {
        console.log('Error: ' + args.get_message());
        thisUserEmail = "";
        oLoader.close();
    }
    console.log('leaving Acme.Tools.HumanResources.LeaveRequestv2');
}
Acme.Tools.HumanResources.NewHireRequest = function ($) {
    //get user email first, asynchronously
    //then reun the other parts also asynchronously
    var clientContext;
    var user;
    var thisUserEmail;
    var oLoader;
    var deptArray = [];

    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', getUserObject);

    console.log('in Acme.Tools.HumanResources.NewHireRequest');
    function getUserObject() {
        oLoader = SP.UI.ModalDialog.showWaitScreenWithNoClose(SP.Res.dialogLoading15);
        console.log(oLoader);
        clientContext = SP.ClientContext.get_current();
        user = clientContext.get_web().get_currentUser();
        clientContext.load(user);
        clientContext.executeQueryAsync(onQuerySucceeded, onQueryFailed);
    }
    function onQuerySucceeded() {
        thisUserEmail = user.get_email();
        $(document).ready(function () {

            $("#Button_Cancel").click(function () {
                alert("No cancel option.\n\nJust navigate away from this form.");
            });

            $('#EstimatedSalary_TextField').keyup(function () {
                this.value = this.value.replace(/[^0-9]/g, '');
            });

            $('#EstimatedHiringCosts_TextField').keyup(function () {
                this.value = this.value.replace(/[^0-9]/g, '');
            });

            $('#NewHireSubsidiary_DropDownChoice').change(function () {
                var subId = $('#NewHireSubsidiary_DropDownChoice option:selected').val();
                $('#ManagersDepartment_DropDownChoice > option').remove();
                $('#NewHireDepartment_DropDownChoice > option').remove();
                $.each(deptArray, function (i, val) {
                    if (parseInt(val[0]) == subId) {
                        $('#ManagersDepartment_DropDownChoice').append($('<option></option>').val(val[1]).html(val[2]));
                        $('#NewHireDepartment_DropDownChoice').append($('<option></option>').val(val[1]).html(val[2]));
                    }
                });
            });

            $("#Button_Save").click(function () {
                oLoader = SP.UI.ModalDialog.showWaitScreenWithNoClose(SP.Res.dialogLoading15);
                var rawNS = $.url.build({
                    protocol: 'https',
                    host: Acme.Tools.Global.NetsuiteFormsHost(),
                    path: Acme.Tools.Global.NetsuiteScriptletPath(),
                    params: {
                        script: '145',                  // NetSuite Scriptlet Information
                        deploy: '1',                    //
                        compid: '601905',               //
                        h: '19dd20f55b88377e2b03',      //

                        managerid: $('#HiringManager_TextField').val(),
                        mandepartment: $("#ManagersDepartment_DropDownChoice option:selected").val(),
                        subsidiary: $("#NewHireSubsidiary_DropDownChoice option:selected").val(),
                        employmenttype: $("#EmploymentType_DropDownChoice option:selected").val(),
                        jobtitle: $('#JobTitle_TextField').val(),
                        nhdepartment: $("#NewHireDepartment_DropDownChoice option:selected").val(),
                        salary: $('#EstimatedSalary_TextField').val(),
                        hiringcost: $('#EstimatedHiringCosts_TextField').val(),
                        eststartdate: $('#EstimatedStart_DateTimeFieldDate').val().replace(/[-]/g, ""), // Remove the dashes from the date for NetSuite ie: DDMMYYYY
                        description: $('#Comments_TextField').val()
                    }
                });

                var ns = $.url.encode(rawNS);
                var url = Acme.Tools.Global.ProxyPage() + "?u=" + ns;
                console.log("Acme url to proxy:" + url)
                $('#Result').html(url);
                $('#UnecodedResult').html(rawNS);

                $.ajax({
                    url: url,
                    type: 'POST',
                    data: {}, // <- set empty data (req'd for post) 
                    success: function (data, textStatus) {
                        if (data.indexOf("<success>") != -1) {
                            alert("You have successfully created a New Hire Request.\n\nPlease now wait for approval.");
                            location.href = self.location.href;
                        }
                        else {
                            alert("Sorry, there has been an error with the submission. Please check the details and try again.\n\nIf the error persists, please contact Mimeshare Support and notify them of the message below:\n\n\n" + data);
                        };
                        oLoader.close();
                    }
                });

            });

            $("#EstimatedStart_DateTimeFieldDate").datepicker({ dateFormat: 'dd-mm-yy' });

            $.ajax({
                type: "GET",
                url: Acme.Tools.Global.EmployeeStatusFile(),
                dataType: "xml",
                success: function (xml) {

                    // Hiring Manger (person logged in)
                    employee = $(xml).find("employee").filter(function () { return $(this).find('email').text() == thisUserEmail; });
                    hmID = employee.children('id').text();
                    supervisorID = employee.children('supervisor').text();
                    $('#HiringManager_TextField').val(hmID);
                    $('#HiringManager_Label').html(hmID + ' ( Your NetSuite ID )');

                    // Subsidiary
                    $(xml).find('subsidiary').each(function (i, sub) {
                        $id = $(this).find('id:first').text();
                        $subsidiary = $(this).find('value:first').text();
                        $('#NewHireSubsidiary_DropDownChoice').append($('<option></option>').val($id).html($subsidiary));
                        var $dept = $(sub).find('department');
                        $dept.each(function () {
                            $deptid = $(this).find('id').text();
                            $dept = $(this).find('value').text();
                            if ($id == 1) {
                                $('#ManagersDepartment_DropDownChoice').append($('<option></option>').val($id).html($dept));
                                $('#NewHireDepartment_DropDownChoice').append($('<option></option>').val($deptid).html($dept));
                            }

                            var temp = $id;
                            var deptid = $deptid;

                            deptArray.push([$id, $deptid, $dept]);
                        });

                    });



                    // Employment Type
                    $(xml).find('employmenttype').each(function () {
                        $id = $(this).find('id').text();
                        $type = $(this).find('value').text();
                        $('#EmploymentType_DropDownChoice').append($('<option></option>').val($id).html($type));

                    });


                }
            });
        });
        oLoader.close();
    }
    function onQueryFailed(sender, args) {
        console.log('Error: ' + args.get_message());
        thisUserEmail = "";
        oLoader.close();
    }
    console.log('leaving Acme.Tools.HumanResources.NewHireRequest');
}

Acme.Tools.HumanResources.NewHireRegistration = function ($) {
    //get user email first, asynchronously
    //then reun the other parts also asynchronously
    console.log('in Acme.Tools.HumanResources.NewHireRegistration');
    var clientContext;
    var user;
    var thisUserEmail;
    var oLoader;
    var deptArray = [];
    var annualLeaves = [];

    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', getUserObject);

    function getUserObject() {
        oLoader = SP.UI.ModalDialog.showWaitScreenWithNoClose(SP.Res.dialogLoading15);
        console.log(oLoader);
        clientContext = SP.ClientContext.get_current();
        user = clientContext.get_web().get_currentUser();
        clientContext.load(user);
        clientContext.executeQueryAsync(onQuerySucceeded, onQueryFailed);
    }
    function onQuerySucceeded() {
        thisUserEmail = user.get_email();
        $(document).ready(function () {

            $.ajax({
                type: "GET",
                url: Acme.Tools.Global.EmployeeStatusFile(),
                dataType: "xml",
                success: function (xml) {

                    // Supervisor
                    $(xml).find('employee').each(function () {
                        $id = $(this).find('id').text();
                        $employee = $(this).find('fullname').text();
                        $('#Supervisor_DropDownChoice').append($('<option></option>').val($id).html($employee));
                        $('#ReferringEmployee_DropDownChoice').append($('<option></option>').val($id).html($employee));
                    });

                    // Group
                    $(xml).find('group').each(function () {
                        $id = $(this).find('id').text();
                        $group = $(this).find('value').text();
                        $('#Group_DropDownChoice').append($('<option></option>').val($id).html($group));
                    });

                    // Location
                    $(xml).find('locations').find('location').each(function () {
                        $id = $(this).find('id').text();
                        $location = $(this).find('value').text();
                        $('#Location_DropDownChoice').append($('<option></option>').val($id).html($location));
                    });

                    // SubDepartment
                    $(xml).find('subdepartment').each(function () {
                        $id = $(this).find('id').text();
                        $subdepartment = $(this).find('value').text();
                        $('#SubDepartment_DropDownChoice').append($('<option></option>').val($id).html($subdepartment));
                    });


                    // Sort the Dropdowns in A-Z order
                    $("#Supervisor_DropDownChoice").html($("#Supervisor_DropDownChoice option").sort(function (a, b) {
                        return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
                    }))
                    $("#ReferringEmployee_DropDownChoice").html($("#ReferringEmployee_DropDownChoice option").sort(function (a, b) {
                        return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
                    }))
                    $("#Group_DropDownChoice").html($("#Group_DropDownChoice option").sort(function (a, b) {
                        return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
                    }))
                    $("#Location_DropDownChoice").html($("#Location_DropDownChoice option").sort(function (a, b) {
                        return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
                    }))
                    $("#SubDepartment_DropDownChoice").html($("#SubDepartment_DropDownChoice option").sort(function (a, b) {
                        return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
                    }))

                    // Subsidiary & Cost Centre
                    var count = 0;
                    $(xml).find('subsidiary').each(function (i, sub) {
                        $id = $(this).find('id:first').text();
                        $subsidiary = $(this).find('value:first').text();
                        $annualleave = $(this).find('annualleave:first').text();
                        annualLeaves.push([$id, $annualleave]);
                        if (count == 0) {
                            $("#txtAnnualLeave").val($annualleave);
                            count = 1;
                        }
                        $('#Subsidiary_DropDownChoice').append($('<option></option>').val($id).html($subsidiary));

                        var $costCentre = $(sub).find('department');
                        $costCentre.each(function () {
                            $costCentreId = $(this).find('id').text();
                            $costCentre = $(this).find('value').text();
                            if ($id == 1) {
                                $('#CostCentre_DropDownChoice').append($('<option></option>').val($costCentreId).html($costCentre));
                            }
                            deptArray.push([$id, $costCentreId, $costCentre]);
                        });
                    });
                }
            });

            $('#Subsidiary_DropDownChoice').change(function () {

                var subId = $('#Subsidiary_DropDownChoice option:selected').val();
                $("#Department_DropDownChoice > option").remove();
                $("#txtAnnualLeave").val("");

                $.each(annualLeaves, function (i, val) {
                    if (parseInt(val[0]) == subId) {
                        $("#txtAnnualLeave").val(val[1]);
                    }
                });

                $.each(deptArray, function (i, val) {
                    if (parseInt(val[0]) == subId) {
                        $('#Department_DropDownChoice').append($('<option></option>').val(val[1]).html(val[2]));
                    }
                });

            });

            $("#HireDate_DateTimeField").datepicker({ dateFormat: 'dd-mm-yy', firstDay: 1, changeMonth: true, changeYear: true, beforeShowDay: $.datepicker.noWeekends });

            $('#HireCost_TextField').keyup(function () {
                this.value = this.value.replace(/[^0-9]/g, '');
            });
            $('#txtAnnualLeave').keyup(function () {
                this.value = this.value.replace(/[^0-9]/g, '');
            });

            $('#InternalReferral_DropDownChoice').change(function () {
                if ($('#InternalReferral_DropDownChoice option:selected').text() == "Yes") {
                    $('#ReferringEmployee_Row').show();
                    $("#AgencyReferral_DropDownChoice option[value='F']").attr("selected", "selected");
                    $('#ReferringAgency_Row').hide();
                }
                else {
                    $('#ReferringEmployee_Row').hide();
                }
            });

            $('#AgencyReferral_DropDownChoice').change(function () {
                if ($('#AgencyReferral_DropDownChoice option:selected').text() == "Yes") {
                    $('#ReferringAgency_Row').show();
                    $("#InternalReferral_DropDownChoice option[value='F']").attr("selected", "selected");
                    $('#ReferringEmployee_Row').hide()
                }
                else {
                    $('#ReferringAgency_Row').hide();
                }
            });

            $('#Button_Cancel').click(function () {
                alert("No cancel option.\n\nJust navigate away from this form.");
            });

            $("#Button_Save").click(function () {
                oLoader = SP.UI.ModalDialog.showWaitScreenWithNoClose(SP.Res.dialogLoading15);
                var rawNS = $.url.build({
                    protocol: 'https',
                    host: Acme.Tools.Global.NetsuiteFormsHost(),
                    path: Acme.Tools.Global.NetsuiteScriptletPath(),
                    params: {
                        script: '94',                   // NetSuite Scriptlet Information
                        deploy: '1',                    //
                        compid: '601905',               //
                        h: '7f30edfaa3fe77e4e2ad',      //

                        title: $('#Title_TextField').val(),
                        firstname: $('#Forename_TextField').val(),
                        lastname: $('#Surname_TextField').val(),
                        supervisor: $("#Supervisor_DropDownChoice option:selected").val(),
                        department: $("#CostCentre_DropDownChoice option:selected").val(),
                        subdepartment: $("#SubDepartment_DropDownChoice option:selected").val(),
                        subsidiary: $("#Subsidiary_DropDownChoice option:selected").val(),
                        location: $('#Location_DropDownChoice').val(),
                        group: $('#Group_DropDownChoice').val(),
                        annualleave: $("#txtAnnualLeave").val(),
                        jobtitle: $('#JobTitle_TextField').val(),
                        hiredate: $('#HireDate_DateTimeField').val().replace(/[-]/g, "/"),
                        custentitynetsuitelicense: $("#NetSuite_DropDownChoice option:selected").val(),
                        custentitynewphone: $("#Phone_DropDownChoice option:selected").val(),
                        custentitynewlaptop: $("#Laptop_DropDownChoice option:selected").val(),
                        custentityhirecost: $('#HireCost_TextField').val(),
                        custentityinternalreferral: $("#InternalReferral_DropDownChoice option:selected").val(),
                        custentityemployeerefer: $("#ReferringEmployee_DropDownChoice option:selected").val(),
                        custentityrecruitmentagency: $("#AgencyReferral_DropDownChoice option:selected").val(),
                        custentityagencyused: $('#ReferringAgency_TextField').val(),
                        custentityemailcomments: $('#Comments_TextField').val()
                    }
                });


                var ns = $.url.encode(rawNS);
                var url = Acme.Tools.Global.ProxyPage() + "?u=" + ns;
                console.log("Acme url to proxy:" + url)
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: {}, // <- set empty data (req'd for post) 
                    success: function (data, textStatus) {
                        if (data.indexOf("<success>") != -1) {
                            alert("You have successfully created a New Hire Registration.");
                            location.href = self.location.href;
                        }
                        else {
                            alert("Sorry, there has been an error with the submission. Please check the details below and try again.\n\nIf the error persists, please contact Mimeshare Support and notify them of the message below:\n\n\n" + data);
                        };
                        oLoader.close();
                    }
                });
            });

        });
        oLoader.close();
    }
    function onQueryFailed(sender, args) {
        console.log('Error: ' + args.get_message());
        thisUserEmail = "";
        oLoader.close();
    }

    console.log('leaving Acme.Tools.HumanResources.NewHireRegistration');
}


Acme.Tools.HumanResources.Loading = function ($) {
    console.log('in Acme.Tools.HumanResources.Loading');
    $(document).ready(function () {
        $.widget("artistan.loading", $.ui.dialog, {
            options: {
                // your options
                spinnerClassSuffix: 'spinner',
                spinnerHtml: 'Loading',// allow for spans with callback for timeout...
                maxHeight: false,
                maxWidth: false,
                minHeight: 80,
                minWidth: 220,
                height: 80,
                width: 220,
                modal: true
            },

            _create: function () {
                $.ui.dialog.prototype._create.apply(this);
                // constructor
                $(this.uiDialog).children('*').hide();
                var self = this,
                options = self.options;
                self.uiDialogSpinner = $('.ui-dialog-content', self.uiDialog)
                    .html(options.spinnerHtml)
                    .addClass('ui-dialog-' + options.spinnerClassSuffix);
            },
            _setOption: function (key, value) {
                var original = value;
                $.ui.dialog.prototype._setOption.apply(this, arguments);
                // process the setting of options
                var self = this;

                switch (key) {
                    case "innerHeight":
                        // remove old class and add the new one.
                        self.uiDialogSpinner.height(value);
                        break;
                    case "spinnerClassSuffix":
                        // remove old class and add the new one.
                        self.uiDialogSpinner.removeClass('ui-dialog-' + original).addClass('ui-dialog-' + value);
                        break;
                    case "spinnerHtml":
                        // convert whatever was passed in to a string, for html() to not throw up
                        self.uiDialogSpinner.html("" + (value || '&#160;'));
                        break;
                }
            },
            _size: function () {
                $.ui.dialog.prototype._size.apply(this, arguments);
            },
            // other methods
            loadStart: function (newHtml) {
                if (typeof (newHtml) != 'undefined') {
                    this._setOption('spinnerHtml', newHtml);
                }
                this.open();
            },
            loadStop: function () {
                this._setOption('spinnerHtml', this.options.spinnerHtml);
                this.close();
            }
        });
    });
}

Acme.Tools.HumanResources.Loaded = function ($) {
    console.log('in Acme.Tools.HumanResources.Loaded');
    $(document).ready(function () {
        $("#loading_dialog").loading("loadStop");
    });
}

Acme.Tools.HumanResources.RenderCancel = function (recorded, leaveId, spProxyPage) {
    var markup;
    if (recorded === 'F') {
        //can cancel	
        console.log('can cancel');
        var markup = '<button type="button" name="cancel' + leaveId + '" id="cancel' + leaveId + '" onclick="Acme.Tools.HumanResources.ProcessLeaveCancellation(\'' + leaveId + '\',\'' + Acme.Tools.Global.ProxyPage() + '\');">Cancel</button>';
    }
    else {
        //cant				
        console.log('cant cancel');
    }
    return markup;

};

/* processes the users individual leave request via a NetSuite Restlet */
Acme.Tools.HumanResources.ProcessLeaveCancellation = function (leaveId, spProxyPage) {

    var oLoader = SP.UI.ModalDialog.showWaitScreenWithNoClose(SP.Res.dialogLoading15);
    var rawNS = $.url.build({
        protocol: 'https',
        host: Acme.Tools.Global.NetsuiteRestHost(),
        path: Acme.Tools.Global.NetsuiteRestletPath(),
        params: {
            script: Acme.Tools.Global.NetsuiteCancelLeaveItemRestletId(),
            deploy: '1',
            internalid: leaveId
        }
    });
    var ns = $.url.encode(rawNS);
    var url = Acme.Tools.Global.ProxyPage() + "?m=rest&u=" + ns;
    console.log("Acme ProcessLeaveCancellation url to proxy:" + url)

    $.ajax({
        url: url,
        type: 'GET',
        contentType: 'application/json',
        beforeSend: function (xhr) {
            //consider animated logo here
            $("#cancel" + leaveId).empty();
            $("#cancel" + leaveId).css("background-image", "url('../images/ajax-loader.gif')");
            $("#cancel" + leaveId).css("background-repeat", "no-repeat");
            $("#cancel" + leaveId).css("background-position", "center");
        },
        success: function (data, textStatus, xhr) {
            //ok
            console.log("Success canceling leave leavid:" + leaveId + " status:" + xhr.status);
            $("#cancel" + leaveId).parent().parent().remove();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("Error occured while cancelling leavid:" + leaveId + " status:" + xhr.status);
            console.log("Check that the CORS values are set correctly on the proxy!");
            $("#cancel" + leaveId).css("display", "block");
        },
        complete: function () {
            $.getJSON(Acme.Tools.Global.HolidayJSON($('#RequesterEmail_TextField').val()));
            oLoader.close();
        }
    });
    console.log("leaving Acme ProcessLeaveCancellation");
};
*/

//some closures to see how they are represented in the object hierarchy, how can they be indentified with potential for advice (AOP)
(function () { console.log('closure 1') })(); //??? how to advise - especially before it is executed?
(function () { console.log('closure 2') })(); //??? how to advise - especially before it is executed?
(function () { console.log('closure 3') })(); //??? how to advise - especially before it is executed?


//some web service calls
Acme.Tools.HumanResources.WeatherByCity = function (city) {
    //http://api.openweathermap.org/data/2.5/weather?q=London,uk
    var url = "http://api.openweathermap.org/data/2.5/weather?q=London,uk";
    console.log("weather rest uri:" + url)

    $.ajax({
        url: url,
        type: 'GET',
        contentType: 'application/json',
        beforeSend: function (xhr) {
            //
        },
        success: function (data, textStatus, xhr) {
            //ok
            console.log("Success: status:" + xhr.status);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("Fail: status:" + xhr.status);
        },
        complete: function () {
            //do something
        }
    });
    console.log("leaving Acme WeatherByCity");
};

Acme.Tools.HumanResources.LeaveRequest = function ($) {
    //blah
}();

function BBKAOP_getAllFunctions(object) {
    var thisFunctionName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
    var resultArray = [];
    for (var id in object) {
        try {
            if (typeof (object[id]) == "function") {
                var isThisFunction = object[id].toString().match(/function ([^\(]+)/)[1] == thisFunctionName;
                var regex = /\[native code\]/.test(object[id].toSource().toString());
                if (!regex && !isThisFunction) {
                    var isThisFunction = object[id].toString().match(/function ([^\(]+)/)[1] == thisFunctionName;
                    console.log('regex' + regex);
                    console.log('isitme:' + (object[id].toString().match(/function ([^\(]+)/)[1] == thisFunctionName));
                    console.log('function:' + object[id].toString().match(/function ([^\(]+)/)[1]);
                    console.log(isThisFunction);
                    resultArray.push(id + ": " + object[id].toSource());
                }
            }
        }
        catch (err) {
            console.log(err.message);
            resultArray.push("WARNING!!  " + id + ": this function is inaccessible");
        }
    }
    return resultArray;
}
var a = BBKAOP_getAllFunctions(this);
console.log(BBKAOP_getAllFunctions(this).join("\n\n***************************************************************************************************\n\n"));
console.log('Acme.Tools.Global namepsace');
console.log(BBKAOP_getAllFunctions(Acme.Tools.Global).join("\n\n***************************************************************************************************\n\n"));
console.log('Acme.Tools.HumanResources namepsace');
console.log(BBKAOP_getAllFunctions(Acme.Tools.HumanResources).join("\n\n***************************************************************************************************\n\n"));

