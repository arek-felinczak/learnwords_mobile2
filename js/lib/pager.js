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
    
    this.pagerDataSource = function(baseUrl, page) {
        var page = parseInt(page);
        var pagerDs = [];
        //prev
        pagerDs.push({
            url: baseUrl + "/" + (page === 1 ? 1 : (page - 1)),
            page: ' << ',
            active: false,
            disabled: page === 1 
        });
        
        for (i=0; i<this.numOfPages(); i++) {
            pagerDs.push({
                url: baseUrl + "/" + (i+1),
                page: i + 1,
                active: (i+1) === page,
                disabled: false
            });
        }
        //next
        var lastPage = page >= this.numOfPages();
        pagerDs.push({
            url: baseUrl + "/" + (lastPage ? page : (page + 1)),
            page: ' >> ',
            active: false,
            disabled: lastPage
        });
        
        return pagerDs;
    };
};