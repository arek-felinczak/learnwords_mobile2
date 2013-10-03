DictSelectView = Backbone.View.extend({
    render: function() {
        this.template = window.templates['DictSelectView'];
        var html = this.template({});
        return html;
    }
});
