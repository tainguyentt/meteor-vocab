Answers = new Mongo.Collection('answers', {
   transform: function(doc) {
       doc.question = Questions.findOne(doc.questionId);
       return doc;
   }
});

Meteor.methods({
    insertAnswer: function(answerAttr) {
        var user = Meteor.user();
        var answer = _.extend(answerAttr, {
            createdBy: user._id,
            createdAt: new Date()
        });
        var answerId = Answers.insert(answer);
        return {
            _id: answerId
        }
    }
})
