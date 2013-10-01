// Router
var AppRouter = Backbone.Router.extend({ 
    routes: {
        "": "categoryList",
        "categories" : "categoryList",
        "category/:id/:page" : "category",
        "item/:catId/:id/:nr" : "item",
        "itemAddForm": "wordAddForm",
        "search": "wordSearch",
        "search/:query": "wordSearch",
        "about": "about",
        "contact": "contact",
        "favourites/:page": "favourites",
        "favouritesAdd/:catId/:id": "favouritesAdd",
        "favouritesRemove/:id": "favouritesRemove",
        "refreshCache": "refreshCache",
        "itemEditForm/:catId/:id": "wordEditForm"
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
    
    favourites: function(page) {
        if (window.debug_mode) console.log('AppRouter:favourites');
        var self = this;
        this.transitionStart();
        var list = new ItemsCollection(this.manager.getFavouritesList());
        var favListView = new ItemsView({model: list});
        $('#content').html(favListView.render(0, page));
        var cat = new Category({Name: 'Favourites', Id: 0});
        self.navBar('category', cat);
        new FastClick(document.getElementById('content'));
        self.transitionStop();  
    },
    
    about: function() {
       $('#content').html(new AboutView().render());
        this.navBar('static', 'About');
    },
    
    contact:function() {
        $('#content').html(new ContactView().render());
        this.navBar('static', 'Contact');
    },
    
    categoryList:function() {
        if (window.debug_mode) console.log('AppRouter:categoryList');
        var self = this;
        this.transitionStart();
        this.manager.getCategoryList(function(modelList) {
            var categoryListView = new CategoryItemsView({model: modelList});
            $('#content').html(categoryListView.render());
            self.navBar('');
            new FastClick(document.getElementById('content'));
            self.transitionStop();
        });
    },
 
    category:function (id, page) {
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
            $('#content').html(view.render(id, page));
            self.manager.getCategory(id, function(cat) {self.navBar('category', cat);});
            new FastClick(document.getElementById('content'));
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
            $('#content').html(view.render(nr));
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
                new FastClick(document.getElementById('content'));
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
            $('#content').html(formView.render(modelList).el);
            new FastClick(document.getElementById('content'));
            self.navBar('ItemFormView', formView);
            self.transitionStop();
        });
    },
    
    wordEditForm: function(catId, id) {
        if (window.debug_mode) console.log('AppRouter:wordEditForm');
        this.transitionStart();
        var self = this;
        this.manager.getItem(catId, id, function(item){
            self.manager.getCategoryList(function(modelList) {
                var formView = new ItemFormView({model: item});
                $('#content').html(formView.render(modelList).el);
                formView.postRender();
                new FastClick(document.getElementById('content'));
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
            $('#content').html(new ItemsView({model: items}).render(-1, 1));
            $('#CategoryNameHeader').text("Search results:");
            new FastClick(document.getElementById('content'));
            self.navBar('itemsCollection', items, query);
            self.transitionStop();            
        });
    },    
    transitionStart: function() {
        $('#app').addClass('blockUI').addClass('ui-disabled');
    },
    transitionStop: function() {
        $('#app').removeClass('blockUI').removeClass('ui-disabled');
    },
    busyStart: function() {
         if (navigator.notification) 
             navigator.notification.activityStart();
         else 
             $('#app').addClass('blockUI').addClass('ui-disabled');
    },
    busyStop: function() {
         if (navigator.notification) 
             navigator.notification.activityStop(); 
         else 
             $('#app').removeClass('blockUI').removeClass('ui-disabled');
    }
});
	
loadTemplate(['CategoryItemsView', 'ItemView', 'ItemsView', 'ItemFormView', 'AboutView', 'ContactView'], function() {
    app_router = new AppRouter();
    app_router.refreshCache(false);
    Backbone.history.start();
    linksAttachOnclick();
});
