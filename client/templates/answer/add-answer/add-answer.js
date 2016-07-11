Template.addAnswer.events({
  'submit form': function(e, template) {
    e.preventDefault();
    var $body = $(e.target).find('[name=body]');
    var answer = {
      content: $body.val(),
      questionId: template.data._id
    }
    Meteor.call('insertAnswer', answer, function(error, result) {
      if(error) {
        throwError(error.reason);
      }
      else {
        updateUserPoints(Meteor.userId(), 1);
        Session.set('answering-mode', false);
      }
    })
  }
});