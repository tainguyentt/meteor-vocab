Meteor.methods({
    insertAnswer: function(answer) {
        var answerId = Answers.insert(answer);
        return {
            _id: answerId
        }
    }
})