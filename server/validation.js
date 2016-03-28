//Just an example of validation at server side
Accounts.validateNewUser(function(user) {
  if (user.emails && user.emails[0] && user.emails[0].address && user.emails[0].address.length > 10)
    return true;
  throw new Meteor.Error(403, "Email is too short");
});
