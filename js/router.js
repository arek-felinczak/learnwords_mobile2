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
        "refreshCache": "refreshCache",
        "itemEditForm/:catId/:id": "wordEditForm",
    },
    manager: new VocabularyManager(),
    
    refreshCache: function(force) {
        this.busyStart();
        this.manager.reloadCache(force === undefined ? true : force, this.busyStop);        
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
        var favListView = new ItemsView({model: list});
        $('div#content').html(favListView.render(true));
        var cat = new Category({Name: 'Favourites', Id: 0});
        self.navBar('category', cat);
        favListView.postRender();
        self.transitionStop();  
    },
    
    about: function() {
       $('div#content').html(new AboutView().render());
        this.navBar('static', 'About');
    },
    
    contact:function() {
        $('div#content').html(new ContactView().render());
        this.navBar('static', 'Contact');
    },
    
    categoryList:function() {
        if (window.debug_mode) console.log('AppRouter:categoryList');
        var self = this;
        this.transitionStart();
        this.manager.getCategoryList(function(modelList) {
            var categoryListView = new CategoryItemsView({model: modelList});
            $('div#content').html(categoryListView.render());
            self.navBar('');
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
            var view = new ItemsView({model: categoryModel});
            $('div#content').html(view.render(false));
            view.postRender();
            self.manager.getCategory(id, function(cat) {self.navBar('category', cat);});
            self.transitionStop();
        });         
    },
    
    navBar:function(page, model, param) {
        $('#Breadcrumb').html(new Breadcrumb().render(page, model, param));
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
                var prevDomElement = $("button#prev");
                var prev = items.at(index - 1);
                if (prev === undefined) {
                    $(prevDomElement).parent().addClass('disabled');
                } else {
                    $(prevDomElement).text(' << ' + prev.get('Translation1'))
                        .click(function(event) {
                            event.stopPropagation();
                            app_router.navigate("#item/" + item.get('CategoryId') + "/" + prev.get('Id') + "/" + 1, true);
                            return false;
                        }).parent().removeClass('disabled');
                }
                // next button
                var nextDomElement = $("button#next");
                var next = items.at(index + 1);
                if (next === undefined) {
                    $(nextDomElement).parent().addClass('disabled');
                } else {
                    $(nextDomElement).text(next.get('Translation1') + ' >> ')
                        .click(function(event) {
                            event.stopPropagation();
                            app_router.navigate("#item/" + item.get('CategoryId') + "/" + next.get('Id') + "/" + 1, true);
                            return false;
                        }).parent().removeClass('disabled');
                }                
                self.manager.getCategory(catId, function(cat){
                    self.navBar('item', item, cat);
                });
                self.transitionStop();
            });
        });
    },
    
    wordAddForm: function() {
        if (window.debug_mode)
            console.log('AppRouter:wordAddForm');
        this.transitionStart();
        var item = new Item();
        var self = this;
        this.manager.getCategoryList(function(modelList) {
            var formView = new ItemFormView({model: item});
            $('div#content').html(formView.render(modelList).el);
            self.transitionStop();
            self.navBar('ItemFormView', formView);
        });
    },
    
    wordEditForm: function(catId, id) {
        if (window.debug_mode) console.log('AppRouter:wordEditForm');
        this.transitionStart();
        var self = this;
        this.manager.getItem(catId, id, function(item){
            self.manager.getCategoryList(function(modelList) {
                var formView = new ItemFormView({model: item});
                $('div#content').html(formView.render(modelList).el);
                formView.postRender();
                self.navBar('ItemFormView', formView);
                self.transitionStop();                
            });
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
            self.navBar('itemsCollection', items, query);
        });
    },
    
    transitionStart: function() {
        if (window.learnwordsConfig.transitions) {
            $('div#app').addClass('blockUI');
        }
    },
    transitionStop: function() {
        if (window.learnwordsConfig.transitions) {
            $('div#app').removeClass('blockUI');
        }
   },
   busyStart: function() {
        if (navigator.notification) navigator.notification.activityStart();
   },
   busyStop: function() {
        if (navigator.notification) navigator.notification.activityStop(); 
   }
});
	
loadTemplate(['CategoryItemsView', 'ItemView', 'ItemsView', 'ItemFormView', 'AboutView', 'ContactView'], function() {
    app_router = new AppRouter();
    app_router.refreshCache(false);
    Backbone.history.start();
    linksAttachOnclick();
});
