Template.addQuestion.helpers({
    'isLogin': function() {
        var currentUserId = Meteor.userId();
        if (currentUserId != null) {
            return true;
        }
    }
});

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
                console.log("Could not create question:", error);
            } else {
                Session.set('addingQuestionMode', true);
                Router.go('displayQuestion', { _id: result._id });
            }
        });
    }
});
