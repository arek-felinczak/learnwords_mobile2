Category = Backbone.Model.extend({
	
	defaults: {
		Name: '',
		Id: 0,
		Public: true,
		Owner: ''
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
    url:"http://vocabulary.cba.pl/rest_api.php/categories",
    initialize:function(){
        console.log('Start load category list');
    },
});


// var c = new Category;
// c.set({ Name: "Test", Active: false }); 

// c.save({Name: 'Test 2'}, {
	// success: function (model) {
		// alert(user.toJSON());
	// }
// });