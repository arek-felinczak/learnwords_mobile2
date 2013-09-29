/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

VocabularyManager = function () {
    
    this.storage = new Vocabulary.Storage.API().open();
    this.getCategoryList = function(callback) {
        var cached = this.storage.getItem('cachedCategoryList');
        if (cached !== null) return callback(new CategoryCollection(cached));
        var self = this;
        var categoryList = new CategoryCollection();
        categoryList.fetch({
            success: function(res){
                self.storage.addItem('cachedCategoryList', res.models);
                if (window.debug_mode) console.log('VocabularyManager:getCategoryList ajax success');                
                callback(res);
            },
            error: function(err) {var_dump('Error in VocabularyManager.getCategoryList', err);}
        });        
    };
    
    this.getFavouritesList = function() {
        var list = this.storage.getItem('favouritesList');
        if (list === null) return [];
        return list;
    },
            
    this.addToFavourites = function(item) {
        var res = this.getFavouritesList();
        res.push(item);
        this.storage.addItem('favouritesList', res);
        if (window.debug_mode) console.log('VocabularyManager:addToFavourites');
    },
            
    this.removeFromFavourites = function(id) {
        id = id.toString();
        var array = this.storage.getItem('favouritesList');
        var res = jQuery.grep(array, function(value) {
            return value.Id !== id;
        });        
        this.storage.addItem('favouritesList', res);
        if (window.debug_mode) console.log('VocabularyManager:removeFromFavourites');
    },
    
    this.getCategory = function(id, callback) {
        this.getCategoryList(function(model) {    
            callback(                
                _.find(model.models, function(obj) {
                    return obj.attributes.Id === id.toString();
            }));
        });
    };
    
    this.getItemList = function (id, callback) {
        var cached = this.storage.getItem('cachedItemList:' + id);
        if (cached !== null)
            return callback(new CategoryCollection(cached));
        var self = this;
        var itemsList = new ItemsCollection();
        itemsList.setCategoryId(id);
        itemsList.fetch({
            success: function(res) {
                self.storage.addItem('cachedItemList:' + id, res.models);
                if (window.debug_mode) console.log('VocabularyManager:getCategory ajax success');
                callback(res);
            },
            error: function(err) { var_dump('Error in VocabularyManager.getItemList', err); }
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
                var_dump('Error in VocabularyManager.itemListBySearch', err);
            }});
    };
    
    this.reloadCache = function(force, callback) {
        if (force === false){
            if (this.storage.getItem('cachedCategoryList') !== null) {
                callback();
                return;            
            };
        }
        var self = this;
        this.storage.addItem('cachedCategoryList', null);
        this.getCategoryList(function(cats) {
            if (window.debug_mode) console.log('VocabularyManager:reloadCache');
            _.rest(cats).models.forEach(function(obj) {
                self.getItemList(obj.get('Id'), function() {});
            });
            // last call will trigger callback
            self.getItemList(_.first(cats).get('Id'), callback);
        });
    };
};
