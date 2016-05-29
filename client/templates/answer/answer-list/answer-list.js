Template.listQuestionAnswerByMe.events({
    'click .item': function(event) {
        var itemId = this.question._id;
        Router.go('displayQuestion', { _id: itemId });       
    }
});