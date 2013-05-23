Category = Backbone.Model.extend({
	urlRoot: '/category',
	defaults: {
		Name: '',
		Id: 0,
		Active: true
	},
	validate: function(attributes){
		if(attributes.Name == null || attributes.Name.length == 0){
			return "Category name can't be empty";
		}
		return true;
	},
	initialize: function(){
		this.bind("error", function(model, error){
			// use jsconsole in future
			alert(error);
		});
		this.on("change:Name", function(model){
			var name = model.get("Name");
			alert("Changed my name to " + name );
		});
	}
});

CategoryCollection = Backbone.Collection.extend({
    model:Category,
    url:"../categories"
});


// var c = new Category;
// c.set({ Name: "Test", Active: false }); 

// c.save({Name: 'Test 2'}, {
	// success: function (model) {
		// alert(user.toJSON());
	// }
// });