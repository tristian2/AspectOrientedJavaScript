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
*/
/*
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

Acme.Tools.HumanResources.functionOne = function ($) {
    //blah
}();
Acme.Tools.HumanResources.functionTwo = function (argument) {
    //blah
}

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

Acme.Tools.HumanResources.functionThree = function ($) {
    //blah
}();

var firstRun = true;
function BBKAOP_getAllFunctions(object) {
    if (firstRun) {
        objectPath = "this"; //this is hardoded  will need to change perhaps
        firstRun = false;
    }

    var thisFunctionName = arguments.callee.toString().match(/function ([^\(]+)/)[1];
    //console.log('thisFunctionName:' + thisFunctionName);
    var resultArray = [];
    for (var id in object) {
        //console.log('id:' + id.toString());
        //console.log('object:' + object.toString());
        try {

            //for the second part we need to eschew anything other than custom objects or we will overwhelm th e browser with deep recursion potentially crashing it
            var toClass = {}.toString;

            if (typeof (object[id]) == "function") {
                var isThisFunction = '';
                try {
                    isThisFunction = object[id].toString().match(/function ([^\(]+)/)[1] == thisFunctionName;
                }
                catch(err){
                    isThisFunction = 'no';
                }
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
            // for namespaced functions, we could user recursion here?
            //need to filter out internal stuff though
            if (toClass.call(object[id]) == "[object Object]") {
                //debugger;
                objectPath = objectPath + '.' + id;
                //BBKAOP_getAllFunctions(object);
                //BBKAOP_getAllFunctions(id);                
                BBKAOP_getAllFunctions(eval(objectPath)); //!!!eval!
                objectPath=objectPath.slice(0, objectPath.lastIndexOf('.'));
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
//console.log('\n\n****Acme.Tools.Global namespace*****\n\n');
//console.log(BBKAOP_getAllFunctions(Acme.Tools.Global).join("\n\n***************************************************************************************************\n\n"));
//console.log('\n\n****Acme.Tools.HumanResources namespace*****\n\n');/
//console.log(BBKAOP_getAllFunctions(Acme.Tools.HumanResources).join("\n\n***************************************************************************************************\n\n"));

