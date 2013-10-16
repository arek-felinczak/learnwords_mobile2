// Router
var AppRouter = Backbone.Router.extend({ 
    routes: {
        "": "categoryList",
        "categories" : "categoryList",
        "category/:id/:page" : "category",
        "item/:catId/:id/:nr" : "item",
        "itemAddForm/:catId": "wordAddForm",
        "search": "wordSearch",
        "search/:query": "wordSearch",
        "about": "about",
        "DictSelect": "dictSelect",
        "contact": "contact",
        "favourites/:page": "favourites",
        "favouritesAdd/:catId/:id": "favouritesAdd",
        "favouritesRemove/:id": "favouritesRemove",
        "refreshCache": "refreshCache",
        "itemEditForm/:catId/:id": "wordEditForm"
    },
    manager: new VocabularyManager(),
    lastView: null,
    
    removeZombieView: function(view) {
        if (this.lastView !== null) this.lastView.remove();
        this.lastView = view;
    },
    
    refreshCache: function(force) {
        this.transitionStart();
        this.manager.reloadCache(force === undefined ? true : force, this.transitionStop);        
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
        var list = new ItemsCollection(this.manager.getFavouritesList());
        var favListView = new ItemsView({model: list});
        var nav = this.navBar('static', "Favourites");
        $('#content').html(favListView.render(0, "Favourite words", page, nav).el);
        this.removeZombieView(favListView);
    },
    
    about: function() {
        var view = new AboutView();
        $('#content').html(view.render());
        this.removeZombieView(view);
    },
    
    dictSelect: function() {
        var view = new DictSelectView();
        $('#content').html(view.render());
        this.removeZombieView(view);
    },
    
    contact:function() {
        var view = new ContactView();
        $('#content').html(view.render());
        this.removeZombieView(view);
    },
    
    categoryList:function() {
        if (window.debug_mode) console.log('AppRouter:categoryList');
        var nav = this.navBar('categoryList');
        if (this.categoryItemsView !== undefined) {
            $('#content').html(this.categoryItemsView.render(nav).el);
        }
        else {
             var self = this;
             this.manager.getCategoryList(function(modelList) {
                var categoryListView = new CategoryItemsView({model: modelList});
                self.categoryItemsView = categoryListView;
                $('#content').html(categoryListView.render(nav).el);
            });
        }
    },
 
    category:function (id, page) {
        // category = 0 = favourites list
        if (id === "0") {
            this.navigate('#favourites', true);
            return;
        }
        if (window.debug_mode) console.log('AppRouter:category');
        var self = this;
        this.manager.getItemList(id, function(categoryModel) {
            var view = new ItemsView({model: categoryModel});
            self.manager.getCategory(id, function(cat) {
                var nav = self.navBar('static', cat.get('Name'));
                $('#content').html(view.render(id, cat.get('Name'), page, nav).el);   
                self.removeZombieView(view);
            });            
        });         
    },
    
    item:function (catId, id, nr) {
        if (window.debug_mode) console.log('AppRouter:item');
        var self = this;
        this.manager.getItem(catId, id, function(item) {
            var view = new ItemView({model: item});
            self.manager.getCategory(catId, function(cat) {
                var nav = self.navBar('item', item, cat);
                $('#content').html(view.render(nr, nav, cat).el);
                self.removeZombieView(view);
            });                
        });
    },
    
    wordAddForm: function(catId) {
        if (window.debug_mode)
            console.log('AppRouter:wordAddForm');
        var item = new Item();
        var self = this;
        this.manager.getCategoryList(function(modelList) {
            var formView = new ItemFormView({model: item});
            var nav = self.navBar('ItemFormView', item, self.manager.indexOfById(catId, modelList.models));
            $('#content').html(formView.render(modelList, nav).el);
            formView.postRender();
            self.removeZombieView(formView);
        });
    },
    
    wordEditForm: function(catId, id) {
        if (window.debug_mode) console.log('AppRouter:wordEditForm');
        var self = this;
        this.manager.getItem(catId, id, function(item){
            self.manager.getCategoryList(function(modelList) {
                var formView = new ItemFormView({model: item});
                var nav = self.navBar('ItemFormView', item, self.manager.indexOfById(catId, modelList.models));
                $('#content').html(formView.render(modelList, nav).el);
                formView.postRender();
                self.removeZombieView(formView);
            });
        });
    },
    
    wordSearch: function() {
        if (window.debug_mode) console.log('AppRouter:wordSearch');
        this.transitionStart();
        var query = ' ' + $.trim($('#searchWord').val()).toLowerCase();
        var self = this;
        self.manager.getCategoryList(function(cats) {
            var res = [];
            for (var i=0; i < cats.length; i++) {
                var catItems = self.manager.getItemList(cats.models[i].get('Id'), function(items) {
                    var stop = items.models.length;
                    for(var i=0; i<stop; i++) {
                        var indexString = ' ' + items.models[i].get('Word') + ' ' + items.models[i].get('Translation1') + ' ' + items.models[i].get('Translation2');
                        indexString = indexString.replace(',', ' ').toLowerCase();
                        if (indexString.indexOf(query) > -1) res.push(items.models[i]);
                    }   
                });
            }
            var nav = self.navBar('static', 'Search results');
            var view = new ItemsView({model: new ItemsCollection(res)});
            $('#content').html(view.render(-1, "Search results", 1, nav).el);            
            self.removeZombieView(view);
            self.transitionStop();
        });
    },    
    
    transitionStart: function() {
         if (navigator.notification) 
             navigator.notification.activityStart();
         else 
             $('#app').addClass('blockUI');
    },
    transitionStop: function() {
         if (navigator.notification) 
             navigator.notification.activityStop(); 
         $('#app').removeClass('blockUI');
    },
    
    navBar: function(page, model, param) {
        return new Breadcrumb().render(page, model, param);
    }
});

function showRefreshButton(e) {
    if (navigator.notification) {
        navigator.notification.confirm(
            'Do you want to refresh data (required internet connection) ?',
            function(e) {
                if (e === 2) { app_router.refreshCache(true); }
            },
            'Exit', // title
            'Cancel,OK' // buttonLabels
            );
    }
    else{
        app_router.refreshCache(true);
    }
    return false;
}

function showExitConfirm(e) {
    navigator.notification.confirm(
        'Do you want to exit?', // message
        function(e) {if (e === 2) { navigator.app.exitApp(); }},
        'Exit', // title
        'Cancel,OK' // buttonLabels
    );
}

function toogleMenu() {
    menuDiv = document.getElementById('menuBar');
    if (menuDiv.style.display === 'none') {
        menuDiv.style.display = 'block';
        document.getElementById('footer-div').style.display = 'none';
    } else {
        menuDiv.style.display = 'none';
        document.getElementById('footer-div').style.display = 'block';
    }
}
