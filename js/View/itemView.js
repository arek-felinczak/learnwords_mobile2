ItemView = Backbone.View.extend({
      
	 render:function (nr) {
        var word = nr === "1" ? this.model.get('Translation1') : this.model.get('Translation2');
        var url = this.buildLink(word, window.localStorage['engineLink']);
        $("iframe#DictionaryItemView").attr('src', url);
        $('div#ItemViev').show();
	 },
     
     buildLink:function (word, engineUrl) {
         return engineUrl.toString().format({ "0": word});         
     }      
});
