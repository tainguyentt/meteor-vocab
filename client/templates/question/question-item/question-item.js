Template.questionItem.helpers({
	topics: function () {
		return Topics.find({
			_id: {
				$in: this.topics
			}
		});
	},
	username: function () {
		let user = Meteor.users.findOne(this.userId);
		let username = '';
		if (user) {
			username = user.profile.name;
		}
		return username;
	},
	createdAt: function () {
		return moment(this.created).locale('vi').fromNow();
	},
});
