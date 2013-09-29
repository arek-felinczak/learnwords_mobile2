ItemFormView = Backbone.View.extend({
    
    render: function(categoryList) {
        $('ul.navbar-nav li.active').removeClass('active');
        $('ul.navbar-nav li').eq(3).addClass('active');
        this.template = window.templates['ItemFormView'];
        $(this.el).html(this.template({model: this.model.toJSON(), categories: categoryList.toJSON()}));
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

function LoadForvoLink(word, htmlObj) {
    app_router.transitionStart();
    url = window.learnwordsConfig.forvo.replace('{0}', word);
    var url = 'http://apifree.forvo.com/key/fecc801770209d5b7b0ed138946d6bd3/format/json/callback/pronounce/action/standard-pronunciation/word/'+encodeURI(word)+'/language/en/order/rate-desc/limit/2';
        $.ajax({
            url: url,
            jsonpCallback: "pronounce",
            dataType: "jsonp",
            type: "jsonp",
            success: function (json) {
                if (window.debug_mode) console.log('LoadForvoLink: ' + JSON.stringify(json));
                var mp3 = json.items[0].pathmp3;
                var ogg = json.items[0].pathogg;
                Forvo_Ext_Play(mp3, ogg);
                app_router.transitionStop();
       },
        error: function(err) {
            app_router.transitionStop();
            var_dump('Error in LoadForvoLink', err);
    }});
}