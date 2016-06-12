Template.addQuestion.events({
    'submit form': function(event) {
        event.preventDefault();
        var question = {
            type: event.target.questionType.value,
            content: event.target.questionContent.value,
            topic: event.target.questionTopic.value
        }
        Meteor.call('insertQuestion', question, function(error, result) {
            if (error) {
                throwError(error.reason);
            } else {
                Session.set('addingQuestionMode', true);
                Router.go('displayQuestion', { _id: result._id });
            }
        });
    }
});
