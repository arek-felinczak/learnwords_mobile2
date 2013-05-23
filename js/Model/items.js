Item = Backbone.Model.extend({
	urlRoot: '/item',
	defaults: {
		CategoryId: 0,
		words: [],
		translations: []
	},
	validate: function(attributes){
		if(attributes.CategoryId == 0){
			return "Category link can't be empty";
		}
		return true;
	},
	initialize: function(){
		this.bind("error", function(model, error){
			// We have received an error, log it, alert it or forget it :)
			alert( error );
		});
	}
});

window.ItemsCollection = Backbone.Collection.extend({
    model:Item,
    url:"../items",
	page: 0
});
