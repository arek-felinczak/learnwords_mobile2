ContactView = Backbone.View.extend({
    render: function(eventName) {
        this.template = window.templates['ContactView'];
        $('#main-navbar-nav li.active').removeClass('active');
        $('#main-navbar-nav li#contact').addClass('active');
        var html = this.template({});
        return html;
    }
});
