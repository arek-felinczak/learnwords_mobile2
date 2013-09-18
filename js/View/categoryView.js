 CategoryItemsView = Backbone.View.extend({
      
	 render:function (eventName) {
	    var source = $("#categories-template").html();
	    var template = Handlebars.compile(source);
	    
	    var vm = {categories: this.model.toJSON()};
	    var html = template(vm);
	    return html;
	 }
	 
	 /* events: {
            "click input[type=button]": "doSearch"
        },*/
    });
