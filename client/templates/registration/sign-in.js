Template.signIn.onRendered(function() {
  var validator = $('.sign-in').validate({
    submitHandler: function(event) {
      var email = $('[name=email').val();
      var password = $('[name=password').val();
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
