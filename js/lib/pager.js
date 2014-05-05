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
    
    this.buttonTemplate = "<button {0} class='btn btn-info btn-lg'>{1}</button>";
    this.dropdownTemplate = "<option {2} value='{0}'> {1} </option>";
    this.listItemTemplate = "<li onclick=\"$('html, body').animate({scrollTop: 0}, 500); return go('{0}');\" class=\"pointer\"> ";
    
    this.buildOptions = function(baseUrl, lastPage, page, useIdInsteadOfPage) {
        var res = '';
        for (var i=1; i<=lastPage; i++) {
            res += this.dropdownTemplate.format({ 
                "0": baseUrl
                    .replace('{page}', useIdInsteadOfPage ? this.collection.models[i - 1].get('Id') : i)
                    .replace('{categoryId}', this.collection.models[i - 1].get('CategoryId')),
                "1": i,
                "2": page === i ? 'selected=selected' : ''
            });
        }
        return '<select class="form-control" onChange="onPageChange(this); return false;" style="width: 20%;">' + res + '</select> ';
    },
    
    this.render = function(baseUrl, page, useIdInsteadOfPage) {
        var page = parseInt(page);
        var numOfPages = this.numOfPages();
        var html = '<ul class="pagination center">';
        //prev
        var url = baseUrl.replace('{page}', useIdInsteadOfPage ? this.collection.models[0].get('Id') : 1);
        url = url.replace('{categoryId}', this.collection.models[0].get('CategoryId'));
        html += this.listItemTemplate.format({"0": url});
        html += this.buttonTemplate.format({"0": (page <= 1 ? "disabled='disabled'" : ''), "1": ' << ' });
        html += "</li>";
        
        var currPage = page;
        currPage = useIdInsteadOfPage ? this.collection.models[currPage > 1 ? currPage - 2 : 0].get('Id') : currPage;
        url = baseUrl.replace('{page}', !useIdInsteadOfPage && (currPage > 1) ? currPage - 1 : currPage);
        if (useIdInsteadOfPage) {
            url = url.replace('{categoryId}', this.collection.get(currPage).get('CategoryId'));
        }
        
        html += this.listItemTemplate.format({"0": url});
        html += this.buttonTemplate.format({"0": (page <= 1 ? "disabled='disabled'" : ''), "1": ' < ' });
        html += "</li>";
        
        html += this.buildOptions(baseUrl, numOfPages, page, useIdInsteadOfPage);
        
        var lastPage = page >= numOfPages;
        currPage = (lastPage ? page : (page + 1));
        url = baseUrl.replace('{page}', useIdInsteadOfPage ? this.collection.models[currPage - 1].get('Id') : currPage);
        if (useIdInsteadOfPage) {
            url = url.replace('{categoryId}', this.collection.models[currPage - 1].get('CategoryId'));
        }
        html += this.listItemTemplate.format({"0": url});
        html += this.buttonTemplate.format({"0": (lastPage ? "disabled='disabled'" : ''), "1": ' > ' });
        html += "</li>";
                
        url = baseUrl.replace('{page}', useIdInsteadOfPage ? this.collection.models[numOfPages - 1].get('Id') : numOfPages);
        if (useIdInsteadOfPage) {
            url = url.replace('{categoryId}', this.collection.models[numOfPages - 1].get('CategoryId'));
        }
        html += this.listItemTemplate.format({"0": url});
        html += this.buttonTemplate.format({"0": (lastPage ? "disabled='disabled'" : ''), "1": ' >> ' });
        html += "</li></ul>";
        
        return html;
    };
};