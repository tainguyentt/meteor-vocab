Template.addQuestion.events({
    'submit form': function(event) {
        event.preventDefault();
        var question = {
            content: event.target.questionContent.value,
            topic: event.target.questionTopic.value
        }
        Meteor.call('insertQuestion', question, function(error, result) {
            if (error) {
                throwError(error.reason);
            } else {
                updateUserPoints(Meteor.userId(), 1);
                Session.set('addingQuestionMode', true);
                Router.go('displayQuestion', { _id: result._id });
            }
        });
    }
});
Template.addQuestion.onRendered(function(){
    $('#select-links').selectize({
      maxItems: null,
      valueField: 'id',
      searchField: 'title',
      options: [
        {id: 1, title: 'Kinh Te', url: 'https://diy.org'},
        {id: 2, title: 'Van Hoc', url: 'http://google.com'},
        {id: 3, title: 'An Uong', url: 'http://yahoo.com'},
        {id: 4, title: 'Nau An', url: 'https://diy.org'},
        {id: 5, title: 'CNTT', url: 'http://google.com'},
        {id: 6, title: 'Facebook', url: 'http://yahoo.com'},
      ],
      render: {
        option: function(data, escape) {
          return    '<div class="option">' +
                      '<span class="title">' + escape(data.title) + '</span>' +
                    '</div>';
        },
        item: function(data, escape) {
          return '<div class="item"><a href="' + escape(data.url) + '">' + escape(data.title) + '</a></div>';
        }
      },
      create: function(input) {
        return {
          id: 0,
          title: input,
          url: '#'
        };
      }
    });

});
