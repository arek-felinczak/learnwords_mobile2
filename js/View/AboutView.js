AboutView = Backbone.View.extend({
    render: function(eventName) {
        this.template = window.templates['AboutView'];
        $('ul.navbar-nav li.active').removeClass('active');
        $('ul.navbar-nav li').eq(1).addClass('active');
        var html = this.template({});
        return html;
    }
});
