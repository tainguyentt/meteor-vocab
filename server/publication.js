Meteor.publish('questions', function() {
  return QuestionList.find();
});
