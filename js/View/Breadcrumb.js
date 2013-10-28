function Breadcrumb() {
    
    this.render = function(page, model, param) {
        var html = '<ol class="breadcrumb" style="width:80%; float: left">';
        
        html += this.renderHome(page !== 'categoryList');
        if (page === 'category') {
            html += this.renderCategory(model);
        }
        else if (page === 'item') {
            html += this.renderCategory(param);
            html += this.renderItem(model);
        }        
        else if (page === 'ItemFormView') {
            html += this.renderCategory(param);
        }
        else if (model !== undefined && model !== null) {
            html += '<li>' + model + '</li>';
        }        
        html += '</ol>';
        return html;
    },
            
    this.renderHome = function(iconOnly) {
        return '<li class="link" onclick="app_router.navigate(\'#\',true);return false;"> &nbsp; <span class="glyphicon glyphicon-home"></span> ' + (iconOnly === false ?  ' &nbsp; Home' : '') + ' &nbsp; </li>';
    },
    this.renderCategory = function(model) {
        return '<li class="link" onclick="app_router.navigate(\'#category/' + model.get('Id') + '/1\',true);return false;">' + model.get('Name') + '</li>';
    };
    this.renderItem = function(model) {
        var url = "#item/" + model.get('CategoryId') + "/" + model.get('Id') + "/1";
        return '<li class="link" onclick="app_router.navigate(\'' + url + '\',true);return false;">' + model.get('Translation1') + '</li>';
    };
};