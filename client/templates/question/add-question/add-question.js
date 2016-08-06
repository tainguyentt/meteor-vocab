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
        console.log("create question: ", question);
       /* Meteor.call('insertQuestion', question, function(error, result) {
            if (error) {
                throwError(error.reason);
            } else {
                updateUserPoints(Meteor.userId(), 1);
                Session.set('addingQuestionMode', true);
                Router.go('displayQuestion', { _id: result._id });
            }
        });*/
        
    }
});



Template.addQuestion.onRendered(function(){

var allTopic = Topics.find().fetch();

const getLinkTitle = (id) => {
  let title;
  if (id) {
    const selectedLink = _.find(allTopic, (topic) => {
      return topic.id === parseInt(id);
    });
    if (selectedLink) {
      title = selectedLink.content;
    }
  }
  return title;
};


    /*var listTopic = [];
    for(i in allTopic){
        listTopic.push({
            content: allTopic[i].content,
            id: allTopic[i]._id
        })
    }*/
    //console.log('list topic: ', listTopic);
    function addTopic(value){
         
    }

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
                content: value
            }
            Meteor.call('insertTopic', topic, function(error, result) {
                if (error) {
                    throwError(error.reason);
                }else{
                    return {
                      _id: result,
                      content: value
                    };
                }
            });
            /*return {
                _id: null,
              content: value
            };*/
        }, 
        onChange: function(values) {
            //topics = values;
             if (values) {
            values.forEach((value) => {
              // Can save to your collection/database here; for now 
              // just logging in the format you requested.
              console.log({
                id: value,
                text: getLinkTitle(value)
              });
            });
        }
        }            
    });
});
