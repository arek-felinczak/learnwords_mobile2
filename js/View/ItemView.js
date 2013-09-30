ItemView = Backbone.View.extend({
      
	 render:function (nr) {
        this.template = window.templates['ItemView'];
        var word = nr === "1" ? this.model.get('Translation1') : this.model.get('Translation2');
        var url = this.buildLink(word, window.localStorage['dictionaryLink']);
        var vm = {src: url};
        var html = this.template(vm);
        if (window.localStorage['dictionaryLink'] === window.learnwordsConfig.getionary) {
            var waveFile = 'http://www.getionary.pl/speak.wav?text=' + encodeURI(word.replace(/(<([^>]+)>)/ig, ''));
            Forvo_Ext_Play(null, null, waveFile);
        }
        return html;
	 },
     
     buildLink:function (word, engineUrl) {
         return engineUrl.toString().format({ "0": word});         
     },
        
});


function LoadForvoLink(word) {
    app_router.transitionStart();
    url = window.learnwordsConfig.forvo.replace('{0}', word);
    var url = 'http://apifree.forvo.com/key/fecc801770209d5b7b0ed138946d6bd3/format/json/callback/pronounce/action/standard-pronunciation/word/' + encodeURI(word) + '/language/en/order/rate-desc/limit/2';
    $.ajax({
        url: url,
        jsonpCallback: "pronounce",
        dataType: "jsonp",
        type: "jsonp",
        success: function(json) {
            if (window.debug_mode)
                console.log('LoadForvoLink: ' + JSON.stringify(json));
            var mp3 = json.items[0].pathmp3;
            var ogg = json.items[0].pathogg;
            Forvo_Ext_Play(mp3, ogg);
            app_router.transitionStop();
        },
        error: function(err) {
            app_router.transitionStop();
            var_dump('Error in LoadForvoLink', err);
        }});
    return false;
}