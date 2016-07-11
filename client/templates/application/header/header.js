Template.header.events({
  'click #logout': function(event) {
    event.preventDefault();
    Meteor.logout();
    Router.go('signIn');
  },
  'click .add-question-header': function(event){
    Router.go('addQuestion');
  }
});

Template.header.helpers({
  displayName: function() {
    var user = Meteor.user();
    if (!user)
      return '';

    if (user.profile && user.profile.name)
      return user.profile.name;
    if (user.username)
      return user.username;
    if (user.emails && user.emails[0] && user.emails[0].address)
      return user.emails[0].address;

    return '';
  },
  userPoints: function() {
    var user = Meteor.user();
    if (!user)
      return 0;
    if (user.profile && user.profile.points)
      return user.profile.points;
    return 0;
  }
});
