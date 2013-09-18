// Router
var AppRouter = Backbone.Router.extend({ 
    routes: {
        "": "categoryList",
        "categories" : "categoryList",
        "category/:id" : "category",
        "item/:id/:nr" : "item"
    },
    manager: new VocabularyManager(),
    
    categoryList:function() {
        var defer = this.manager.categoryList();
        $.when(defer).then(function(modelList) {
            var categoryListView = new CategoryItemsView({model: modelList});
            $('div.panel').hide();
            $('ul.navbar-nav li.active').removeClass('active');
            $('ul.navbar-nav li').eq(0).addClass('active');
            $('div#CategoryList').html(categoryListView.render());
            $('div#CategoryListPanel').show();
        });
    },
 
    category:function (id) {
        var itemsList = new ItemsCollection();
        itemsList.url += id;
        var itemsView = new ItemsView({model:itemsList});
        itemsList.fetch({
            cache: true,
            success: function () {
                $('div.panel').hide();
                $('ul.navbar-nav li.active').removeClass('active');
                $('ul.navbar-nav a#currentCategoryNav').parent().addClass('active');
                $('div#ItemsList').html(itemsView.render());
                $('div#ItemsListPanel').show();
       	    }
        });
        var defer = this.manager.categoryList();
        $.when(defer).then(function(model) {
            var cat = _.find(model.models, function(obj) {
                return obj.attributes.Id === id.toString();
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