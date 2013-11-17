CategoryItemsView = Backbone.View.extend({
    
    render:function (navHtml) {
        this.template = window.templates['CategoryItemsView'];
	    var vm = {categories: this.model.toJSON(), breadcrumb: navHtml};
	    var html = this.template(vm);
	    $(this.el).html(html);
        
        $(this.el).on("click", "ul#CategoryList li", function(ev) {
            var catId = $(ev.currentTarget).attr("data-category-id");
            ev.stopPropagation();
            return go('#category/' + catId + '/1'); 
        });
        return this;
	 }    
});