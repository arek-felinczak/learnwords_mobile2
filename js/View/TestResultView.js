TestResultView = Backbone.View.extend({
    initialize: function(options) {
        this.index = -1;
        this.model = options.model;
        this.category = options.category;
    },
    
    render:function(nav) {
        this.template = window.templates['ResultView'];
        var percentScore = this.model.percentResult();
        var scoreCss = percentScore >= 80 ? "alert alert-success" : 
            percentScore >= 50 ? "alert alert-warning" : "alert alert-danger";
        
        var vm = {
            breadcrumb: nav,
            Category: this.category.toJSON(),
            Results: [],
            Result: this.model.toJSON(),
            ResultCss: scoreCss
        };
        vm.Result.TestLength = this.model.get('Questions').length;
        for (var i=0; i<vm.Result.TestLength; i++) { 
            var res = {
                Question: this.model.get('Questions')[i],
                isCorrect: false,
                Answer: {}
            };
            if (this.model.get('SelectedAnswer')[i]) {
                res.Answer = this.model.get('SelectedAnswer')[i];
                res.isCorrect = res.Question.Translation1 === res.Answer.Translation1;
            };    
            vm.Results.push(res);
        }
        
        var html = this.template(vm);
        
        $(this.el).html(html);
        $(this.el).on("click", "li.list-group-item", function(ev) {
            var link = $(ev.currentTarget).attr("data-link");
            ev.stopPropagation();
            return go('#' + link); 
        });
        
        return this;
    }
});
