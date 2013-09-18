/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

VocabularyManager = function () { 
    this.categoryList = function(useCache) {
        if (useCache === undefined) useCache = true;
        var categoryList = new CategoryCollection();
        var defer = categoryList.fetch({
            cache: useCache,
        });        
        return defer;
    };
    
    this.category = function(id) {
        $.when(this.categoryList).then(
            function(model) {
                return _.find(model.models, function(obj) {
                    return obj.attributes.Id === id.toString();
                });
            }
        );
    };
    
    this.itemList = function (useCache) {
        if (useCache === undefined)
            useCache = true;
        var itemsList = new ItemsCollection();
        return itemsList.fetch({
            cache: true
        });
    };
    
    this.item = function(id) {
        var item = new Item({id: id});
        return item.fetch({
            cache: true
        });
    };
};
