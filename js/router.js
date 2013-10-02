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
        this.transitionStart();
        var list = new ItemsCollection(this.manager.getFavouritesList());
        var favListView = new ItemsView({model: list});
        this.content = favListView.render(0, "Favourite words", page);
        this.navBar('static', "Favourites");
        this.transitionStop();  
    },
    
    about: function() {
        this.content = new AboutView().render();
        this.navBar('static', 'About');
    },
    
    contact:function() {
        this.content = new ContactView().render();
        this.navBar('static', 'Contact');
    },
    
    categoryList:function() {
        if (window.debug_mode) console.log('AppRouter:categoryList');
        var self = this;
        this.transitionStart();
        this.manager.getCategoryList(function(modelList) {
            var categoryListView = new CategoryItemsView({model: modelList});
            self.content = categoryListView.render();
            self.navBar('');
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
            self.manager.getCategory(id, function(cat) {
                self.content = view.render(id, cat.get('Name'), page);
                self.navBar('static', cat.get('Name'));
                self.transitionStop();
            });            
        });         
    },
    
    item:function (catId, pageId, nr) {
        if (window.debug_mode) console.log('AppRouter:item');
        var self = this;
        this.transitionStart();
        this.manager.getItemList(catId, function(items) {
            var item = items.models[pageId - 1];
            var view = new ItemView({model: item});
            self.content = view.render(nr, item);
            self.manager.getCategory(catId, function(cat) {
                self.navBar('item', item, cat);
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
            self.content = formView.render(modelList);
            self.navBar('static', "add word");
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
                self.content = formView.render(modelList);
                self.navBar('ItemFormView', formView);
                formView.postRender();
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
            self.content = new ItemsView({model: items}).render(-1, "Search results", 1);
            self.navBar('static', 'Search results');
            self.transitionStop();            
        });
    },    
    transitionStart: function() {
        //$('#app').addClass('blockUI');
    },
    transitionStop: function() {
        //$('#app').removeClass('blockUI');
    },
    busyStart: function() {
         if (navigator.notification) 
             navigator.notification.activityStart();
         else 
             $('#app').addClass('blockUI');
    },
    busyStop: function() {
         if (navigator.notification) 
             navigator.notification.activityStop(); 
         else 
             $('#app').removeClass('blockUI');
    },
    
    navBar: function(page, model, param) {
        this.breadcrumb = new Breadcrumb().render(page, model, param);
        this.appendHtmlToDocument();
    },
    
    content: '',
    breadcrumb: '',
    appendHtmlToDocument: function(){
        document.getElementById('app').innerHTML = this.breadcrumb + this.content;
        this.content = '';
        this.breadcrumb = '';        
    }
});
	
loadTemplate(['CategoryItemsView', 'ItemView', 'ItemsView', 'ItemFormView', 'AboutView', 'ContactView'], function() {
    app_router = new AppRouter();
    app_router.refreshCache(false);
    Backbone.history.start();
});
