ItemsView = Backbone.View.extend({
      
	 render:function (eventName) {
	    var source = $("#items-template").html();
	    var template = Handlebars.compile(source);
	    
        if (this.model.models.length == 0){
            return "No items found."
        }
        
        var vm = {category: this.model.toJSON(), count: this.model.models.length};
	    var html = template(vm);
        return html;
	 }
	 
	 /* events: {
            "click input[type=button]": "doSearch"
        },*/
    });
