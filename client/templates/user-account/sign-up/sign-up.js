Template.signUp.onRendered(function() {
  var validator = $('#sign-up-form').validate({
    submitHandler: function(form) {
      var name = form.name.value;
      var email = form.email.value;
      var password = form.password.value;
      Accounts.createUser({
        email: email,
        password: password,
        profile: {name: name, points: 10}
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
