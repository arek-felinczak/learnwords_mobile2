function Breadcrumb() {
    
    this.render = function(page, model, param) {
        var html = '<ol class="breadcrumb">';
        
        html += this.renderHome();
        if (page === 'category') {
            html += this.renderCategory(model);
        }
        else if (page === 'item') {
            html += this.renderCategory(param);
            html += this.renderItem(model, param);
        }        
        else if (page === 'ItemFormView') {
            html += '<li><button class="btn btn-info btn-lg" onclick="app_router.navigate(\'#itemAddForm\',true);return false;">Add/Edit word form</button></li>';
        }
        else if (model !== undefined && model !== null) {
            html += '<li> ' + model + '</li>';
        }        
        html += '</ol>';
        return html;
    },
            
    this.renderHome = function() {
        return '<li><button class="btn btn-info btn-lg" onclick="app_router.navigate(\'#\',true);return false;">Categories</button></li>';
    },
    this.renderCategory = function(model) {
        return '<li><button class="btn btn-info btn-lg" onclick="app_router.navigate(\'#category/' + model.get('Id') + '/1\',true);return false;">' + model.get('Name') + '</button></li>';
    };
    this.renderItem = function(model) {
        var url = "#itemEditForm/" + model.get('CategoryId') + "/" + model.get('Id');
        return '<li><button class="btn btn-info btn-lg" onclick="app_router.navigate(\'' + url + '\',true);return false;">' + model.get('Translation1') + '</button></li>';
    };
};