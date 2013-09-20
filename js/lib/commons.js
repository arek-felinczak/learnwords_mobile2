String.prototype.format = function (args) {
    var newStr = this;
    for (var key in args) {
        newStr = newStr.replace('{' + key + '}', args[key]);
    }
    return newStr;
};


function var_dump(obj) {
	var result = [];
	$.each(obj, function (key, value) { 
		result.push('"' + key + '":"' + value + '"'); 
	});
	alert( 'var_dump \n' + result.join(',\n') );
};

function showAlert(message, alertType) {
    if (alertType === undefined) alertType = 'success';
    if (alertType === 'success') var icon = 'glyphicon-ok-circle';
    if (alertType === 'info') var icon = 'glyphicon-info-sign';
    if (alertType === 'warning') var icon = 'glyphicon-remove-circle';
    $('#alert_placeholder').append('<div id="alertdiv" class="alert alert-' + alertType + ' fade in"><span class="span1 glyphicon ' + icon + ' "> &nbsp; </span> <a class="close" data-dismiss="alert">×</a> <span> ' + message + ' </span></div>')
    setTimeout(function() { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs
        $("#alertdiv").remove();
    }, 5000);
}

// This method is taken from Forvo website
function Forvo_Ext_Play(path_mp3, path_ogg)
{
    var audioTagSupport = !!(document.createElement('audio').canPlayType);
    if (audioTagSupport) {
        myAudio = new Audio();
        canPlayMp3 = ("no" != myAudio.canPlayType("audio/mpeg")) && ("" != myAudio.canPlayType("audio/mpeg"));
        canPlayOgg = ("no" != myAudio.canPlayType("audio/ogg")) && ("" != myAudio.canPlayType("audio/ogg"));
    } else {
        canPlayMp3 = false;
        canPlayOgg = false;
    }
    if (navigator.userAgent.toLowerCase().indexOf('iphone') != -1) {
        window.location.href = path_mp3;
        return false;
    } else if (canPlayMp3 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1) {
        var html = '<audio autoplay="true"><source src="' + path_mp3 + '"></audio>';
    } else if (canPlayOgg && navigator.userAgent.toLowerCase().indexOf('chrome') == -1) {
        var html = '<audio autoplay="true"><source src="' + path_ogg + '"></audio>';
    } else {
        var html = '<object type="application/x-shockwave-flash" data="http://www.forvo.com/_ext/ext.swf" height="1" width="1">'
                + '<param name="movie" value="http://www.forvo.com/_ext/ext.swf">'
                + '<param name="flashvars" value="path=' + path_mp3 + '&amp;_SERVER_HTTP_HOST=www.forvo.com">'
                + '</object>';
    }
    var container = document.getElementById('forvo_ext_player');
    container.innerHTML = html;
    return true;
}


// Asynchronously load templates located in separate .html files
// Method from backbone-cellar author: (Christophe Coenraets)
function loadTemplate(views, callback) {
    var deferreds = [];
        $.each(views, function(index, view) {
            if (window[view]) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    window[view].prototype.template = Handlebars.compile(data);
                }));
            } else {
                alert(view + " not found");
            }
        });
        $.when.apply(null, deferreds).done(callback);
}