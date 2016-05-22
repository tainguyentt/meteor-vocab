Template.displayedQuestion.onRendered(function() {
  // var questionId = Router.current().params.question;
  // Meteor.call("findQuestionById", questionId, function(error, question){
  //     if (error) {
  //       console.log("Error when load question by question id: ", questionId);
  //     } else {
  //       Session.set('questionFindByIdSession', question);
  //     }
  // });
});

Template.displayedQuestion.helpers({
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
  },
  'selectedQuestionType': function(value){
    var selectedValue = Session.get('questionFindByIdSession');
    return  (selectedValue.type === value) ? 'selected' : '';
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
    Session.set('editQuestion', 'true');
  },
  'submit form': function(event, template){
    event.preventDefault();
    var questionType = event.target.questionType.value;
    var questionContent = event.target.questionContent.value;
    var questionTopic = event.target.questionTopic.value;
    Meteor.call("updateQuestion", template.data._id,questionType,questionContent,questionTopic, function(error){
if(error) {
  console.log(error);
}
    });
    }
});
