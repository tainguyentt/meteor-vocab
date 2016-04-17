Router.configure({
  layoutTemplate: 'layout'
});

// specify template for a route
Router.route('/', {name: 'homePage'});

Router.route('/signup', {name: 'signUp'});
Router.route('/signin', {name: 'signIn'});
Router.route('/add-question', {name: 'addQuestion'});
Router.route('/displayed-question/:question', {
	name: 'displayedQuestion',  
	data: function(){
        return {
            question: this.params.question
        };
    }});