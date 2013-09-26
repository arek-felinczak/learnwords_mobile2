ContactView = Backbone.View.extend({
    render: function(eventName) {
        this.template = window.templates['ContactView'];
        $('ul.navbar-nav li.active').removeClass('active');
        $('ul.navbar-nav li').eq(2).addClass('active');
        var html = this.template({});
        return html;
    }
});
