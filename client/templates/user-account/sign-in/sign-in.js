Template.signIn.onRendered(function() {
  var validator = $('.sign-in').validate({
    submitHandler: function(form) {
      var email = form.email.value;
      var password = form.password.value;
      Meteor.loginWithPassword(email, password, function(error) {
        if (error) {
          validator.showErrors({
            messages: error.reason
          });
        } else {
          Router.go('homePage');
        }
      });
    }
  });
});
