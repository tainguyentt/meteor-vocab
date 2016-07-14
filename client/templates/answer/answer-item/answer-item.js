Template.answerItem.onRendered(function() {
    var userId = Meteor.userId();
    if (this.data.voters && this.data.voters.includes(userId)) {
        Session.set('already-answer', true);
    }
});

Template.answerItem.helpers({
    createdTime: function() {
        return this.createdAt.toDateString();
    },
    voteCount: function() {
        return this.voters ? this.voters.length : 0;
    },
    isVoted: function() {
        return this.voters && this.voters.length > 0;
    }
});

Template.answerItem.events({
    'click .vote-answer': function(e) {
        e.preventDefault();
        var userId = Meteor.userId();
        var answerId = this._id;
        var askerId = this.createdBy;
        if (this.voters && this.voters.includes(userId)) {
            Meteor.call('unvoteAnswer', answerId, userId, function(error) {
                if (error) {
                    console.log("Could not update answer:", error);
                } else {
                    updateUserPoints(askerId, -2);
                }
            });
        } else {
            Meteor.call('voteAnswer', answerId, userId, function(error) {
                if (error) {
                    console.log("Could not update answer:", error);
                } else {
                    updateUserPoints(askerId, 2);
                }
            });
        }
    }
});
