Test = Backbone.Model.extend({
    defaults: {
        CategoryId: 0,
        Questions: [],
        Answers: [],
        SelectedAnswer: [],
        Score: 0
    },
    TestLength: 10,
    percentResult: function() {
        return parseInt(this.get('Score') * 100 / this.TestLength);
    },
    buildTest: function(itemCollection, catId) {
        this.set('CategoryId', catId);
        if (itemCollection.models.length < this.TestLength) {
            alert("Not enough words in category to create a test.")
            return;
        }
        var i = 0;
        var questions = [];
        var answers = [];
        do {
            var question = this._getRandomItem(itemCollection);
            if (_.indexOf(questions, question) !== -1)
                continue;

            questions[i] = question.toJSON();
            answers[i] = this._getFakeAnswers(itemCollection, question);
            i++;
        } while (questions.length < this.TestLength);
        this.set('Questions', questions);
        this.set('Answers', answers);
        return this;
    },
    _getFakeAnswers: function(itemCollection, question) {
        var answers = [question];
        do {
            var answer = this._getRandomItem(itemCollection);
            if (_.indexOf(answers, answer) === -1)
                answers.push(answer);
        } while (answers.length < 4);
        answers = _.map(answers, function(i) {return i.toJSON();});
        return _.shuffle(answers);
    },
    _getRandomItem: function(itemCollection) {
        var itemsCnt = itemCollection.models.length;
        var random = Math.floor((Math.random() * itemsCnt));
        return itemCollection.models[random];
    },
    calculateResult: function() {
        var score = 0;
        for (var i = 0; i < this.get('Questions').length; i++) {
            if (this.get('SelectedAnswer')[i] && this.get('Questions')[i].Id === this.get('SelectedAnswer')[i].Id) {
                score++;
            }
        }
        return score;
    }
});


TestCollection = Backbone.Collection.extend({
    model: Test
});
