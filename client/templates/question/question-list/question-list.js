Template.questionList.events({
    'click .item': function(event) {
        var itemId = this._id;
        console.log(itemId);
        Router.go('displayQuestion', { _id: itemId });
    }
});

Template.questionList.helpers({
  isAuthor: function(userId) {
    return userId === Meteor.userId();
  }
});