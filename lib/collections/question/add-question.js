Meteor.methods({
    insertQuestion: function(questionAttr) {
        var user = Meteor.user();
        var question = _.extend(questionAttr, {
            userId: user._id
        });
        var questionId = Questions.insert(question);
        return { _id: questionId };
    }
})
