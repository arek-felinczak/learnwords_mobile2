DictSelectView = Backbone.View.extend({
    render: function() {
        
        var dictList = [];
        for (var i=0; i<window.learnwordsConfig.dictionaries.length; i++) {
            var dictName = window.learnwordsConfig.dictionaries[i];
            var dictUrl = window.learnwordsConfig[dictName];
            var isSelected = dictUrl === window.localStorage['dictionaryLink'];
            dictList.push({
                url: dictUrl,
                selected: isSelected,
                cssClass: isSelected ? 'btn-primary' : 'btn-default',
                name: dictName
            });
        }
        var speechList = [];
        for (var i=0; i<window.learnwordsConfig.speechEngines.length; i++) {
            var isSelected = window.learnwordsConfig.speechEngines[i] === window.localStorage['speechEngine'];
            speechList.push({
                name: window.learnwordsConfig.speechEngines[i],
                selected: isSelected,
                cssClass: isSelected ? 'btn-primary' : 'btn-default'
            });
        }
        
        this.template = window.templates['DictSelectView'];
        var html = this.template({
            dictList: dictList,
            speechList: speechList
        });
        return html;
    }    
});

function selectButtonInGroup(button, containerId) {
    $('#' + containerId + ' button.btn-primary').removeClass('btn-primary').addClass('btn-default');
    $(button).removeClass('btn-default').addClass('btn-primary');
    return false;
}