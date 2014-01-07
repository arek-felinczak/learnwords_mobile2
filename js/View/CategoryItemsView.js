CategoryItemsView = Backbone.View.extend({
    
    render:function (navHtml, results) {
        this.template = window.templates['CategoryItemsView'];
        
        var resultsPerCategory = {};
        var resultsPerCategoryCssClass = {};
        for (var i=0; i<results.length; i++) {
            resultsPerCategory[results[i].get('CategoryId')] = results[i].get('Score');
            resultsPerCategoryCssClass[results[i].get('CategoryId')] = results[i].get('Score') > 8 ? 
                "success" : "";
        }
        
        var vm = { categories: this.model.toJSON(), 
            scores: resultsPerCategory, 
            scoresCss: resultsPerCategoryCssClass, 
            breadcrumb: navHtml};
        var html = this.template(vm);
        $(this.el).html(html);
        
        $(this.el).on("click", ".category-link", function(ev) {
            var catId = $(ev.currentTarget).attr("data-category-id");
            ev.stopPropagation();
            return go('#category/' + catId + '/1'); 
        });
        
        $(this.el).on("click", ".test-result-link", function(ev) {
            var catId = $(ev.currentTarget).attr("data-category-id");
            var res = $(ev.currentTarget).attr("data-result");
            if (res === "") return false;
            ev.stopPropagation();
            return go('#results/' + catId); 
        });
        
        return this;
    }    
});