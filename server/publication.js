// Client subscribes to this channel will get a list of all questions
Meteor.publish('questions', function() {
  return Questions.find();
});

// Client subscribes to this channel will get only one question according to the id param
Meteor.publish('question', function(id) {
  return Questions.find(id);
});

// Client subscribes to this channel will get a list of all answers
Meteor.publish('answers', function(questionId) {
  return Answers.find({questionId: questionId});
})