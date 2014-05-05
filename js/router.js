// Router
var AppRouter = Backbone.Router.extend({ 
    routes: {
        "categories" : "categoryList",
        "category/:id/:page" : "category",
        "item/:catId/:id/:nr" : "item",
        "itemAddForm/:catId/:pageNum": "wordAddForm",
        "search": "wordSearch",
        "search/:query": "wordSearch",
        "about": "about",
        "DictSelect": "dictSelect",
        "contact": "contact",
        "favourites/:page": "favourites",
        "favouritesAdd/:catId/:id": "favouritesAdd",
        "favouritesRemove/:id": "favouritesRemove",
        "refreshCache": "refreshCache",
        "itemEditForm/:catId/:id": "wordEditForm",
        "test" : "test",
        "results/:catId" : "testResults",
        "*path": "categoryList"        
    },
    
    externalPage: function(url) {
        var pageView = new ExteranlPageView();
        $('#content').html(pageView.render(url).el);
        this.removeZombieView(pageView);
        app_router.navigate('#link');
        return false;
    },
    
    manager: new VocabularyManager(),
    lastView: null,
    lastCategoryId: 1,
    
    removeZombieView: function(view) {
        if (this.lastView !== null) this.lastView.remove();
        this.lastView = view;
        FastClick.attach(document.getElementById('content'));
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
    
    test:function () {
        var catId = this.lastCategoryId;
        var self = this;
        this.manager.getCategory(catId, function(cat) {
            self.manager.getItemList(catId, function(categoryModel) {
                var test = new Test().buildTest(categoryModel, catId);
                if (! test) {
                    return;
                }                
                var nav = self.navBar('TestView', cat);
                var view = new TestView({model: test, category: cat, nav: nav});                
                $('#content').html(view.render().el);   
                self.removeZombieView(view);
                view.on("save-test-result", function(res) {
                    self.manager.addTestResult(res);
                    self._testResults(cat, res);
                });
            });  
        });           
    },
    
    testResults: function(catId) {
        this.lastCategoryId = catId;
        var self = this;
        this.manager.getCategory(catId, function(cat) {
            var res = _.find(self.manager.getTestResults().models, function(r) {
                return parseInt(r.get('CategoryId')) === parseInt(catId);
            });
            self._testResults(cat, res);
        });          
    },
    
    _testResults: function(cat, res) {
        var view = new TestResultView({model: res, category: cat});
        var nav = this.navBar('TestResultView', cat);
        $('#content').html(view.render(nav).el);
        this.removeZombieView(view);
    },
    
    categoryList:function() {
        if (window.debug_mode) console.log('AppRouter:categoryList');
        var nav = this.navBar('categoryList');
        var self = this;             
        this.manager.getCategoryList(function(modelList) {
           var results = self.manager.getTestResults().models;
           var categoryListView = new CategoryItemsView({model: modelList});
           $('#content').html(categoryListView.render(nav, results).el);
           self.removeZombieView(categoryListView);
       });
    },
 
    category:function (id, page) {
        // category = 0 = favourites list
        if (id === "0") {
            this.navigate('#favourites', true);
            return;
        }
        this.lastCategoryId = id;
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
    
    wordAddForm: function(catId, page) {
        if (window.debug_mode)
            console.log('AppRouter:wordAddForm');
        var item = new Item();
        var self = this;
        this.manager.getCategoryList(function(modelList) {
            var formView = new ItemFormView({model: item});
            var nav = self.navBar('ItemFormView', item, self.manager.indexOfById(catId, modelList.models));
            $('#content').html(formView.render(modelList, catId, nav, page).el);
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
                $('#content').html(formView.render(modelList, catId, nav).el);
                formView.postRender();
                self.removeZombieView(formView);
            });
        });
    },
    
    wordSearch: function() {
        if (window.debug_mode) console.log('AppRouter:wordSearch');
        this.transitionStart();
        var query = $.trim($('#searchWord').val()).toLowerCase();
        var self = this;
        var res = [];
        self.manager.getCategoryList(function(cats) {
            for (var i=0; i < cats.length; i++) {
                self.manager.getItemList(cats.models[i].get('Id'), function(items) {
                    var stop = items.models.length;
                    for(var ii=0; ii<stop; ii++) {
                        var indexString = items.models[ii].attributes.Word + ' ' + items.models[ii].attributes.Translation1 + ' ' + items.models[ii].attributes.Translation2;
                        indexString = indexString.replace(',', ' ').toLowerCase();                        
                        if (indexString.indexOf(query) > -1) {
                            res.push(items.models[ii]);
                        }
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
