Item = Backbone.Model.extend({
    urlRoot: window.learnwordsConfig.restUrl + "/rest_api.php/item/",
    
    defaults: {
        CategoryId: 0,
        Word: '',
        Translation1: '',
        Translation2: '',
        Id: 0,
        Link: ''
    },
    validate: function(attributes){
        if(attributes.CategoryId == 0){
            return "Category link can't be empty";
        }
        return false;
    },
    initialize: function(){
        this.bind("error", function(model, error){
            // We have received an error, log it, alert it or forget it :)
            alert( error );
        });
	}
});

ItemsCollection = Backbone.Collection.extend({
    model: Item,
    url: window.learnwordsConfig.restUrl + "/rest_api.php/items/",
    page: 0,
});
