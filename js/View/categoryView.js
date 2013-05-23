 CategoriesView = Backbone.View.extend({
       initialize: function(){
              this.model.bind("reset", this.render, this);
       },
		
       render: function(){
              var template = _.template( $("#categoriesTemplate").html(), { categories: this.model.models } );
              this.$el.html( template );
              
       },
        
		events: {
            "click input[type=button]": "doSearch"
        },
    });


 CategoryView = Backbone.View.extend({
       initialize: function(){
              this.model.bind("reset", this.render, this);
       },
		
       render: function(){
              var template = _.template( $("#categoryTemplate").html(), { categories: this.model.models } );
              this.$el.html( template );
              
       },
        
		events: {
            "click input[type=button]": "doSearch"
        },
    });
