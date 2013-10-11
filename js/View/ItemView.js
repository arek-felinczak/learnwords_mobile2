ItemView = Backbone.View.extend({
      
	 render:function(nr, navHtml, cat) {
        var item = this.model; 
        var index = item.collection.indexOf(item);
        this.template = window.templates['ItemView'];
        var word = nr === "1" ? this.model.get('Translation1') : this.model.get('Translation2');
        var url = this.buildLink(word, window.localStorage['dictionaryLink']);
        
        var pageList = new Vocabulary.Pager(item.collection, 1);
        var pager = pageList.pagerDataSource('#item/' + item.get("CategoryId") + '/{page}/' + nr, index + 1, 'Translation1', true);
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
    app_router.transitionStart();
    
    var url = window.learnwordsConfig['restUrl'] + "/getSpeechData.php?dict=" + window.localStorage.speechEngine + "&word=" + encodeURI(word);
    $.ajax({
        url: url,
        jsonpCallback: "pronounce",
        dataType: "jsonp",
        type: "jsonp",
        crossDomain: true,
        timeout: 6000,
        success: function(json) {
            if (window.debug_mode) console.log('LoadSpeechLink: ' + JSON.stringify(json));
            var mp3 = json.mp3;
            var ogg = json.ogg;
            var duration = json.duration;
            if (mp3 != "" || ogg != "")
                Forvo_Ext_Play(mp3, ogg);
            else if (navigator.notification !== undefined) {
                navigator.notification.beep();
            }
            app_router.transitionStop();
        }}).error(function(qXHR, status, err) {
        app_router.transitionStop();
        alert('Connection to Speech engine failed. Check internet connection.');
    });
       
    return false;
}