Template.allAnswers.onRendered(function () {
	let instance = this;
	let questionId = this.data._id;
	instance.loaded = new ReactiveVar(0);
	instance.limit = new ReactiveVar(5);
	//subscribe to answers of current user
	instance.subscribe('userAnswers', questionId, Meteor.userId());
	//subscribe to top answers
	instance.autorun(function () {
		let limit = instance.limit.get();
		let subscription = instance.subscribe('answers', questionId, limit);
		if (subscription.ready()) {
			instance.loaded.set(limit);
		}
	});
});

Template.allAnswers.helpers({
	noAnswersFound: function () {
		return Answers.find({
			questionId: this._id
		}).count() === 0;
	},
	noMyAnswers: function () {
		return Answers.find({
			questionId: this._id,
			userId: Meteor.userId()
		}).count() === 0;
	},
	allAnswers: function () {
		return Answers.find({
			questionId: this._id
		}, {
			limit: Template.instance().loaded.get(),
			sort: {
				voteCount: -1
			}
		});
	},
	myAnswers: function () {
		return Answers.find({
			questionId: this._id,
			userId: Meteor.userId()
		});
	},
	hasMoreAnswers: function () {
		return Answers.find({
			questionId: this._id
		}, {
			limit: Template.instance().loaded.get()
		}).count() >= Template.instance().limit.get();
	}
});

Template.allAnswers.events({
	'click #show-more': function (event, instance) {
		event.preventDefault();
		let increment = 5;
		let newLimit = instance.limit.get() + increment;
		instance.limit.set(newLimit);
	}
});
