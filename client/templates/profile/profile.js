Template.profile.helpers({
	username: function () {
		var user = this;
		if (user && user.profile)
			return user.profile.name;
		return '';
	},
	joinedAt: function () {
		return moment(this.createdAt).locale('vi').format('LL');
	},
	formatTime: function (time) {
		return moment(time).locale('vi').fromNow();
	},
	userPoints: function () {
		var user = this;
		if (!user)
			return 0;
		if (user.profile && user.profile.points)
			return user.profile.points;
		return 0;
	},
	userQuestions: function () {
		var user = this;
		return Questions.find({
			userId: user._id
		});
	},
	userAnswers: function () {
		var user = this;
		return Answers.find({
			userId: user._id
		});
	}
});
