// Router
var AppRouter = Backbone.Router.extend({ 
    routes: {
        "": "categoryList",
        "categories" : "categoryList",
        "category/:id" : "category",
        "item/:catId/:id/:nr" : "item",
        "itemAddForm": "wordAddForm",
        "search": "wordSearch",
        "search/:query": "wordSearch",
        "about": "about",
        "contact": "contact",
        "favourites": "favourites",
        "favouritesAdd/:catId/:id": "favouritesAdd",
        "favouritesRemove/:id": "favouritesRemove",
        "refreshCache": "refreshCache"
    },
    manager: new VocabularyManager(),
    
    refreshCache: function(force) {
        this.transitionStart();
        this.manager.reloadCache(force === undefined ? true : force);
        this.transitionStop();
    },
    
    favouritesRemove: function(id) {
        this.manager.removeFromFavourites(id);
    },
    
    favouritesAdd: function(catId, id) {
        var self = this;
        this.manager.getItem(catId, id, function(item){
            self.manager.addToFavourites(item.toJSON());
        });        
    },
    
    favourites: function() {
        if (window.debug_mode) console.log('AppRouter:favourites');
        var self = this;
        this.transitionStart();
        var list = new ItemsCollection(this.manager.getFavouritesList());
        $('div#content').html(new ItemsView({model: list}).render(true));
        var cat = new Category({Name: 'Favourites', Id: 0});
        self.navBar(cat);
        self.transitionStop();  
    },
    
    about: function() {
       $('div#content').html(new AboutView().render());
        this.navBar('About');
    },
    
    contact:function() {
        $('div#content').html(new ContactView().render());
        this.navBar('Contact');
    },
    
    categoryList:function() {
        if (window.debug_mode) console.log('AppRouter:categoryList');
        var self = this;
        this.transitionStart();
        this.manager.getCategoryList(function(modelList) {
            var categoryListView = new CategoryItemsView({model: modelList});
            $('div#content').html(categoryListView.render());
            self.navBar();
            self.transitionStop();
        });
    },
 
    category:function (id) {
        // category = 0 = favourites list
        if (id === "0") {
            this.navigate('#favourites', true);
            return;
        }
        if (window.debug_mode) console.log('AppRouter:category');
        var self = this;
        this.transitionStart();
        this.manager.getItemList(id, function(categoryModel) {
            $('div#content').html(new ItemsView({model: categoryModel}).render(false));
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
            var view = new ItemView({model: item});
            $('div#content').html(view.render(nr));
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
                view.postRender();
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
        app_router.navigate('#search/' + query, false);
        var self = this;
        this.manager.itemListBySearch(query, function(items) {
            if (items.models.length === 0) {
                showAlert("No items found.", 'warning');
                app_router.navigate('#', true);
                return;
            }
            $('div#content').html(new ItemsView({model: items}).render(false));
            $('#CategoryNameHeader').text("Search results:");
            self.transitionStop();
            self.navBar(items, query);
        });
    },
    
    transitionStart: function() {
        if (window.learnwordsConfig.transitions){
            $('div#content').fadeOut(0);
        }
    },
    transitionStop: function() {
        if (window.learnwordsConfig.transitions) {
            $('div#content').fadeIn(600);
        }
   }    
});
	
loadTemplate(['CategoryItemsView', 'ItemView', 'ItemsView', 'ItemFormView', 'AboutView', 'ContactView'], function() {
    app_router = new AppRouter();
    app_router.refreshCache(false);
    Backbone.history.start();
});
