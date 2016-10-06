// Client subscribes to this channel will get a list of all questions
Meteor.publish('questions', function () {
	return Questions.find({}, {
		limit: 20
	});
});

Meteor.publish('studyQuestions', function () {
	return Questions.find({}, {
		limit: 20,
		fields: {
			id: 1
		}
	})
});

Meteor.publishComposite('question', function (questionId) {
	return {
		find: function () {
			return Questions.find(questionId);
		},
		children: [{
			find: function (question) {
				return Topics.find({
					_id: {
						$in: question.topics
					}
				});
			},
		}, {
			find: function (question) {
				return Meteor.users.find({
					_id: question.userId
				}, {
					limit: 1,
					fields: {
						profile: 1
					},
				});
			},
		}]
	};
});

// Client subscribes to this channel will get a list of all of my answers
Meteor.publish('listQuestionAnswerByMe', function (userId) {
	var userAnswers = Answers.find({
		createdBy: userId
	});
	var questiondIds = userAnswers.map(function (answer) {
		return answer.questionId
	});
	var questions = Questions.find({
		_id: {
			$in: questiondIds
		}
	});
	return questions;
});

// Client subscribes to this channel will get a list of all of my question
Meteor.publish('listMyQuestion', function (userId) {
	return Questions.find({
		userId: userId
	});
})
