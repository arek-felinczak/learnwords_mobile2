// Router
var AppRouter = Backbone.Router.extend({ 
    routes: {
        "" : "categoryList",
        "category/:id" : "category",
        "item/:id" : "item"
    },
 
    categoryList:function () {
        this.categoryList = new CategoryCollection();
        this.categoryListView = new CategoryItemsView({model:this.categoryList});
       
        var ctv = this.categoryListView;
        this.categoryList.fetch({
        	success: function () {
                $('div.panel').hide();
        		$('#CategoryList').html(ctv.render());
        		$('div#CategoryListPanel').show();
       	    }
        });
    },
 
    category:function (id) {
        var itemsList = new ItemsCollection();
        itemsList.url += id;
        var itemsView = new ItemsView({model:itemsList});
        itemsList.fetch({
            success: function () {
                $('div.panel').hide();
                $('ul#ItemsList').html(itemsView.render());
                $('div#ItemsListPanel').show();
       	    }
        });
    },
    
    item:function (id) {
        var item = new Item({id: id});
        item.fetch({
            success: function () {
                $('div.panel').hide();
                new ItemView({model:item}).render();
       	    }
        });
    }
});
	
var app_router = new AppRouter;
Backbone.history.start();