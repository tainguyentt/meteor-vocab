Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pageNotFound'
});

// specify template for a route
Router.route('/', { name: 'homePage' });

Router.route('/sign-up', {
    name: 'signUp',
    layoutTemplate: 'layout2'
});
Router.route('/sign-in', {
    name: 'signIn',
    layoutTemplate: 'layout2'
});
Router.route('/change-password', { name: 'changePassword' });

Router.route('/user-profile', { name: 'userProfile' });

Router.route('/add-question', { 
    name: 'addQuestion',
    waitOn: function() {
        return Meteor.subscribe('topics')
    }
});

Router.onBeforeAction('dataNotFound', { only: 'displayQuestion' });

Router.route('/edit-question/:_id', {
    name: 'editQuestion',
    data: function() {
        return Questions.findOne(this.params._id)
    },
    waitOn: function() {
        return Meteor.subscribe('question', this.params._id)
    }
});

Router.route('/loading');

Router.route('/display-question/:_id', {
    name: 'displayQuestion',
    data: function() {
        return Questions.findOne(this.params._id);
    },
    waitOn: function() {
        return [
            Meteor.subscribe('question', this.params._id),
            Meteor.subscribe('topics')
        ]
    }
});

Router.route('/answer-question/:_id', {
    name: 'answerQuestion',
    data: function() {
        return Questions.findOne(this.params._id);
    },
    // wait until it subscribes fully of the question with chosen id and its answers
    waitOn: function() {
        return Meteor.subscribe('question', this.params._id);
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

Router.route("/list-question-answer-by-me", {
    name: 'listQuestionAnswerByMe',
    data: function() {
        return {
            listQuestionAnsweredByMe: Questions.find()
        };
    },
    waitOn: function() {
        return Meteor.subscribe('listQuestionAnswerByMe', Meteor.userId());
    }
});

Router.route("/list-my-question", {
    name: 'listMyQuestion',
    data: function() {
        return {
            questions: Questions.find({ userId: Meteor.userId() })
        };
    },
    waitOn: function() {
        return Meteor.subscribe('listMyQuestion', Meteor.userId());
    }
})

var requireLogin = function() {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            Router.go('/sign-in');
        }
    } else {
        this.next();
    }
};

Router.onBeforeAction(requireLogin, { except: ['signIn', 'signUp'] });