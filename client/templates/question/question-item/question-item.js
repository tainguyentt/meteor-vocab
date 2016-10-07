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
	voteCount: function () {
		if (this.voters) {
			return this.voters.length;
		}
	},
	voted: function () {
		return this.voters && this.voters.includes(Meteor.userId());
	}
});

Template.questionItem.events({
	'click .js-vote-question': function (e) {
		e.preventDefault();
		var userId = Meteor.userId();
		var questionId = this._id;
		var authorId = this.userId;
		if (this.voters && this.voters.includes(userId)) {
			Meteor.call('unvoteQuestion', questionId, userId, function (error) {
				if (error) {
					console.log('tai',error.reason);
					throwError(error.reason);
				} else {
					updateUserPoints(authorId, -2);
				}
			})
		} else {
			Meteor.call('voteQuestion', questionId, userId, function (error) {
				if (error) {
					throwError(error.reason);
				} else {
					updateUserPoints(authorId, 2);
				}
			})
		}
	}
});
