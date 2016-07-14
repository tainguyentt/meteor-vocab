Template.voteQuestion.helpers({
    voteCount: function() {
        if (this.voters) {
            return this.voters.length;
        }
    },
    isVoted: function() {
        return this.voters;
    }
});

Template.voteQuestion.events({
    'click #vote-question': function(e) {
        e.preventDefault();
        var userId = Meteor.userId();
        if (this.voters && this.voters.includes(userId)) {
            throwError("You already voted for this");
        } else {
            var questionId = this._id;
            Meteor.call('voteQuestion', questionId, userId, function(error) {
                if (error) {
                    throwError(error.reason);
                } else {
                    updateUserPoints(this.userId, 2);
                }
            })
        }
    }
});
