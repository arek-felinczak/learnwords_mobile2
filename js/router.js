// Router
var AppRouter = Backbone.Router.extend({ 
    routes: {
        "": "categoryList",
        "categories" : "categoryList",
        "category/:id" : "category",
        "item/:catId/:id/:nr" : "item",
        "itemAddForm": "wordAddForm",
        "search": "wordSearch",
        "search/:query": "wordSearch"
    },
    manager: new VocabularyManager(),
    
    categoryList:function() {
        var self = this;
        this.manager.getCategoryList(function(modelList) {
            var categoryListView = new window.CategoryItemsView({model: modelList});
            $('div#content').html(categoryListView.render());
            self.navBar(modelList);
        });
    },
 
    category:function (id) {
        var self = this;
        this.manager.getItemList(id, function(categoryModel) {
            $('div#content').html(new ItemsView({model: categoryModel}).render());
            self.manager.getCategory(id, function(cat) {self.navBar(cat)});
        });         
    },
    
    navBar:function(model, param) {
        $('#Breadcrumb').html(new Breadcrumb().render(model, param));
    },
    
    item:function (catId, id, nr) {
        var self = this;
        this.manager.getItem(catId, id, function(item) {
            $('div#content').html(new ItemView({model: item}).render(nr));
            self.manager.getItemList(catId, function(items) {
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
                self.manager.getCategory(catId, function(cat){
                    self.navBar(item, cat);
                });                
            });
        });
    },
    
    wordAddForm:function() {
        var item = new Item();
        var self = this;
        this.manager.getCategoryList(function(modelList) {
            var formView = new ItemFormView({model: item});
            $('div#content').html(formView.render(modelList).el);
            self.navBar(formView);
        });
    },
    
    wordSearch: function() {
        var query = $.trim($('#searchWord').val());
        app_router.navigate('#search/' + query,false);
        var self = this;
        this.manager.itemListBySearch(query, function(items) {
            if (items.models.length === 0) {
                showAlert("No items found.", 'warning');
                app_router.navigate('#', true);
                return;
            }
            $('div#content').html(new ItemsView({model: items}).render());
            $('#CategoryNameHeader').text("Search results:");
            self.navBar(items, query);
        });
    }
});
	
loadTemplate(['CategoryItemsView', 'ItemView', 'ItemsView', 'ItemFormView'], function() {
    app_router = new AppRouter();
    Backbone.history.start();
});