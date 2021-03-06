ItemFormView = Backbone.View.extend({
    
    render: function(categoryList, catId, navHtml, page) {
        this.template = window.templates['ItemFormView'];
        var linkBack = this.model.get('Id') !== null ? 
            "app_router.navigate('#item/" + catId + "/" + this.model.get('Id') + "/1',true);" : 
            "app_router.navigate('#category/" + catId + "/" + page + "', true);";
        if (this.model.get('CategoryId') === 0)
            this.model.set('CategoryId', catId);
        
        $(this.el).html(this.template({
            model: this.model.toJSON(), 
            linkBack: linkBack,
            breadcrumb: navHtml,
            categories: categoryList.toJSON()
        }));
        return this;
    },
    
    postRender:function() {
        $('select#CategoryId option[cat-id=' + this.model.get('CategoryId') + ']').attr('selected', 'selected');
    },
    
    events: {
        "change": "change",
        "click a.save": "beforeSave",
        "submit form" : "beforeSave"
    },
    
    change: function(event) {
        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);
    },
    beforeSave: function() {
        var check = this.model.validate();
        if (check !== undefined) {
            alert(check);
            return false;
        }        
        this.saveItem();
        return false;
    },    
    saveItem: function() {
        var oldId = this.model.get('Id');
        this.model.save(this.model.changed, {
            success: function(model) {
                if (oldId > 0) {
                    // updates aproved automatically
                    app_router.manager.storage.addItem("cachedItemList:" + model.get('CategoryId'), null);
                    showAlert("Word has been updated.", 'success');
                } else {
                    showAlert("New word has been added but needs to be validated.", 'success');
                }
                app_router.navigate('#category/' + model.get('CategoryId') + '/1', true);
            },
            error: function(ex) {
                alert('An error occurred while trying to save this item. Check internet connection');
            }
        });
    }
});
