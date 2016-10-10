Template.homePage.helpers({
	username: function () {
		var user = Meteor.user();
		if (user && user.profile)
			return user.profile.name;
		return '';
	},
	joinedAt: function () {
		var user = Meteor.user();
		return moment(user.createdAt).locale('vi').format('LL');
	},
	formatTime: function (time) {
		return moment(time).locale('vi').fromNow();
	},
	userPoints: function () {
		var user = Meteor.user();
		if (!user)
			return 0;
		if (user.profile && user.profile.points)
			return user.profile.points;
		return 0;
	},
	userQuestions: function () {
		var user = Meteor.user();
		return Questions.find({
			userId: user._id
		});
	},
	userAnswers: function () {
		var user = Meteor.user();
		return Answers.find({
			userId: user._id
		});
	}
});
