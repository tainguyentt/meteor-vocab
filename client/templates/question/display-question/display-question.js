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
    answeredByCurrentUser: function() {
        return Answers.find({ questionId: this._id, createdBy: Meteor.userId() }).count() > 0;
    },
    isAnsweringMode: function() {
        return Session.get('answering-mode');
    },
    'createdQuestion': function() {
        return Session.get('questionFindByIdSession');
    },
    'answer': function() {
        return AnswerList.find({}, { sort: { content: 1 } });
    },
    'isEditQuestion': function() {
        return Session.equals('editQuestion', 'true');
    },
    'topic': function(topics){
        var listTopic = [];
        for(var i in topics){
           var topic = Topics.findOne(topics[i]);
           listTopic.push(topic.content);
        }
        return listTopic;
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
    'click .finished': function() {
        Router.go("homePage");
    },
    'click .js-check-answer': function() {
        Session.set('answering-mode', false);
    },
    'click .edit-question': function() {
        Session.set('editQuestion', 'true');
    }
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