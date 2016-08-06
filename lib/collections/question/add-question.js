Meteor.methods({
    insertQuestion: function(questionAttr) {
        var listTopicId = [];
        _.each(questionAttr.topics, function(topic) {
            var newTopicId;
            if(parseInt(topic.id) < 10){
                delete topic.id;
                listTopicId.push(Topics.insert(topic));
            }else{
                listTopicId.push(topic.id);
            }
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