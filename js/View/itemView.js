ItemView = Backbone.View.extend({
      
	 render:function () {
        var word = this.options.nr === "1" ? this.model.attributes.Translation1 : this.model.attributes.Translation2;
        var url = this.buildLink(word, window.localStorage['engineLink']);
        $("iframe#DictionaryItemView").attr('src', url);
        $('div#ItemViev').show();
	 },
     
     buildLink:function (word, engineUrl) {
         return engineUrl.toString().format({ "0": word});         
     }      
});
