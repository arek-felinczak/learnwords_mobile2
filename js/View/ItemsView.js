ItemsView = Backbone.View.extend({
    pageLength: 40,	 
     
    render:function (catId, catName, pageNum) {
        pageNum = parseInt(pageNum);
        var isFavouriteList = parseInt(catId) === 0;
        
        var pageList = new Vocabulary.Pager(this.model, this.pageLength);
        var page = new ItemsCollection(pageList.getPageArray(pageNum));
        
        var pagerData = pageList.pagerDataSource("#/category/" + catId, pageNum);
        this.template = window.templates['ItemsView'];
	    var vm = {
            category: page.toJSON(), 
            pages: pagerData, 
            isFavouriteList: isFavouriteList,
            offset: (pageNum - 1) * this.pageLength,
            showPager: pagerData.length > 3,
            categoryName: catName
        };

	    var html = this.template(vm);
        return html;
	 }
});