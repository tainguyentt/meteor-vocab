Meteor.methods({
    insertQuestion: function(questionAttr) {
        var listTopicId = [];
        _.each(questionAttr.topics, function(topic) { 
          listTopicId.push(Topics.insert(topic));
        });
        var user = Meteor.user();
        var question = {
            content: questionAttr.content,
            userId: user._id,
            topics: listTopicId
        };
        var questionId = Questions.insert(question);
        return { _id: questionId };
    },
    updateQuestion: function(questionId, questionAttr) {
      Questions.update(questionId, {$set: questionAttr});
    }
})