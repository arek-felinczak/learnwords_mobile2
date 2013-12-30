VocabularyManager = function () {
    window.AppCache = {};
    this.storage = new Vocabulary.Storage.API().open();
    
    this.getCategoryList = function(callback) {
        // in memory cache Backbone collections
        var cachedInMemory = window.AppCache['cachedCategoryList'];
        if (cachedInMemory !== undefined) return callback(cachedInMemory);
        // local storage cache - serialized objects
        var cached = this.storage.getItem('cachedCategoryList');
        if (cached !== null) {
            window.AppCache['cachedCategoryList'] = new CategoryCollection(cached);
            return callback(window.AppCache['cachedCategoryList']);
        }
        var self = this;
        var categoryList = new CategoryCollection();
        categoryList.fetch({
            success: function(res){
                window.AppCache['cachedCategoryList'] = res;
                self.storage.addItem('cachedCategoryList', res.models);
                if (window.debug_mode) console.log('VocabularyManager:getCategoryList ajax success');                
                callback(res);
            },
            error: function(err) {alert('Error loading category list. Check internet connection.');}
        });        
    };
    
    this.getTestResults = function() {
        var res = this.storage.getItem('testResults');
        return new TestCollection(res);
    },
            
    this.addTestResult = function(item) {
        var res = this.getTestResults();
        var prevRes = _.find(res.models, function(i){
            return i.get('CategoryId') === item.get('CategoryId');
        });
        if (! prevRes) res.add(item);
        else { 
            var prevResOnIndex = _.indexOf(res.models, prevRes);
            res.models[prevResOnIndex] = item;
        }
        this.storage.addItem('testResults', res);
        if (window.debug_mode) console.log('VocabularyManager:addTestResult');
    },
    
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
        var cacheKey = 'cachedItemList:' + id;
        // in memory cache Backbone collections
        var cachedInMemory = window.AppCache[cacheKey];
        if (cachedInMemory !== undefined) return callback(cachedInMemory);
        
        var cached = this.storage.getItem(cacheKey);
        if (cached !== null)
        {
            window.AppCache[cacheKey] = new ItemsCollection(cached);
            return callback(window.AppCache[cacheKey]);
        }
        var self = this;
        var itemsList = new ItemsCollection();
        itemsList.setCategoryId(id);
        itemsList.fetch({
            success: function(res) {
                window.AppCache[cacheKey] = res;
                self.storage.addItem(cacheKey, res.models);
                if (window.debug_mode) console.log('VocabularyManager:getCategory ajax success');
                callback(res);
            },
            error: function(err) { alert('Error loading words list. Check internet connection.'); }
        });
    };
    
    this.getItem = function(catId, id, callback) {
        return this.getItemList(catId, function(model) {
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
    
    this.itemListBySearch = function(query, callback, callbackFailed) {
        var itemsList = new ItemsCollection();
        itemsList.setQueryUrl();
        itemsList.fetch({data: {query: query}, type: 'POST',
            success: callback, 
            error: function() {
                if (callbackFailed !== undefined) callbackFailed();
                else alert("Error occured while search. Check internet connection.");
            }
        });
    };
    
    this.reloadCache = function(force, callback) {
        if (force === false) {
            if (this.storage.getItem('cachedCategoryList') !== null) {
                callback();
                return;            
            };
        }
        var self = this;
        window.AppCache = {};
        this.storage.addItem('cachedCategoryList', null);
        this.getCategoryList(function(cats) {
            if (window.debug_mode) console.log('VocabularyManager:reloadCache');
            _.rest(cats.models).forEach(function(obj) {
                self.clearSingleCategoryCache(obj.get('Id'));
                self.getItemList(obj.get('Id'), function() {});
            });
            // last call will trigger callback
            self.clearSingleCategoryCache(cats.models[0].get('Id'));
            self.getItemList((cats.models[0]).get('Id'), callback);
        });
    };
    
    this.clearSingleCategoryCache = function(catId) {
        this.storage.addItem('cachedItemList:' + catId, null);
    };
};
