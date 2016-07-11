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
    },
     'createdQuestion': function(){
        return Session.get('questionFindByIdSession');
    },
    'answer': function(){
        return AnswerList.find({}, {sort: {content: 1}});
    },
    'isEditQuestion': function(){
        return Session.equals('editQuestion', 'true');
    },
    'options': function(){
        var options = [
            {
              value: TAPi18n.__('sentence'),
              label: TAPi18n.__('sentence')
            },{
              value: TAPi18n.__('word'),
              label: TAPi18n.__('word')
            },{
              value: TAPi18n.__('paragraph'),
              label: TAPi18n.__('paragraph')
            }
        ]
        return options;
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
      'click .edit-question': function(){
        Session.set('editQuestion', 'true');
      },
      'submit form': function(event, template){
        event.preventDefault();
        var questionContent = event.target.questionContent.value;
        var questionTopic = event.target.questionTopic.value;
        Meteor.call("updateQuestion", template.data._id,questionContent,questionTopic, function(error){
          if(error) {
            console.log(error);
          }
        });
    }
});
