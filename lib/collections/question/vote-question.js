Meteor.methods({
    voteQuestion: function(questionId, userId) {
        Questions.update(questionId, { $push: { voters: userId }, $inc: { voteCount: 1 } });
    },
    unvoteQuestion: function(questionId, userId) {
        Questions.update(questionId, { $pull: { voters: userId }, $inc: { voteCount: -1 } });
    }
})
