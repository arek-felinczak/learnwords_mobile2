TestView = Backbone.View.extend({
    initialize: function(options) {
        this.index = -1;
        this.model = options.model;
        this.category = options.category;
        this.nav = options.nav;
    },
    
    render:function() {
        if (this.index < this.model.TestLength) {
            this.index++;
        }
        this.template = window.templates['TestView'];
        
        var vm = {
            breadcrumb: this.nav,
            Question: this.model.get('Questions')[this.index],
            Answers: this.model.get('Answers')[this.index],
            Category: this.category.toJSON(),
            QuestionNum: this.model.TestLength,
            QuestionIndex: this.index + 1            
        };
        var html = this.template(vm);
        $(this.el).html(html);
        
        if (this.index === this.model.TestLength - 1) {
            $(this.el).find('#nextQuestion').hide();
            $(this.el).find('#finishTest').removeClass('col-xs-4').addClass('col-xs-11');
        }
        return this;
    },
     
     events: {
         "click #nextQuestion": "nextQuestion",
         "click #finishTest": "finishTest",
         "click button.answer": "selectButtonInGroup" 
     },
     
     nextQuestion: function(e) {
         e.preventDefault();
         this.render();
     },
     
     finishTest: function(e) {
         e.preventDefault();
         this.model.set('Score', this.model.calculateResult());
         this.trigger("save-test-result", this.model);
         app_router.navigate('#testResult');
     },
     
     selectButtonInGroup: function (e) {
        e.preventDefault();
        var target = $(e.currentTarget).data('index');
        
        var selAnswers = this.model.get('SelectedAnswer');
        selAnswers[this.index] = this.model.get('Answers')[this.index][target];
        this.model.set('SelectedAnswer', selAnswers);        
        
        this.$el.find('button.answer').removeClass('btn-primary').addClass('btn-default');
        $(e.currentTarget).removeClass('btn-default').addClass('btn-primary');
        return false;
    }      
});
