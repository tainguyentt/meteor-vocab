getUserLanguage = function() {
  return "vi";
};

if (Meteor.isClient) {
  Meteor.startup(function() {
    var language = getUserLanguage();
    Session.set("showLoadingIndicator", true);

    TAPi18n.setLanguage(language)
      .done(function() {
        Session.set("showLoadingIndicator", false);
      })
      .fail(function(error_message) {
        // Handle the situation
        console.log(error_message);
      });
  });
}
