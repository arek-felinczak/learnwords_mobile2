  
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
        //this.category = this.wineList.get(id);
        //this.wineView = new WineView({model:this.wine});
        //$('#content').html(this.wineView.render().el);
    }
});
	
var app_router = new AppRouter;
Backbone.history.start();