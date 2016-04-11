Template.userProfile.helpers({
  email: function() {
    var user = Meteor.user();
    if (user && user.emails && user.emails[0] && user.emails[0].address)
      return user.emails[0].address;
    return '';
  },
  emailVerified: function() {
    var user = Meteor.user();
    if (user && user.emails && user.emails[0] && user.emails[0].verified)
      return user.emails[0].verified;
    return false;
  },
  username: function() {
    var user = Meteor.user();
    if (user)
      return user.username;
    return '';
  },
  name: function() {
    var user = Meteor.user();
    if (user && user.profile)
      return user.profile.name;
    return '';
  },
  displayLanguage: function() {
    var user = Meteor.user();
    if (user && user.profile && user.profile.displayLanguage)
      return user.profile.displayLanguage;
    return 'English';
  }
});
