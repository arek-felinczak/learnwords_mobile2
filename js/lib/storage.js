if (typeof Vocabulary === 'undefined') {
	Vocabulary = {};
}

Vocabulary.Storage = {};

Vocabulary.Storage.API = function() {
	this.storage = null;
	
	this.open = function() {
		this.storage = new Vocabulary.Storage.LocalStorage();
        return this;
	};
	
	this.getItem = function(id) {
		var item = this.storage.getItem(id);
		if (item === undefined) return null;
		return JSON.parse(item);
	};
	
	this.length = function() {
		return this.storage.length();
	};
	
	this.addItem = function(id, arr) {
		this.storage.addItem(id, JSON.stringify(arr));
	};
};

Vocabulary.Storage.LocalStorage  = function () {		
    this.onError = function(e) { 
        if (window.console) console.log(e);
    };

    this.open = function() {};

    this.addItem = function(id, arr) {
        try { window.localStorage.setItem(id, arr); } 
        catch(err) { this.onError(err); }
    };

    this.length = function() {
        try { return window.localStorage.length; } 
        catch(err) { return 0; }
    };

    this.getItems = function() {
        try { return window.localStorage; } 
        catch(err) { this.onError(err); }	
        return [];
    };

    this.getItem = function(id) {			
        try { return window.localStorage.getItem(id); } 
        catch(err) { this.onError(err); }
        return {};
    };

    this.deleteItem = function(id) {
        try { window.localStorage.removeItem(id); } 
        catch(err) { this.onError(err); }			
    };	
};