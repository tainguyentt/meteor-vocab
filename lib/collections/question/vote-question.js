Meteor.methods({
    voteQuestion: function(questionId, userId) {
        Questions.update(questionId, { $push: { voters: userId } });
    },
    unvoteQuestion: function(questionId, userId) {
        Questions.update(questionId, { $pull: { voters: userId } });
    }
})
