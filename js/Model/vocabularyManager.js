/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

VocabularyManager = function () {
    
    this.cachedCategoryList = null,
    this.getCategoryList = function(callback) {
        if (this.cachedCategoryList !== null) 
            return callback(this.cachedCategoryList);
        var self = this;
        var categoryList = new CategoryCollection();
        categoryList.fetch({
            success: function(res){
                self.cachedCategoryList = res;
                callback(res);
            },
            error: function(err) {var_dump(err);}
        });        
    };
    
    this.getCategory = function(id, callback) {
        this.getCategoryList(function(model) {
            callback(                
                _.find(model.models, function(obj) {
                    return obj.attributes.Id === id.toString();
            }));
        });
    };
    
    this.cachedItemList = [],
    this.getItemList = function (id, callback) {
        if (this.cachedItemList[id] !== undefined)
            return callback(this.cachedItemList[id]);
        var self = this;
        var itemsList = new ItemsCollection();
        itemsList.setCategoryId(id);
        itemsList.fetch({
            success: function(res) {
                self.cachedItemList[id] = res;
                callback(res);
            },
            error: function(err) { var_dump(err); }
        });
    };
    
    this.getItem = function(catId, id, callback) {
        this.getItemList(catId, function(model) {
            var item = _.find(model.models, function(obj) {
                return obj.attributes.Id === id.toString();
            });
            if (callback !== undefined)
                callback(item);
            return item;
        });
    };
    
    this.indexOfById = function(id, array) {
        return _.find(array, function(obj) {
            return obj.attributes.Id === id.toString();
        });        
    };
    
    this.itemListBySearch = function(query, callback) {
        var itemsList = new ItemsCollection();
        itemsList.setQueryUrl();
        itemsList.fetch({data: {query: query}, type: 'POST',
            success: callback, 
            error: function(err) {
                var_dump(err);
            }});
    };
};
