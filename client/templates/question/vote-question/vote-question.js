Template.voteQuestion.helpers({
    voteCount: function() {
        if (this.voters) {
            return this.voters.length;
        }
    },
    isVoted: function() {
        return this.voters;
    },
    voted: function() {
        return this.voters && this.voters.includes(Meteor.userId());
    }
});

Template.voteQuestion.events({
    'click #vote-question': function(e) {
        e.preventDefault();
        var userId = Meteor.userId();
        var questionId = this._id;
        var authorId = this.userId;
        if (this.voters && this.voters.includes(userId)) {
            Meteor.call('unvoteQuestion', questionId, userId, function(error) {
                if (error) {
                    throwError(error.reason);
                } else {
                    updateUserPoints(authorId, -2);
                }
            })
        } else {
            Meteor.call('voteQuestion', questionId, userId, function(error) {
                if (error) {
                    throwError(error.reason);
                } else {
                    updateUserPoints(authorId, 2);
                }
            })
        }
    }
});
