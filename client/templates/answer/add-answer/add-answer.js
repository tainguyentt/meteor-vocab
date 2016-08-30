Template.addAnswer.events({
	'submit form.answer-form': function (e, template) {
		e.preventDefault();
		let $body = $(e.target).find('[name=body]');
		let isStudyMode = template.data.studyMode;
		let questionId;
		if (isStudyMode) {
			questionId = template.data.question._id;
		} else {
			questionId = template.data._id;
		}
		let answer = {
			content: $body.val(),
			questionId: questionId
		};
		Meteor.call('insertAnswer', answer, function (error, result) {
			if (error) {
				throwError(error.reason);
			} else {
				updateUserPoints(Meteor.userId(), 1);
				if (isStudyMode) {
					Session.set('showAnswer', true);
				} else {
					Router.go('displayQuestion', {
						_id: questionId
					});
				}
			}
		})
	},
	'click .skip-answer': function (e, template) {
		let isStudyMode = template.data.studyMode;
		if (isStudyMode) {
			Session.set('showAnswer', true);
		} else {
			let questionId = template.data._id;
			Router.go('displayQuestion', {
				_id: questionId
			});
		}
	},
});
