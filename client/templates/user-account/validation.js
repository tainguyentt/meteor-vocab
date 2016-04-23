$.validator.setDefaults({
  rules: {
    email: {
      required: true,
      email: true
    },
    password: {
      required: true,
      minlength: 6
    },
    name: {
      required: true,
      minlength: 6
    }
  },
  messages: {
    email: {
<<<<<<< HEAD:client/templates/registration/validation.js
      required: TAPi18n.__('test'),
      email: TAPi18n.__('test')
=======
      required: TAPi18n.__('requiredEmail'),
      email: TAPi18n.__('invalidEmail')
>>>>>>> master:client/templates/user-account/validation.js
    },
    password: {
      required: TAPi18n.__('requiredPassword'),
      minlength: TAPi18n.__('passwordMinLength')
    }
  }
});
