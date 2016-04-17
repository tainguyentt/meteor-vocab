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
  // 'isLogin': function(){
  //   var currentUserId = Meteor.userId();
  //   if(currentUserId != null){
  //     return true;
  //   }
  // },
  'createdQuestion': function(){
    return Session.get('questionFindByIdSession');
  },
  'answer': function(){
    return AnswerList.find({}, {sort: {content: 1}});
  }
});

/*Template.addQuestion.events({
  'click .player': function(){
    var playerId = this._id;
    Session.set("selectedPlayer", playerId);
  },
  'click .increment': function(){
    var selectedPlayer = Session.get("selectedPlayer");
    Meteor.call('modifyPlayerScore', selectedPlayer, 5);
  },
  'click .decrement': function(){
    var selectedPlayer = Session.get("selectedPlayer");
    Meteor.call('modifyPlayerScore', selectedPlayer, -5);
  },
  'click .remove': function(){
    var selectedPlayer = Session.get("selectedPlayer");
    Meteor.call('removePlayer', selectedPlayer);
  }
});*/

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
  }
});
