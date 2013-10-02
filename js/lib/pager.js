if (typeof Vocabulary === 'undefined') {
    Vocabulary = {};
}

Vocabulary.Pager = function(collection, size) {
    this.collection = collection;
    this.pageSize = size;
    
    this.numOfPages = function() {
        return parseInt(this.collection.length / (this.pageSize + 1)) + 1;
    };

    this.getPageArray = function(page) {
        var p = parseInt(page);
        var pageArray = this.collection.models.slice((p - 1) * this.pageSize, p * this.pageSize);
        return pageArray;
    };
    
    this.pagerDataSource = function(baseUrl, page, attrName) {
        var page = parseInt(page);
        var numOfPages = this.numOfPages();
        var pagerDs = [];
        //prev
        pagerDs.push({
            url: baseUrl.replace('{page}', 1),
            page: ' << ',
            active: false,
            disabled: page === 1,
            cssClass: 'btn-info'
        });
        var currPage = (page === 1 ? 1 : (page - 1));
        pagerDs.push({
            url: baseUrl.replace('{page}', currPage),
            page: ' < '+ ((this.pageSize === 1 && page > 1) ? this.collection.models[page - 2].get(attrName) : ""),
            active: false,
            disabled: page === 1,
            cssClass: 'btn-info'
        });
        
        pagerDs.push({
            url: baseUrl.replace('{page}', page),
            page: page,
            active: true,
            disabled: 'disabled',
            cssClass: 'btn-default'
        });
        
        var lastPage = page >= numOfPages;
        currPage = (lastPage ? page : (page + 1));
        pagerDs.push({
            url: baseUrl.replace('{page}', currPage),
            page: ' > '+ ((this.pageSize === 1 && page < numOfPages) ? this.collection.models[page].get(attrName) : ""),
            active: false,
            disabled: lastPage,
            cssClass: 'btn-info'
        });
                
        pagerDs.push({
            url: baseUrl.replace('{page}', numOfPages),
            page: ' >> ',
            active: false,
            disabled: lastPage,
            cssClass: 'btn-info'
        });
        
        return pagerDs;
    };
};