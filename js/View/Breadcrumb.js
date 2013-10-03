function Breadcrumb() {
    
    this.render = function(page, model, param) {
        var html = '<ol class="breadcrumb-buttons">';
        
        html += this.renderHome();
        if (page === 'category') {
            html += this.renderCategory(model);
        }
        else if (page === 'item') {
            html += this.renderCategory(param);
            html += this.renderItem(model);
            html += this.renderEditItem(model);
        }        
        else if (page === 'ItemFormView') {
            html += this.renderCategory(param);
            html += this.renderItem(model);
            html += '<li><button class="btn btn-default" disabled>Edit form</button></li>';
        }
        else if (model !== undefined && model !== null) {
            html += '<li><button class="btn btn-default" disabled> ' + model + '</button></li>';
        }        
        html += '</ol>';
        return html;
    },
            
    this.renderHome = function() {
        return '<li><button class="btn btn-default" onclick="app_router.navigate(\'#\',true);return false;">Categories</button></li>';
    },
    this.renderCategory = function(model) {
        return '<li><button class="btn btn-default" onclick="app_router.navigate(\'#category/' + model.get('Id') + '/1\',true);return false;">' + model.get('Name') + '</button></li>';
    };
    this.renderItem = function(model) {
        var url = "#item/" + model.get('CategoryId') + "/" + model.get('Id') + "/1";
        return '<li><button class="btn btn-default" onclick="app_router.navigate(\'' + url + '\',true);return false;">' + model.get('Translation1') + '</button></li>';
    };
    this.renderEditItem = function(model) {
        var url = "#itemEditForm/" + model.get('CategoryId') + "/" + model.get('Id');
        return '<li><button class="btn btn-default" onclick="app_router.navigate(\'' + url + '\',true);return false;"> &gt; edit</button></li>';
    };
};