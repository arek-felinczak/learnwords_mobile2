ItemsView = Backbone.View.extend({
      
	 render:function (eventName) {
        this.template = window.templates['ItemsView'];
	    var vm = {category: this.model.toJSON(), count: this.model.models.length};
	    var html = this.template(vm);
        return html;
	 }
	 
	 /* events: {
            "click input[type=button]": "doSearch"
        },*/
    });
