Template.changePassword.onRendered(function() {
  var validator = $('.change-password').validate({
    rules: {
      currentPassword: {
        required: true,
        minlength: 6
      },
      newPassword: {
        required: true,
        minlength: 6
      },
      newPasswordRepeated: {
        required: true,
        minlength: 6
      }
    },
    submitHandler: function(form) {
      var currentPassword = form.currentPassword.value;
      var newPassword = form.newPassword.value;
      var newPasswordRepeated = form.newPasswordRepeated.value;
      if (newPassword == newPasswordRepeated) {
        Accounts.changePassword(currentPassword, newPassword, function(error) {
          if (error) {
            validator.showErrors({
              messages: error.reason
            });
          } else {
            Router.go('userProfile');
          }
        })
      } else {
        validator.showErrors({
          messages: "New password and repeated not the same"
        });
      }
    }
  });
})
