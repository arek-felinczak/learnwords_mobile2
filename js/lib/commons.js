String.prototype.format = function (args) {
    var newStr = this;
    for (var key in args) {
        newStr = newStr.replace('{' + key + '}', args[key]);
    }
    return newStr;
};


function var_dump(obj) {
	var result = [];
	$.each(obj, function (key, value) { 
		result.push('"' + key + '":"' + value + '"'); 
	});
	alert( 'var_dump \n' + result.join(',\n') );
};
