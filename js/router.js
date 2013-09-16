// Router
var AppRouter = Backbone.Router.extend({ 
    routes: {
        "" : "categoryList",
        "categories" : "categoryList",
        "category/:id" : "category",
        "item/:id/:nr" : "item"
    },
    
    categoryList:function (renderFunc) {
        if (renderFunc === undefined){
            renderFunc = function() {
                $('div.panel').hide();
                $('div#CategoryList').html(categoryListView.render());
                $('div#CategoryListPanel').show();
            }
        }
        var categoryList = new CategoryCollection();
        var categoryListView = new CategoryItemsView({model: categoryList});
       
        var defer = categoryList.fetch({
            cache: true,
            success: renderFunc
        });
        return defer;
    },
 
    category:function (id) {
        var itemsList = new ItemsCollection();
        itemsList.url += id;
        var itemsView = new ItemsView({model:itemsList});
        itemsList.fetch({
            cache: true,
            success: function () {
                $('div.panel').hide();
                $('div#ItemsList').html(itemsView.render());
                $('div#ItemsListPanel').show();
       	    }
        });
        this.categoryList(
            function(model) {
                var cat = _.find(model.models, function(obj) {
                    return obj.attributes.Id === id.toString()
                });
                $('#currentCategoryNav').text(cat.attributes.Name).attr('href', '#category/' + cat.attributes.Id);
        });
    },
    
    item:function (id, nr) {
        var item = new Item({id: id});
        item.fetch({
            cache: true,
            success: function () {
                $('div.panel').hide();
                new ItemView({model:item, nr:nr}).render();
       	    }
        });
    }
});
	
var app_router = new AppRouter;
Backbone.history.start();