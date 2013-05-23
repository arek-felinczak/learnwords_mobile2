var categoryRemoteAdapter = {
    server: "https://learnwords.firebaseio.com",

    getItems: function(id, page, callback) {
        if (callback) {
            return this.loadDictionary(this.getItemsFromCategory(JSON.parse(localStorage.categories), id, page, callback));
        }
    },
    
    addWord: function(catId, word, translation, translation2) {
        var item = [word.trim(), translation.trim(), translation2.trim()];
        catId = parseInt(catId);
        var that = this;
        this.loadDictionary(function(data) {
            var category = Enumerable.From(data).First(function(x) {
                return x.Id == catId;
            });
            category.Items.push(item);
            
            window.viewCategory = category;
            window.viewItems = category.Items;
            
            var index = Enumerable.From(data).IndexOf(category);
            data[index] = category;
            localStorage.categories = JSON.stringify(data);

            var storage = new Firebase(that.server + '/' + index + '/Items/' + (category.Items.length - 1));
            storage.set({ 0: word, 1: translation, 2: translation2 });
        });
    },
    
    getItemsFromCategory: function(data, id, page, callback) {
        var category = Enumerable.From(data).First(function(x) {
            return x.Id == id;
        });
        window.viewCategory = category;

        var items = new Items();
        items.CategoryName = category.Name;
        items.CategoryId = category.Id;
        items.Items = Enumerable.From(category.Items).Skip(page * 30).Take((page + 1) * 30).ToArray();
        items.NumOfPages = parseInt((category.Items.length - 1) / 30) + 1;
        items.Page = page;
        window.viewItems = items;
        return callback(items);
    },
    
    getAll: function(callback) {
        if (callback) {
            return this.loadDictionary(callback);
        }
    },
    
    loadDictionary: function (callback) {
        if (localStorage.categories == undefined) {
            LoadScript("js/learnwords-export.js", function () {
                Log('file');
                localStorage.categories = JSON.stringify(dictionary);
                if (callback) {
                    return callback(dictionary);
                }
            });
            return;
        }
        Log('localStorage');
        if (callback) {
            return callback(JSON.parse(localStorage.categories));
        }
    },

    refreshDict: function (callback) {
        $.ui.blockUI(0.5);
        //window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        try {
            var storage = new Firebase(this.server);
            storage.on('value', function(snapshot) {
                var res = snapshot.val();
                localStorage.categories = JSON.stringify(snapshot.val());                
                storage.off();
                Log('Firebase');
                //if (window.requestFileSystem) {
                //    Log('Save on disk');
                //    window.requestFileSystem(window.TEMPORARY, 1024 * 1024, onFsWrite, function (err) { DumpVar(err); });
                //}        
                $.ui.unblockUI();
                $('a.icon').removeClass('selected');
                callback();
            });
        } catch (err) {
            $.ui.unblockUI();
            $('a.icon').removeClass('selected');
            alert(err);
        }
    }
};
