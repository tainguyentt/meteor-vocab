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
      required: TAPi18n.__('test'),
      email: TAPi18n.__('test')
    },
    password: {
      required: "You must enter a password.",
      minlength: "Your password must be at least {0} characters."
    }
  }
});
