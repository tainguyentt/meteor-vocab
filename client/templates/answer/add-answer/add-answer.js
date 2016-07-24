Template.addAnswer.events({
  'submit form.answer-form': function(e, template) {
    e.preventDefault();
    var $body = $(e.target).find('[name=body]');
    var questionId = template.data._id;
    var answer = {
      content: $body.val(),
      questionId: questionId
    }
    Meteor.call('insertAnswer', answer, function(error, result) {
      if(error) {
        throwError(error.reason);
      }
      else {
        updateUserPoints(Meteor.userId(), 1);
        Router.go('displayQuestion', {_id: questionId});
      }
    })
  }
});