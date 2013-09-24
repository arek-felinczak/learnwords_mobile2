CategoryItemsView = Backbone.View.extend({
    
    render:function (eventName) {
        this.template = window.templates['CategoryItemsView'];
        $('ul.navbar-nav li.active').removeClass('active');
        $('ul.navbar-nav li').eq(0).addClass('active');
        
	    var vm = {categories: this.model.toJSON()};
	    var html = this.template(vm);
	    return html;
	 }
});
