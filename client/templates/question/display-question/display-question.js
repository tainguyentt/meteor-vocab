Template.displayQuestion.helpers({
    allAnswers: function() {
        return Answers.find({ questionId: this._id });
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
    },
    'click .edit-question': function() {
        Session.set('editQuestion', 'true');
    }
});