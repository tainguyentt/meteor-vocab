Meteor.methods({
    voteQuestion: function(questionId, userId) {
        Questions.update(questionId, { $push: { voters: userId } });
    }
})
