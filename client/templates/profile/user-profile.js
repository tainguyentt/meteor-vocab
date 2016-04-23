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
    return 'Vietnamese';
  },
  nameEditing: function() {
    return Session.equals('nameEditing', 'true');
  }
});

Template.userProfile.events({
  'click .name-edit': function(e) {
    e.preventDefault();
    Session.set('nameEditing', 'true');
  },
  'click .name-save': function(e) {
    e.preventDefault();
    var newName = $('[name=newName]').val();
    Meteor.users.update(Meteor.userId(), { $set: { 'profile.name': newName } });
    Session.set('nameEditing', 'false');
  },
  'click .name-cancel': function(e) {
    e.preventDefault();
    Session.set('nameEditing', 'false');
  }
});
