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
        console.log(error);
      }
      else {
        $body.val('');
      }
    })
  }
});