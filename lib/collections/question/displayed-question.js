Meteor.methods({
  'findQuestionById': function(questionId){
      return QuestionList.findOne({_id: questionId});
  }
  // 'removePlayer': function(selectedPlayer){
  //   var currentUserId = Meteor.userId();
  //   PlayerList.remove({_id: selectedPlayer, createdBy: currentUserId});
  // },
  // 'modifyPlayerScore': function(selectedPlayer, score){
  //   var currentUserId = Meteor.userId();
  //    PlayerList.update({_id: selectedPlayer, createdBy: currentUserId} , {$inc: {score: score}});
  // }
})