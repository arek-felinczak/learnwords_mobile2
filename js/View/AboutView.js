AboutView = Backbone.View.extend({
    render: function(eventName) {
        this.template = window.templates['AboutView'];
        $('#main-navbar-nav li.active').removeClass('active');
        $('#main-navbar-nav li#about').addClass('active');
        var html = this.template({});
        return html;
    }
});
