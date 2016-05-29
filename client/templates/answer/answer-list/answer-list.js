Template.listMyAnswer.events({
    'click .item': function(event) {
        var itemId = this.question._id;
        Session.set('answering-mode', true);
        Router.go('displayQuestion', { _id: itemId });
    }
});

Template.listMyAnswer.helpers({
});