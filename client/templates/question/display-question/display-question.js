Template.displayQuestion.helpers({
    'answers': function() {
        return Answers.find({questionId: this._id});
    },
    'noAnswersFound': function() {
        return Answers.find({questionId: this._id}).count() === 0;
    },
    isAddingQuestionMode: function() {
        return Session.get('addingQuestionMode');
    }
});

Template.displayQuestion.events({
    'click .addAnswer': function() {
        //TO DO router to add answer page
        console.log("add answer clicked");
    },
    'click .addMore': function() {
        Router.go("addQuestion");
    },
    'click .finished': function() {
        Router.go("homePage");
    }
});