Category = Backbone.Model.extend({
	
    defaults: {
        Name: '',
        Id: null,
        Public: true,
        Owner: ''
    },
    
    isNew: function() {
        return this.get('Id') == null;
    },
    
    validate: function(){
        if(this.attributes.Name === null || this.attributes.Name.length === 0){
            return "Category name can't be empty";
        }
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
    model: Category,
    url: window.learnwordsConfig.restUrl + "/rest_api.php/categories"
});