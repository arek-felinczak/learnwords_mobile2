ItemsView = Backbone.View.extend({
      
	 render:function (isFavouriteList) {
        this.template = window.templates['ItemsView'];
	    var vm = {category: this.model.toJSON(), count: this.model.models.length, isFavouriteList: isFavouriteList};
        $('ul.navbar-nav li.active').removeClass('active');
        if (isFavouriteList) {
            $('ul.navbar-nav li#favourites').addClass('active');
        } else {
            $('ul.navbar-nav li#categories').addClass('active');
        }
	    var html = this.template(vm);
        return html;
	 }
});