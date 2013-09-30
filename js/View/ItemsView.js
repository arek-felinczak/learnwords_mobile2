ItemsView = Backbone.View.extend({
      
	 render:function (isFavouriteList) {
        this.template = window.templates['ItemsView'];
	    var vm = {category: this.model.toJSON(), count: this.model.models.length, isFavouriteList: isFavouriteList};
        $('#main-navbar-nav li.active').removeClass('active');
        if (isFavouriteList) {
            $('#main-navbar-nav li#favourites').addClass('active');
        } else {
            $('#main-navbar-nav li#categories').addClass('active');
        }
	    var html = this.template(vm);
        return html;
	 },
     
     postRender: function(eventName) {
        // attach speach
        var prons = $('#items-table .play-selector');
        var self = this;
        $(prons).click(function(event) {
            event.stopPropagation();
            var word = $(event.currentTarget).attr('word');
            LoadForvoLink(word);
            return false;
        });
        
        // attach favourites
        // attach open dict
        var links = $('#items-table button#remove-favourites');
        $(links).click(function(event) {
            event.stopPropagation();
            var obj = $(event.currentTarget);
            var id = obj.attr('word-id');
            app_router.favouritesRemove(id);
            $(obj).parents('tr').remove();
            return false;
        });
        
        var links = $('#items-table button#add-favourites');
        $(links).click(function(event) {
            event.stopPropagation();
            var obj = $(event.currentTarget);
            var id = obj.attr('word-id');
            var catId = obj.attr('cat-id');
            app_router.favouritesAdd(catId, id);
            $(obj).css('visibility', 'hidden');
            return false;
        });
    }
});