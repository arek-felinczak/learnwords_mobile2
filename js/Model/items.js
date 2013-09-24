Item = Backbone.Model.extend({
    urlRoot: window.learnwordsConfig.restUrl + "/rest_api.php/item/",
    
    defaults: {
        CategoryId: 0,
        Word: '',
        Translation1: '',
        Translation2: ''
    },
    
    initialize: function() {
        this.validators = {};
        this.validators.Word = function(value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a word"};
        };
        this.validators.Translation1 = function(value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter first translation"};
        };
        this.validators.CategoryId = function(value) {
            return value > 0 ? {isValid: true} : {isValid: false, message: "You must choose category"};
        };
    },
    validateItem: function(key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },
    validate: function() {
        for (var key in this.validators) {
            if (this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    return check.message;
                }
            }
        }
    },
});

ItemsCollection = Backbone.Collection.extend({
    model: Item,
    url: window.learnwordsConfig.restUrl + "/rest_api.php/items/",
    urlTemplate: window.learnwordsConfig.restUrl + "/rest_api.php/items/",
    page: 0,
    setCategoryId: function(catId) {
        this.url = this.urlTemplate + catId;
    },
    setQueryUrl: function() {
        this.url = this.urlTemplate + 'search';
    }
});
