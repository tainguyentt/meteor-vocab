Template.signUp.onRendered(function() {
  var validator = $('.sign-up').validate({
    submitHandler: function(event) {
      var email = $('[name=email]').val();
      var password = $('[name=password]').val();
      Accounts.createUser({
        email: email,
        password: password
      }, function(error) {
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
