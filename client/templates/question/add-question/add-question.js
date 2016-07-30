var topics = [];

Template.addQuestion.events({
    'submit form': function(event) {
        var questionTopics = [];
        event.preventDefault();
        for(var i in topics){
            questionTopics.push({
                content: topics[i]
            });
        }
        var question = {
            content: event.target.questionContent.value,
            topics: questionTopics
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
    var select = $('#input-tags').selectize({
        delimiter: ',',
        persist: false,
        create: function(input) {
            return {
                value: input,
                text: input
            }
        }
    });
    var allTopic = Topics.find().fetch();
    var listTopic = [];
    for(i in allTopic){
        listTopic.push({
            content: allTopic[i].content,
            id: allTopic[i]._id
        })
    }

    $('#select-links').selectize({
        plugins: ['remove_button'],
        maxItems: null,
        valueField: 'content',
        searchField: 'content',
        options: listTopic,
        render: {
            option: function(data, escape) {
                return  '<div class="option">' +
                            '<span class="title">' + escape(data.content) + '</span>' +
                        '</div>';
            },
            item: function(data, escape) {
              return '<div class="item"><a href="' + escape(data.url) + '">' + escape(data.content) + '</a></div>';
            }
          },
          create: function(value) {
            return {
              content: value
            };
          }, 
          onChange: function(values) {
                topics = values;
          }
    });
});
