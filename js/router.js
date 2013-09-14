// Router
var AppRouter = Backbone.Router.extend({ 
    routes: {
        "" : "categoryList",
        "categories" : "categoryList",
        "category/:id" : "category",
        "item/:id/:nr" : "item"
    },
    
    CategoriesCache: null,
    CategoryId: 1,
    
    getCategoriesPromise: function() {
        if (this.CategoriesCache === null) {
            var that = this;
            var categoryList = new CategoryCollection();
            var promise = categoryList.fetch({
                success: function() {
                    that.CategoriesCache = categoryList.models;
                }
            });
            return promise;
        }        
        return this.CategoriesCache;
    },
    
    categoryList:function () {
        var categoryList = new CategoryCollection();
        var categoryListView = new CategoryItemsView({model: categoryList});
       
        var ctv = categoryListView;
        var that = this;
        categoryList.fetch({
        	success: function () {
                that.CategoriesCache = categoryList.models;
                $('div.panel').hide();
        		$('div#CategoryList').html(ctv.render());
        		$('div#CategoryListPanel').show();
       	    }
        });
    },
 
    category:function (id) {
        this.CategoryId = id;
        var itemsList = new ItemsCollection();
        itemsList.url += id;
        var itemsView = new ItemsView({model:itemsList});
        var that = this;
        itemsList.fetch({
            success: function () {
                $('div.panel').hide();
                $('div#ItemsList').html(itemsView.render());
                $('div#ItemsListPanel').show();
       	    }
        });
        var categories = that.getCategoriesPromise();
        $.when(categories).then(function() {
            var cat = _.find(that.CategoriesCache, function(obj) {
                return obj.attributes.Id === that.CategoryId.toString()
            });
            $('#currentCategoryNav').text(cat.attributes.Name).attr('href', '#category/' + cat.attributes.Id);
        });
    },
    
    item:function (id, nr) {
        var item = new Item({id: id});
        item.fetch({
            success: function () {
                $('div.panel').hide();
                new ItemView({model:item, nr:nr}).render();
       	    }
        });
    }
});
	
var app_router = new AppRouter;
Backbone.history.start();