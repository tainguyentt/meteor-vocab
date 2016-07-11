Template.answerItem.onRendered(function() {
	var userId = Meteor.userId();
	if (this.data.voters.includes(userId)) {
		Session.set('already-answer', true);
	}
});

Template.answerItem.helpers({
	createdTime: function() {
		return this.createdAt.toDateString();
	},
	voteCount: function() {
		return this.voters.length.toString();
	},
	isVoted: function() {
        //return Session.get('already-answer');
        return this.voters.length > 0;
    }
});

Template.answerItem.events({
    'click #vote-answer': function(e) {
        e.preventDefault();
        var userId = Meteor.userId();
        if (this.voters && this.voters.includes(userId)) {
        	Session.set('already-answer', true);
            throwError('You cannot vote 2 times.');
        } else {
            var answerId = this._id;
            updateUserPoints(this.createdBy, 2);
            Answers.update(answerId, { $push: { voters: userId } }, function(error) {
                if (error) {
                    console.log("Could not update question:", error);
                }
            })
        }
    }
});
