String.prototype.format = function (args) {
    var newStr = this;
    for (var key in args) {
        newStr = newStr.replace('{' + key + '}', args[key]);
    }
    return newStr;
};

function showAlert(message, alertType) {
    if (alertType === undefined) alertType = 'success';
    if (alertType === 'success') var icon = 'glyphicon-ok-circle';
    if (alertType === 'info') var icon = 'glyphicon-info-sign';
    if (alertType === 'warning') var icon = 'glyphicon-remove-circle';
    $('#alert_placeholder').append('<div id="alertdiv" class="alert alert-' + alertType 
        + ' fade in"><span class="span1 glyphicon ' + icon + ' "> &nbsp; </span> <a class="close" data-dismiss="alert">×</a> <span> ' + message 
        + ' </span></div>');
    setTimeout(function() { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs
        $("#alertdiv").remove();
    }, 5000);
}

function Forvo_Ext_Play(path)
{
    if (path === null) {
        alert('Playing audio files is not supported by your device.');
        return;
    }
    
    try {
        var audio = new Media(path);
        audio.play();
        return true;
    } catch (err) { 
        if (document.URL.indexOf('http://') === -1) {
            alert('Playing audio files is not supported by your device - media object not found.');
        }
    }
 
    var html = '<audio autoplay="true"><source src="' + path + '"></audio>';   
    var container = document.getElementById('forvo_ext_player');
    container.innerHTML = html;
    return true;
}

// Asynchronously load templates located in separate .html files
// Method from backbone-cellar author: (Christophe Coenraets)
function loadTemplate(views, callback) {
    var deferreds = [];
    window.templates = {};
    $.each(views, function(index, view) {
        var deffer = $.ajax({
            url: 'tpl/' + view + '.tpl',
            type: "GET",
            dataType: "text",
            success: function(data) {
                window.templates[view] = Handlebars.compile(data);
            },
            error: function(xhr) {
                console.log('Error loading template ' + view);
                alert(xhr.responseText);
            }
        });
        deferreds.push(deffer);
    });
    $.when.apply(null, deferreds).done(callback);
}

function go(url) {    
    app_router.navigate(url, true);
    return false;
}