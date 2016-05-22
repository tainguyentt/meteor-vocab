Template.editQuestion.helpers({
  hasQuestionType: function(questionType) {
    console.log(questionType);
    return this.type === questionType ? 'selected' : '';
  }
})

Template.editQuestion.events({
    'submit form': function(event) {
        event.preventDefault();
        var questionId = this._id;
        var question = {
            type: event.target.questionType.value,
            content: event.target.questionContent.value,
            topic: event.target.questionTopic.value
        }
        Questions.update(questionId, {$set: question}, function(error) {
          if(error) {
            console.log("Could not update question:", error);
          } else {
            Router.go('displayQuestion', {_id: questionId});
          }
        })
    }
});
