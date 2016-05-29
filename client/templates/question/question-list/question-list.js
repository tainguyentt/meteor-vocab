Template.questionList.events({
    'click .item': function(event) {
        var itemId = this._id;
        Router.go('displayQuestion', { _id: itemId });
    }
});