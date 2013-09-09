ItemView = Backbone.View.extend({
      
	 render:function () {
        var url = this.model.get('Link')
	    $("iframe#DictionaryItemView").attr('src', url);
        $('div#ItemViev').show();
	 }
});
