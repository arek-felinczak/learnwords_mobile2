CategoryItemsView = Backbone.View.extend({
    
    render:function (navHtml) {
        this.template = window.templates['CategoryItemsView'];
	    var vm = {categories: this.model.toJSON(), breadcrumb: navHtml};
	    var html = this.template(vm);
	    $(this.el).html(html);
        return this;
	 }    
});