Template.displayedQuestion.onRendered(function() {
  var questionId = Router.current().params.question;
  Meteor.call("findQuestionById", questionId, function(error, question){
      if (error) {
        console.log("Error when load question by question id: ", questionId);
      } else {
        Session.set('questionFindByIdSession', question);
      }
  });
});

Template.displayedQuestion.helpers({
  'createdQuestion': function(){
    return Session.get('questionFindByIdSession');
  },
  'answer': function(){
    return AnswerList.find({}, {sort: {content: 1}});
  }
});


Template.displayedQuestion.events({
 'click .addAnswer': function(){
    //TO DO router to add answer page
    console.log("add answer clicked");
  },
  'click .addMore': function(){
    Router.go("addQuestion");
  },
  'click .finished': function(){
    Router.go("homePage");
  },
  'click .edit-question': function(){
    console.log("edit question")
  }
});
