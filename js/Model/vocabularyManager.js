/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

VocabularyManager = function () { 
    this.categoryList = function(callback) {
        var categoryList = new CategoryCollection();
        var defer = categoryList.fetch({
            success: callback !== undefined ? callback : function() {}
        });        
        return defer;
    };
    
    this.category = function(id, callback) {
        return $.when(this.categoryList()).then(
            function(model) {
                var category = _.find(model.models, function(obj) {
                    return obj.attributes.Id === id.toString();
                });
                if (callback !== undefined) callback(category);
                return category;
            }
        );
    };
    
    this.itemList = function (id, callback) {
        var itemsList = new ItemsCollection();
        itemsList.setCategoryId(id);
        var defer = itemsList.fetch({
            success: callback !== undefined ? callback : function() {}
        });
        return defer;
    };
    
    this.item = function(catId, id, callback) {
        return $.when(this.itemList(catId)).then(
            function(model) {
                var item = _.find(model.models, function(obj) {
                    return obj.attributes.Id === id.toString();
                });
                if (callback !== undefined)
                    callback(item);
                return item;
            }
        );
    };
    
    this.indexOfById = function(id, array) {
        var item = _.find(model.models, function(obj) {
            return obj.attributes.Id === id.toString();
        });        
    }
    
    this.itemListBySearch = function(query, callback) {
        var itemsList = new ItemsCollection();
        itemsList.setQueryText(query);
        var defer = itemsList.fetch({
            success: callback !== undefined ? callback : function() {
            }
        });
        return defer;
    };
};
