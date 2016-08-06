Meteor.methods({
    voteAnswer: function(answerId, userId) {
        Answers.update(answerId, { $push: { voters: userId }, $inc: {voteCount: 1} });
    },
    unvoteAnswer: function(answerId, userId) {
        Answers.update(answerId, { $pull: { voters: userId }, $inc: {voteCount: -1} });
    }
})
