Item = Backbone.Model.extend({
    urlRoot: window.learnwordsConfig.restUrl + "/rest_api.php/item",
    url: window.learnwordsConfig.restUrl + "/rest_api.php/item",
    
    defaults: {
        CategoryId: 0,
        Word: '',
        Translation1: '',
        Translation2: '',
        Id: null
    },
    
    isNew: function() {
        return this.get('Id') === null;
    },
    
    validate: function() {
        if (this.get('Word').length < 1)
            return "Word is required";
        if (this.get('Translation1').length < 1)
            return "Translation is required";
        if (parseInt(this.get('CategoryId')) < 1)
            return "Category is required";
    }
});

ItemsCollection = Backbone.Collection.extend({
    model: Item,
    url: window.learnwordsConfig.restUrl + "/rest_api.php/items/",
    urlTemplate: window.learnwordsConfig.restUrl + "/rest_api.php/items/",
    setCategoryId: function(catId) {
        this.url = this.urlTemplate + catId;
    },
    setQueryUrl: function() {
        this.url = this.urlTemplate + 'search';
    }
});
