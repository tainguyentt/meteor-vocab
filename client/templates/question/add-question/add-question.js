var topics = [];

Template.addQuestion.events({
    'submit form': function(event) {
        event.preventDefault();
        var question = {
            content: event.target.questionContent.value,
            topics: topics
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

    var allTopic = Topics.find().fetch();
    var count = 0;

    var getLinkTitle = (_id) => {
        let title;
        if (_id) {
            var selectedLink = _.find(allTopic, (topic) => {
              return topic._id === _id || topic._id === parseInt(_id);
            });
            if (selectedLink) {
              title = selectedLink.content;
            }
        }
        return title;
    };

    console.log("all topic: ", allTopic)

    $('#select-links').selectize({
        plugins: ['remove_button'],
        maxItems: null,
        valueField: '_id',
        searchField: 'content',
        options: allTopic,
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
            var topic = {
                _id: count++,
                content: value
            }
            allTopic.push(topic);
            return topic;
        }, 
        onChange: function(values) {
            var selectedTopic = [];
            if (values) {
                values.forEach((value) => {
                    selectedTopic.push({
                        id: value,
                        content: getLinkTitle(value)
                    });
                });
            }
            topics = selectedTopic;
        }            
    });
});
