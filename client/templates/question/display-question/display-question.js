Template.displayQuestion.helpers({
    allAnswers: function() {
        return Answers.find({ questionId: this._id }, {limit: Template.instance().loaded.get(), sort: {voteCount: -1}});
    },
    myAnswers: function() {
        return Answers.find({ questionId: this._id, createdBy: Meteor.userId() });
    },
    noAnswersFound: function() {
        return Answers.find({ questionId: this._id }).count() === 0;
    },
    hasMoreAnswers: function() {
        return Answers.find({ questionId: this._id }, {limit: Template.instance().loaded.get()}).count() >= Template.instance().limit.get();
    }
});

Template.displayQuestion.events({
    'click button#show-more': function(event, instance) {
        event.preventDefault();
        let increment = 5;
        let newLimit = instance.limit.get() + increment;
        instance.limit.set(newLimit);
    },
});

Template.displayQuestion.onCreated(function() {
    let instance = this;
    let questionId = this.data._id;
    instance.loaded = new ReactiveVar(0);
    instance.limit = new ReactiveVar(5);

    instance.autorun(function() {
        let limit = instance.limit.get();
        let subscription = instance.subscribe('answers', questionId, limit);
        if(subscription.ready()) {
            instance.loaded.set(limit);
        }
    });
});