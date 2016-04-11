Router.configure({
  layoutTemplate: 'layout'
});

// specify template for a route
Router.route('/', {name: 'homePage'});

Router.route('/signup', {name: 'signUp'});
Router.route('/signin', {name: 'signIn'});
Router.route('/userprofile', {name: 'userProfile'});