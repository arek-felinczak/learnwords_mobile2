ExteranlPageView = Backbone.View.extend({
	 render:function(url) {
        this.template = window.templates['ExternalPage'];
        var vm = {
            src: url            
        };
        var html = this.template(vm);
        $(this.el).html(html);
        return this;
	 }    
});
