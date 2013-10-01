ItemsView = Backbone.View.extend({
    pageLength: 40,	 
     
    render:function (catId, pageNum) {
        pageNum = parseInt(pageNum);
        var isFavouriteList = parseInt(catId) === 0;
        
        var pageList = new Vocabulary.Pager(this.model, this.pageLength);
        var page = pageList.getPage(pageNum);
         
        this.template = window.templates['ItemsView'];
	    var vm = {
            category: page.toJSON(), 
            pages: pageList.pagerDataSource("#/category/" + catId, pageNum), 
            isFavouriteList: isFavouriteList,
            offset: (pageNum - 1) * this.pageLength
        };
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