function OnCreateDisplay() {
        $('#DisplayInfoLoader').html('<span style="color: orange;">Creating object....</span>');
        $('#DisplayInfoLoader').fadeIn(1000);

        // var url = "http://" + ip + ":8989/Service.svc/Displays(" + NextDisplayID + "L)";
        var url = "http://logservice.azurewebsites.net/Logs";
        var r = new Object();
        // r.RowId = 4;// NextDisplayID + "L";
        r.Date = "13/08/1974";//$("#FDisplayName").val();
        r.Time = "12:04:00";// $("#FDisplayCode").val();
        r.Type = "logic";// $("#FDisplayStatus").val();
        r.IP = "12.12.12.12"; //selected_project + "L";
        r.Error = "oh dear gone pear shaped!";// $("#FDisplayDescription").val();

        jr = JSON.stringify(r);
        alert(jr);
        $('#DisplayInfoLoader').html(jr);

        $.ajax({
            type: "POST",
            url: "http://logservice.azurewebsites.net/Logs",
            data: jr,
            contentType: "application/json; charset=utf-8",
            beforeSend: function ( xhr ) {                
                xhr.setRequestHeader('Access-Control-Request-Method', 'GET');
                xhr.setRequestHeader('Access-Control-Request-Headers', 'X-Requested-With');
                xhr.withCredentials = true;
            },
            success: function (result) {
                console.log("success:" + xhr.responseText);
                $('#DisplayInfoLoader').html('<span style="color: green;">Display created....</span>');
                $('#DisplayInfoLoader').fadeOut(3000);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log("error:" + xhr.responseText);
                //$('#DisplayInfoLoader').html('<span style="color: red;">An Error occured....</span>');
                $('#error').html(xhr.responseText);
                $('#DisplayInfoLoader').fadeOut(3000);
            }
        });

    //LoadProjectDisplays();

    return false;
}
OnCreateDisplay();