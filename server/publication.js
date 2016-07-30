// Client subscribes to this channel will get a list of all questions
Meteor.publish('questions', function() {
    return Questions.find();
});

// Client subscribes to this channel will get only one question according to the id param
Meteor.publishComposite('question', function(id) {
    return {
        find: function() {
            return Questions.find(id);
        },
        children: [{
            find: function(question) {
                return Answers.find({ questionId: question._id });
            },
            children: [{
                find: function(answer) {
                    return Meteor.users.find({ _id: answer.createdBy }, { limit: 1, fields: { profile: 1 } });
                }
            }]
        }]
    }
});

// Client subscribes to this channel will get a list of all answers
Meteor.publish('answers', function(questionId) {
    return Answers.find({ questionId: questionId });
});

// Client subscribes to this channel will get a list of all of my answers
Meteor.publish('listQuestionAnswerByMe', function(userId) {
    var userAnswers = Answers.find({ createdBy: userId });
    var questiondIds = userAnswers.map(function(answer) {
        return answer.questionId
    });
    var questions = Questions.find({ _id: { $in: questiondIds } });
    return questions;
});

// Client subscribes to this channel will get a list of all of my question
Meteor.publish('listMyQuestion', function(userId) {
    return Questions.find({ userId: userId });
})
