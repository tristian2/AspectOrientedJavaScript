var jq = document.createElement('script');
jq.src = '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(jq);
$.noConflict();
function OnCreateDisplay() {
    var url = 'http://logservice.azurewebsites.net/Logs'
    var r = new Object();

    r.Date = '13/08/1974';
    r.Time = '12:04:00';
    r.Type = 'logic';
    r.IP = '12.12.12.12';
    r.Error = 'oh dear gone pear shaped!';

    jr = JSON.stringify(r);
    alert(jr);

    $.ajax({
        type: 'PUT',
        url: url,
        data: jr,
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            alert('success:' + xhr.responseText);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('error:' + xhr.responseText);
        }
    });
    return false;
}
OnCreateDisplay();
