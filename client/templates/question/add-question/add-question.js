Template.addQuestion.onRendered(function() {
  //var isLogin = false;
  // var validator = $('.sign-in').validate({
  //   submitHandler: function(event) {
  //     var email = $('[name=email').val();
  //     var password = $('[name=password').val();
  //     Meteor.loginWithPassword(email, password, function(error) {
  //       if (error) {
  //         validator.showErrors({
  //           messages: error.reason
  //         });
  //       } else {
  //         Router.go('homePage');
  //       }
  //     });
  //   }
  // });
  // var currentUserId = Meteor.userId();
  // if(currentUserId != null){
  //   isLogin = true;
  // }
  // console.log("currentUserId", currentUserId);

    var sss = TAPi18n.__('test');
    console.log("test tapi18n", sss);
});

Template.addQuestion.helpers({
  'isLogin': function(){
    var currentUserId = Meteor.userId();
    if(currentUserId != null){
      return true;
    }
  },
  /*'selectedClass': function(){
    var playerId = this._id;
    var selectedPlayer = Session.get("selectedPlayer");
    if(playerId == selectedPlayer){
      return "selected"
    }
  }*/
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

Template.addQuestion.events({
  'submit form': function(event){
    event.preventDefault();
    var questionType = event.target.questionType.value;
    var questionContent = event.target.questionContent.value;
    var questionTopic = event.target.questionTopic.value;
    Meteor.call("insertQuestion", questionType,questionContent,questionTopic, function(error, questionId){
      if(error){
        console.log("Could not create question:", error);
      }
      if(questionId){
        Router.go('displayedQuestion', {question: questionId});
      }
      
    });
  }
});

