ItemView = Backbone.View.extend({
	 render:function(nr, navHtml, cat) {
        var item = this.model; 
        var index = item.collection.indexOf(item);
        this.template = window.templates['ItemView'];
        var word = nr === "1" ? this.model.get('Translation1') : this.model.get('Translation2');
        var url = this.buildLink(word, window.localStorage['dictionaryLink']);
        
        var pageList = new Vocabulary.Pager(item.collection, 1);
        var pager = pageList.render('#item/' + item.get("CategoryId") + '/{page}/' + nr, index + 1, 'Translation1', true);
        var vm = {
            src: url,
            pager: pager,
            breadcrumb: navHtml,
            model: item.toJSON(),
            category: cat.toJSON()
        };
        var html = this.template(vm);
        $(this.el).html(html);
        return this;
	 },     
     buildLink:function (word, engineUrl) {
         return engineUrl.toString().format({ "0": word});         
     }        
});

function LoadSpeechLink(word, catId, id) {
    var words = word.split(" ");
    if (words.length > 1) {
        // take longest one
        word = _.last(_.sortBy(words, function(w){ return w.length; }));
    }
    
    app_router.transitionStart();
    var url = window.learnwordsConfig['proxyUrl'] + "/getSpeechData.php?type=mp3&dict=" + window.localStorage.speechEngine + "&word=" + encodeURI(word);
    $.ajax({
        url: url,
        jsonpCallback: "pronounce",
        dataType: "jsonp",
        type: "jsonp",
        crossDomain: true,
        timeout: 10000,
        success: function(json) {
            if (window.debug_mode) console.log('LoadSpeechLink: ' + JSON.stringify(json));
            var audio = json['mp3'];
            if (audio !== "" && audio !== null)
                Forvo_Ext_Play(audio);
            else {
                Forvo_Ext_Play(window.location.origin + window.location.pathname + 'themes/beep.' + player);
            }
            app_router.transitionStop();
        }}).error(function(qXHR, status, err) {
        app_router.transitionStop();
        alert('Cannot play audio file. Check internet connection or change speech engine.');
        app_router.transitionStop();
    });
    return false;
}