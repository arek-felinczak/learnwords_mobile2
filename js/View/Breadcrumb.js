Breadcrumb = function() {
    
    this.render = function(model, param) {
        var html = '<ol class="breadcrumb">';
        $('ul.navbar-nav li.active').removeClass('active');
        $('ul.navbar-nav a#DictionaryItemNav').parent().addClass('active');
        
        html += this.renderHome();
        if (model instanceof Category) {
            html += this.renderCategory(model);
            $('#CategoryNameHeader').text(model.get('Name'));
        }
        else if (model instanceof Item) {
            html += this.renderCategory(param);
            html += this.renderItem(model, param);
        }        
        else if (model instanceof ItemsCollection) {
            html += this.renderSearch(param);            
        }        
        else if (model instanceof ItemFormView) {
            html += '<li><a href="#itemAddForm">Add new word form</a></li>';
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