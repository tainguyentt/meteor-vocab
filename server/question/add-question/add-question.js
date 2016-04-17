QuestionList = new Mongo.Collection("questions");
// Meteor.publish('loginUser', function(){
//   var currentUserId = this.userId;
//   return PlayerList.find({createdBy: currentUserId});
// });
Meteor.methods({
  'insertQuestion': function(questionType,questionContent,questionTopic){
    var currentUserId = Meteor.userId();
    return QuestionList.insert({
      type: questionType,
      content: questionContent,
      topic: questionTopic,
      createdBy: currentUserId
    }, function(error, success){
      if(error){
        //TO DO handle error when create failed
        console.log ( error ); //info about what went wrong
      } 
      if(success){
        // TODO handle when created question successful
        console.log ("successful", success ); //the _id of new object if successful
        Meteor.call('findQuestionById', success);
      } 
    });
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