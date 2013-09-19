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

function LoadForvoLink(word, htmlObj) {
    word = word.replace(' ', '_');
    url = window.learnwordsConfig.forvo.replace('{0}', word);
    var htmlTemplate = '<a onclick="Forvo_Ext_Play(\'http://apifree.forvo.com/audio/{0}\',\'http://apifree.forvo.com/audio/{1}\');return false;" href="http://www.forvo.com/word/car/" title="Listen to car pronunciation by Forvo"><img border="0" style="border:0; padding:0; margin:0; vertical-align:middle" alt="Listen to car pronunciation by Forvo" src="http://www.forvo.com/_presentation/img/ico_play.gif"></img></a>';
    var data = {
        key: 'fecc801770209d5b7b0ed138946d6bd3',
        format: 'json',
        action: 'word-pronunciations',
        word: word,
        order: 'rate-desc',
        limit: 1,
        language: 'en'        
    };
    
    $.getJSON(url, data, function(res) {
        alert('asd');
        var res = JSON.parse(res);
        var args = [attributes.items[0].pathmp3, attributes.items[0].pathogg];
        $(htmlObj).html(htmlTemplate.replace(new RegExp('\\{'+i+'\\}', 'gi'), args[i]));
    });
    
    var url = 'http://apifree.forvo.com/key/XXXXXXXXXXXXXXXX/format/json/callback/pronounce/action/standard-pronunciation/word/'+encodeURI(word)+'/language/zh';
        $.ajax({
            url: url,
            jsonpCallback: "pronounce",
            dataType: "jsonp",
            type: "jsonp",
            success: function (json) {
           var mp3 = json.items[0].pathmp3;
           var ogg = json.items[0].pathogg;
       },
        error: function(){
            console.log("error");
    }});
    
}