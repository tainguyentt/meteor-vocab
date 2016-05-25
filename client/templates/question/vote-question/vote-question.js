Template.voteQuestion.helpers({
    voteCount: function() {
        return this.voters.length;
    }
});

Template.voteQuestion.events({
    'click #vote-question': function(e) {
        e.preventDefault();
        var userId = Meteor.userId();
        if (this.voters && this.voters.includes(userId)) {
            alert('You cannot vote 2 times.');
        } else {
            var questionId = this._id;
            Questions.update(questionId, { $push: { voters: userId } }, function(error) {
                if (error) {
                    console.log("Could not update question:", error);
                }
            })
        }
    }
});
