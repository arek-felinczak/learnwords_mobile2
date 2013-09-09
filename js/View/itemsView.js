ItemsView = Backbone.View.extend({
      
	 render:function (eventName) {
	    var source = $("#items-template").html();
	    var template = Handlebars.compile(source);
	    
	    var vm = {category: this.model.models, count: this.model.models.length};
	    var html = template(vm);
	    return html;
	 }
	 
	 /* events: {
            "click input[type=button]": "doSearch"
        },*/
    });
