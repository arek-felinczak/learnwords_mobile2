CategoryItemsView = Backbone.View.extend({
    
    render:function (navHtml, results) {
        this.template = window.templates['CategoryItemsView'];
        
        var resultsPerCategory = {};
        for (var i=0; i<results.length; i++) {
            resultsPerCategory[results[i].get('CategoryId')] = results[i].get('Score');
        }
        
        var vm = {categories: this.model.toJSON(), scores: resultsPerCategory, breadcrumb: navHtml};
	    var html = this.template(vm);
	    $(this.el).html(html);
        
        $(this.el).on("click", "ul#CategoryList li .category-link", function(ev) {
            var catId = $(ev.currentTarget).parents('li').attr("data-category-id");
            ev.stopPropagation();
            return go('#category/' + catId + '/1'); 
        });
        
        $(this.el).on("click", "ul#CategoryList li .test-result-link", function(ev) {
            var catId = $(ev.currentTarget).parents('li').attr("data-category-id");
            ev.stopPropagation();
            return go('#results/' + catId); 
        });
        
        return this;
    }    
});