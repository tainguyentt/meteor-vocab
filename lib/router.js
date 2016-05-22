Router.configure({
  layoutTemplate: 'layout',
  waitOn: function(){
  	return Meteor.subscribe('questions');
  }
});

// specify template for a route
Router.route('/', {name: 'homePage'});

Router.route('/sign-up', {name: 'signUp'});
Router.route('/sign-in', {name: 'signIn'});
Router.route('/change-password', {name: 'changePassword'});

Router.route('/user-profile', {name: 'userProfile'});

Router.route('/add-question', {name: 'addQuestion'});
Router.route('/displayed-question/:question', {
	name: 'displayedQuestion',  
	data: function(){
	    return QuestionList.findOne({_id: this.params.question})
	    
	}
});



