ItemView = Backbone.View.extend({
      
	 render:function (nr) {
        var word = nr === "1" ? this.model.get('Translation1') : this.model.get('Translation2');
        var url = this.buildLink(word, window.localStorage['engineLink']);
        $("iframe#DictionaryItemView").attr('src', url);
        $('div#ItemViev').show();
	 },
     
     buildLink:function (word, engineUrl) {
         return engineUrl.toString().format({ "0": word});         
     }      
});

ItemFormView = Backbone.View.extend({
    render: function(categoryList) {
        var source = $("#itemsForm-template").html();
        var template = Handlebars.compile(source);
        $(this.el).html(template({model: this.model.toJSON(), categories: categoryList.toJSON()}));
        return this;
    },
    events: {
        "change": "change",
        "click .save": "beforeSave",
        //"click .delete": "deleteWine"
    },
    change: function(event) {
        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);

        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            alert(check.message);
        }
    },
    beforeSave: function() {
        var self = this;
        var check = this.model.validate();
        if (check !== undefined) {
            alert(check);
            return false;
        }        
        this.saveItem();
        return false;
    },    
    saveItem: function() {
        var self = this;
        this.model.save(null, {
            success: function(model) {
                // self.render();
                alert('Success! Item saved successfully !');
                app_router.navigate('#category/' + model.get('CategoryId'), true);
            },
            error: function(ex) {
                alert('Error - An error occurred while trying to save this item');
            }
        });
    },    
//    deleteItem: function() {
//        this.model.destroy({
//            success: function() {
//                alert('Item deleted successfully');
//                window.history.back();
//            }
//        });
//        return false;
//    },
});