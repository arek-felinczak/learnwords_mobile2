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
        else if (page === 'TestResultView') {
            html += this.renderCategory(model);
            html += '<li> Results </li>';
        }
        else if (page === 'TestView') {
            html += this.renderCategory(model);
            html += '<li> Test </li>';
        }
        else if (model !== undefined && model !== null) {
            html += '<li>' + model + '</li>';
        }        
        html += '</ol>';
        return html;
    },
            
    this.renderHome = function(iconOnly) {
        return '<li class="link" onclick="return go(\'#\');"> &nbsp; <span class="glyphicon glyphicon-home"></span> ' + (iconOnly === false ?  ' &nbsp; Home' : '') + ' &nbsp; </li>';
    },
    this.renderCategory = function(model) {
        return '<li class="link" onclick="return go(\'#category/' + model.get('Id') + '/1\')">' + model.get('Name') + '</li>';
    };
    this.renderItem = function(model) {
        var url = "#item/" + model.get('CategoryId') + "/" + model.get('Id') + "/1";
        return '<li class="link" onclick="return go(\'' + url + '\');">' + model.get('Translation1') + '</li>';
    };
};