  
// Router
var AppRouter = Backbone.Router.extend({ 
    routes: {
        "" : "categoryList",
        "category/:id" : "category"
    },
 
    categoryList:function () {
        this.categoryList = new CategoryCollection();
        this.categoryListView = new CategoryItemsView({model:this.categoryList});
       
        var ctv = this.categoryListView;
        this.categoryList.fetch({
        	success: function () {
        		$('ul#CategoryList').html(ctv.render());
        		$('div#CategoryListPanel').show();
       	    }
        });
    },
 
    category:function (id) {
        this.itemsList = new ItemsCollection();
        this.itemsList.url += id;
        this.itemsView = new ItemsView({model:this.itemsList});
       
        var ctv = this.itemsView;
        this.itemsList.fetch({
            success: function () {
                $('ul#ItemsList').html(ctv.render());
                $('div#ItemsListPanel').show();
       	    }
        });
    }
});
	
var app_router = new AppRouter;
Backbone.history.start();