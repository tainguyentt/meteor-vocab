Meteor.publish('userProfile', function (userId) {
	return [
		Meteor.users.find(userId),
		Questions.find({
			userId: userId
		}, {
			limit: 8
		}),
		Answers.find({
			userId: userId
		}, {
			limit: 8
		})
	];
});
