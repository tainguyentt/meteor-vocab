Meteor.publish('studyQuestions', function () {
	return Questions.find({}, {
		limit: 100,
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

Meteor.publish('listQuestionAnswerByMe', function (userId) {
	var userAnswers = Answers.find({
		createdBy: userId
	}, {
		limit: 20
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

Meteor.publish('listMyQuestion', function (userId, limit) {
	return Questions.find({
		userId: userId
	}, {
		limit: limit
	});
})
