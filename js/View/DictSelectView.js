AboutView = Backbone.View.extend({
    render: function() {
        this.template = window.templates['AboutView'];
        var html = this.template({});
        return html;
    }
});
