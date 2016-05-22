Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'pageNotFound'
});

// specify template for a route
Router.route('/', { name: 'homePage' });

Router.route('/sign-up', { name: 'signUp' });
Router.route('/sign-in', { name: 'signIn' });
Router.route('/change-password', { name: 'changePassword' });

Router.route('/user-profile', { name: 'userProfile' });

Router.route('/add-question', { name: 'addQuestion' });

Router.route('/display-question/:_id', {
    name: 'displayQuestion',
    data: function() {
        return Questions.findOne(this.params._id);
    },
    // wait until it subscribes fully of the question with chosen id and its answers
    waitOn: function() {
        return [
            Meteor.subscribe('question', this.params._id),
            Meteor.subscribe('answers', this.params._id)
        ]
    }
});

Router.route('/questions', {
    name: 'questionList',
    data: function() {
        return {
            questions: Questions.find()
        };
    },
    waitOn: function() {
        return Meteor.subscribe('questions');
    }
});

var requireLogin = function() {
    if (!Meteor.user() && !Meteor.loggingIn()) {
        this.render('signIn');
    } else {
        this.next();
    }
};
Router.onBeforeAction(requireLogin, { except: ['signIn', 'signUp'] });

Router.onBeforeAction('dataNotFound', { only: 'displayQuestion' });