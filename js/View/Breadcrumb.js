function Breadcrumb() {
    
    this.render = function(page, model, param) {
        var html = '<ol class="breadcrumb">';
        
        html += this.renderHome();
        if (page === 'category') {
            html += this.renderCategory(model);
        }
        else if (page === 'item') {
            html += this.renderCategory(param);
            html += this.renderItem(model);
        }        
        else if (page === 'ItemFormView') {
            html += this.renderCategory(param);
            html += this.renderItem(model);
        }
        else if (model !== undefined && model !== null) {
            html += '<li>' + model + '</li>';
        }        
        html += '</ol>';
        return html;
    },
            
    this.renderHome = function() {
        return '<li class="link padding-medium" onclick="app_router.navigate(\'#\',true);return false;">Home</li>';
    },
    this.renderCategory = function(model) {
        return '<li class="link padding-medium" onclick="app_router.navigate(\'#category/' + model.get('Id') + '/1\',true);return false;">' + model.get('Name') + '</li>';
    };
    this.renderItem = function(model) {
        var url = "#item/" + model.get('CategoryId') + "/" + model.get('Id') + "/1";
        return '<li class="link padding-medium" onclick="app_router.navigate(\'' + url + '\',true);return false;">' + model.get('Translation1') + '</li>';
    };
};