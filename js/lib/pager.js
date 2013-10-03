if (typeof Vocabulary === 'undefined') {
    Vocabulary = {};
}

Vocabulary.Pager = function(collection, size) {
    this.collection = collection;
    this.pageSize = size;
    
    this.numOfPages = function() {
        return Math.ceil(this.collection.length / this.pageSize);
    };

    this.getPageArray = function(page) {
        var p = parseInt(page);
        var pageArray = this.collection.models.slice((p - 1) * this.pageSize, p * this.pageSize);
        return pageArray;
    };
    
    this.pagerDataSource = function(baseUrl, page, useIdInsteadOfPage) {
        var page = parseInt(page);
        var numOfPages = this.numOfPages();
        var pagerDs = [];
        //prev
        pagerDs.push({
            url: baseUrl.replace('{page}', useIdInsteadOfPage ? this.collection.models[0].get('Id') : 1),
            page: ' << ',
            active: false,
            disabled: page === 1,
            cssClass: 'btn-info'
        });
        var currPage = (page === 1 ? 1 : (page - 1));
        currPage = useIdInsteadOfPage ? this.collection.models[currPage - 1].get('Id') : currPage;
        pagerDs.push({
            url: baseUrl.replace('{page}', currPage),
            page: ' < ',
            active: false,
            disabled: page === 1,
            cssClass: 'btn-info'
        });
        
        pagerDs.push({
            url: baseUrl.replace('{page}', useIdInsteadOfPage ? this.collection.models[page - 1].get('Id') : page),
            page: page,
            active: true,
            disabled: 'disabled',
            cssClass: 'btn-default'
        });
        
        var lastPage = page >= numOfPages;
        currPage = (lastPage ? page : (page + 1));
        pagerDs.push({
            url: baseUrl.replace('{page}', useIdInsteadOfPage ? this.collection.models[currPage - 1].get('Id') : currPage),
            page: ' > ',
            active: false,
            disabled: lastPage,
            cssClass: 'btn-info'
        });
                
        pagerDs.push({
            url: baseUrl.replace('{page}', useIdInsteadOfPage ? this.collection.models[numOfPages - 1].get('Id') : numOfPages),
            page: ' >> ',
            active: false,
            disabled: lastPage,
            cssClass: 'btn-info'
        });
        
        return pagerDs;
    };
};