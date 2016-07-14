Meteor.methods({
    voteAnswer: function(answerId, userId) {
        Answers.update(answerId, { $push: { voters: userId } });
    },
    unvoteAnswer: function(answerId, userId) {
        Answers.update(answerId, { $pull: { voters: userId } });
    }
})
