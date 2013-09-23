// Router
var AppRouter = Backbone.Router.extend({ 
    routes: {
        "": "categoryList",
        "categories" : "categoryList",
        "category/:id" : "category",
        "item/:catId/:id/:nr" : "item",
        "itemAddForm": "wordAddForm",
        "search/:query": "wordSearch"        
    },
    manager: new VocabularyManager(),
    
    categoryList:function() {
        this.manager.categoryList(function(modelList) {
            var categoryListView = new window.CategoryItemsView({model: modelList});
            $('div#content').html(categoryListView.render());
        });
    },
 
    category:function (id) {
        var self = this;
        this.manager.itemList(id, function(categoryModel) {
            $('div#content').html(new ItemsView({model: categoryModel}).render());
            self.categoryNavBar(id);
        });         
    },
    
    categoryNavBar:function(id) {
        this.manager.category(id, function(cat) {
            $('#currentCategoryNav').text(cat.get('Name')).attr('href', '#category/' + cat.get('Id'));
            $('#CategoryNameHeader').text("Categories > " + cat.get('Name') + ":");
            $('ul.navbar-nav li.active').removeClass('active');
            $('ul.navbar-nav a#currentCategoryNav').parent().addClass('active');
        });
    },
    
    item:function (catId, id, nr) {
        var self = this;
        this.manager.item(catId, id, function(item) {
            $('div#content').html(new ItemView({model: item}).render(nr));
            self.manager.itemList(catId, function(items) {
                var index = item.collection.indexOf(item);
                // previous button
                var prevDomElement = $("ul#itemPager li a#prev");
                var prev = items.at(index - 1);
                if (prev === undefined) {
                    $(prevDomElement).removeAttr('href').parent().addClass('disabled');
                } else {
                    $(prevDomElement).attr('href', '#item/' + item.get('CategoryId') + '/' + prev.get('Id') + '/1')
                            .parent().removeClass('disabled');
                }
                // next button
                var nextDomElement = $("ul#itemPager li a#next");
                var next = items.at(index + 1);
                if (next === undefined) {
                    $(nextDomElement).removeAttr('href').parent().addClass('disabled');
                } else {
                    $(nextDomElement).attr('href', '#item/' + item.get('CategoryId') + '/' + next.get('Id') + '/1')
                            .parent().removeClass('disabled');
                }
                self.categoryNavBar(item.get('CategoryId'));
            });
        });
    },
    
    wordAddForm:function() {
        var item = new Item();
        this.manager.categoryList(function(modelList) {
            $('div#content').html(new ItemFormView({model: item}).render(modelList).el);
        });
    },
    
    wordSearch: function() {
        var query = $.trim($('#searchWord').val());
        app_router.navigate('#search/' + query,false);
        this.manager.itemListBySearch(query, function(items) {
            if (items.models.length === 0) {
                showAlert("No items found.", 'warning');
                app_router.navigate('#', true);
                return;
            }
            $('div#content').html(new ItemsView({model: items}).render());
            $('#CategoryNameHeader').text("Search results:");
        });
    }
});
	
loadTemplate(['CategoryItemsView', 'ItemView', 'ItemsView', 'ItemFormView'], function() {
    app_router = new AppRouter();
    Backbone.history.start();
});