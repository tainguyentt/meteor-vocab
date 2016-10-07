Meteor.methods({
	insertAnswer: function (answer) {
		if (Meteor.userId()) {
			answer.userId = Meteor.userId();
		}
		var answerId = Answers.insert(answer);
		return {
			_id: answerId
		}
	}
})
