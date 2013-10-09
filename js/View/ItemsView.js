ItemsView = Backbone.View.extend({
    pageLength: 20,	 
     
    render:function (catId, catName, pageNum, navHtml) {
        pageNum = parseInt(pageNum);
        var isFavouriteList = parseInt(catId) === 0;
        var url = "#category/" + catId + '/{page}';
        
        var pageList = new Vocabulary.Pager(this.model, this.pageLength);
        var page = new ItemsCollection(pageList.getPageArray(pageNum));
        
        var pagerData = pageList.pagerDataSource(url, pageNum);
        this.template = window.templates['ItemsView'];
	    var vm = {
            category: page.toJSON(), 
            pages: pagerData, 
            isFavouriteList: isFavouriteList,
            offset: (pageNum - 1) * this.pageLength,
            showPager: pageList.numOfPages() > 1,
            breadcrumb: navHtml,
            emptyList: page.length === 0,
            CategoryId: catId
        };

	    var html = this.template(vm);
        $(this.el).html(html);
        return this;
	 }
});