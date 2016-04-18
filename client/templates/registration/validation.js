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
      required: TAPi18n.__('requiredEmail'),
      email: TAPi18n.__('invalidEmail')
    },
    password: {
      required: TAPi18n.__('requiredPassword'),
      minlength: TAPi18n.__('passwordMinLength')
    }
  }
});
