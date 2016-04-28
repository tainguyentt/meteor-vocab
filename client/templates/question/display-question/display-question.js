Template.displayQuestion.onRendered(function() {
  Session.set('answering-mode', true);
});

Template.displayQuestion.helpers({
    allAnswers: function() {
        return Answers.find({questionId: this._id});
    },
    myAnswers: function() {
        return Answers.find({questionId: this._id, createdBy: Meteor.userId()});
    },
    noAnswersFound: function() {
        return Answers.find({questionId: this._id}).count() === 0;
    },
    answeredByCurrentUser: function() {
        return Answers.find({questionId: this._id, createdBy: Meteor.userId()}).count() > 0;
    },
    isAnsweringMode: function() {
        return Session.get('answering-mode');
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
    },
    'click .js-check-answer': function() {
        Session.set('answering-mode', false);
    }
});
