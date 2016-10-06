Meteor.publish('userAnswers', function (questionId, userId) {
	return Answers.find({
		questionId: questionId,
		userId: userId
	}, {
		sort: {
			created: -1
		}
	})
});

Meteor.publishComposite('answers', function (questionId, answersLimit) {
	return {
		find: function () {
			return Answers.find({
				questionId: questionId
			}, {
				limit: answersLimit,
				sort: {
					voteCount: -1
				}
			});
		},
		children: [{
			find: function (answer) {
				return Meteor.users.find({
					_id: answer.userId
				}, {
					limit: 1,
					fields: {
						profile: 1
					}
				});
			}
		}],
	};
});
