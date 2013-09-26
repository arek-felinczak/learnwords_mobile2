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
        if (window.debug_mode) console.log('AppRouter:categoryList');
        var self = this;
        this.transitionStart();
        this.manager.getCategoryList(function(modelList) {
            var categoryListView = new CategoryItemsView({model: modelList});
            $('div#content').html(categoryListView.render());
            self.navBar(modelList);
            self.transitionStop();
        });
    },
 
    category:function (id) {
        if (window.debug_mode) console.log('AppRouter:category');
        var self = this;
        this.transitionStart();
        this.manager.getItemList(id, function(categoryModel) {
            $('div#content').html(new ItemsView({model: categoryModel}).render());
            self.manager.getCategory(id, function(cat) {self.navBar(cat)});
            self.transitionStop();
        });         
    },
    
    navBar:function(model, param) {
        $('#Breadcrumb').html(new Breadcrumb().render(model, param));
    },
    
    item:function (catId, id, nr) {
        if (window.debug_mode) console.log('AppRouter:item');
        var self = this;
        this.transitionStart();
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
                self.transitionStop();
            });
        });
    },
    
    wordAddForm:function() {
        if (window.debug_mode)
            console.log('AppRouter:wordAddForm');
        this.transitionStart();
        var item = new Item();
        var self = this;
        this.manager.getCategoryList(function(modelList) {
            var formView = new ItemFormView({model: item});
            $('div#content').html(formView.render(modelList).el);
            self.transitionStop();
            self.navBar(formView);
        });
    },
    
    wordSearch: function() {
        if (window.debug_mode)
            console.log('AppRouter:wordSearch');
        this.transitionStart();
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
            self.transitionStop();
            self.navBar(items, query);
        });
    },
    
    transitionStart: function() {
        if (window.learnwordsConfig.transitions){
            $('div#content').fadeOut(10);
        }
    },
    transitionStop: function() {
        if (window.learnwordsConfig.transitions) {
            $('div#content').fadeIn(900);
        }
   }    
});
	
loadTemplate(['CategoryItemsView', 'ItemView', 'ItemsView', 'ItemFormView'], function() {
    app_router = new AppRouter();
    Backbone.history.start();
});