// Router
var AppRouter = Backbone.Router.extend({ 
    routes: {
        "": "categoryList",
        "categories" : "categoryList",
        "category/:id" : "category",
        "item/:catId/:id/:nr" : "item",
        "itemAddForm": "wordAddForm"
    },
    manager: new VocabularyManager(),
    
    categoryList:function() {
        var defer = this.manager.categoryList();
        $.when(defer).then(function(modelList) {
            var categoryListView = new CategoryItemsView({model: modelList});
            $('div.panel').hide();
            $('ul.navbar-nav li.active').removeClass('active');
            $('ul.navbar-nav li').eq(0).addClass('active');
            $('div#CategoryList').html(categoryListView.render());
            $('div#CategoryListPanel').show();
        });
    },
 
    category:function (id) {
        this.manager.itemList(id, function(categoryModel) {
            $('div.panel').hide();
            $('div#ItemsList').html(new ItemsView({model: categoryModel}).render());
            $('div#ItemsListPanel').show();
        });
        this.categoryNavBar(id);
    },
    
    categoryNavBar:function(id) {
        var defer = this.manager.category(id);
        $.when(defer).then(function(cat) {
            $('#currentCategoryNav').text(cat.get('Name')).attr('href', '#category/' + cat.get('Id'))
            $('ul.navbar-nav li.active').removeClass('active');
            $('ul.navbar-nav a#currentCategoryNav').parent().addClass('active');
        });
    },
    
    item:function (catId, id, nr) {
        var self = this;
        var deferItem = this.manager.item(catId, id, function(item) {
            $('div.panel').hide();
            new ItemView({model: item}).render(nr);
            return item;
        });
        var defer = this.manager.itemList(catId);
        $.when(deferItem, defer).then(function(item, items) {
            var index = item.collection.indexOf(item);
            // previous button
            var prevDomElement = $("ul#itemPager li a#prev");
            var prev = items.at(index - 1);
            if (prev === null) {
                $(prevDomElement).removeAttr('href').parent().addClass('disabled');               
            } else {
                $(prevDomElement).attr('href', '#item/' + item.get('CategoryId') + '/' + prev.get('Id') + '/1')
                    .parent().removeClass('disabled');
            }
            // next button
            var nextDomElement = $("ul#itemPager li a#next");
            var next = items.at(index + 1);
            if (next === null) {
                $(nextDomElement).removeAttr('href').parent().addClass('disabled');
            } else {
                $(nextDomElement).attr('href', '#item/' + item.get('CategoryId') + '/' + next.get('Id') + '/1')
                    .parent().removeClass('disabled');
            }
            self.categoryNavBar(item.get('CategoryId'));
        });
    },
    
    wordAddForm:function() {
        var item = new Item();
        var defer = this.manager.categoryList();
        $.when(defer).then(function(modelList) {
            $('div.panel').hide();
            $('div#ItemAddForm div.row').html(new ItemFormView({model: item}).render(modelList).el);
            $('div#ItemAddForm').show();
        });
    },   
});
	
var app_router = new AppRouter;
Backbone.history.start();