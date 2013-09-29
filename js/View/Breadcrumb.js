function Breadcrumb() {
    
    this.render = function(page, model, param) {
        var html = '<ol class="breadcrumb">';
        
        html += this.renderHome();
        if (page === 'category') {
            html += this.renderCategory(model);
            $('#CategoryNameHeader').text(model.get('Name'));
        }
        else if (page === 'item') {
            html += this.renderCategory(param);
            html += this.renderItem(model, param);
        }        
        else if (page === 'itemsCollection') {
            html += this.renderSearch(param);            
        }        
        else if (page === 'ItemFormView') {
            html += '<li><a href="#itemAddForm">Add new word form</a></li>';
        }
        else if (model !== undefined && model !== null) {
            html += '<li> ' + model + '</li>';
        }
        
        html += '</ol>';
        return html;
    },
            
    this.renderHome = function() {
        return '<li><a href="#">Categories</a></li>';
    },
            
    this.renderSearch = function(param) {
        return '<li><a href="#search">Search</a></li><li><a href="#search">' + param + '</a></li>';
    },
    
    this.renderCategory = function(model) {
        return '<li><a href="#category/' + model.get('Id') + '">' + model.get('Name') + '</a></li>';
    };
    
    this.renderItem = function(model) {
        var url = "#item/" + model.get('CategoryId') + "/" + model.get('Id') + "/1";
        return '<li><a href="' + url + '">' + model.get('Word') + '</a></li>';
    };
};