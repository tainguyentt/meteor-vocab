Template.answerItem.onRendered(function() {
    var userId = Meteor.userId();
    if (this.data.voters && this.data.voters.includes(userId)) {
        Session.set('already-answer', true);
    }
});

Template.answerItem.helpers({
    createdAt: function() {
        return moment(this.created).lang('vi').fromNow();
    },
    voted: function() {
        return this.voters && this.voters.includes(Meteor.userId());
    },
    username: function() {
        let user = Meteor.users.findOne(this.userId);
        let name = user.profile.name;
        return name;
    }
});

Template.answerItem.events({
    'click .vote-answer': function(e) {
        e.preventDefault();
        var userId = Meteor.userId();
        var answerId = this._id;
        var askerId = this.userId;
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
