Meteor.methods({
  'findQuestionById': function(questionId){
      return QuestionList.findOne({_id: questionId});
  },
  // 'removePlayer': function(selectedPlayer){
  //   var currentUserId = Meteor.userId();
  //   PlayerList.remove({_id: selectedPlayer, createdBy: currentUserId});
  // },
  'updateQuestion': function(selectedQuestion,questionType,questionContent,questionTopic){
    var currentUserId = Meteor.userId();
     QuestionList.update(
      {_id: selectedQuestion.toString(), createdBy: currentUserId} ,
      {
        type: questionType,
        content: questionContent,
        topic: questionTopic,
        lastModified: new Date()
      }
    );
  }
})