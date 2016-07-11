Template.addQuestion.events({
    'submit form': function(event) {
        event.preventDefault();
        var question = {
            content: event.target.questionContent.value,
            topic: event.target.questionTopic.value
        }
        Meteor.call('insertQuestion', question, function(error, result) {
            if (error) {
                throwError(error.reason);
            } else {
                updateUserPoints(Meteor.userId(), 1);
                Session.set('addingQuestionMode', true);
                Router.go('displayQuestion', { _id: result._id });
            }
        });
    }
});
