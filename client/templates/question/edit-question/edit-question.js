Template.editQuestion.helpers({
})

Template.editQuestion.events({
    'submit form': function(event) {
        event.preventDefault();
        var questionId = this._id;
        var question = {
            content: event.target.questionContent.value,
            topic: event.target.questionTopic.value
        }
        Questions.update(questionId, {$set: question}, function(error) {
          if(error) {
            throwError(error.reason);
          } else {
            Router.go('displayQuestion', {_id: questionId});
          }
        })
    }
});
