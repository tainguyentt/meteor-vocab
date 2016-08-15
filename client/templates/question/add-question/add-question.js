Template.addQuestion.events({
	'submit form': function(event, template) {
		event.preventDefault();
		var question = {
			content: event.target.questionContent.value,
			topics: template.topics
		};

		console.warn(template.topics);

		Meteor.call('question.insert', question, function(error, result) {
			if (error) {
				throwError(error.reason);
			} else {
				updateUserPoints(Meteor.userId(), 1);
				Router.go('displayQuestion', {
					_id: result._id
				});
			}
		});
	}
});

Template.addQuestion.onRendered(function() {
	self = this;
	self.topics = [];
	var allTopics = Topics.find().fetch();
	var count = 0;

	var getContent = (_id) => {
		let content;
		if (_id) {
			var selectedTopic = _.find(allTopics, (topic) => {
				return topic._id === _id || topic._id === parseInt(_id);
			});
			if (selectedTopic) {
				content = selectedTopic.content;
			}
		}
		return content;
	};

	$('#select-topic').selectize({
		plugins: ['remove_button'],
		maxItems: 5,
		valueField: '_id',
		searchField: 'content',
		options: allTopics,
		render: {
			option: function(data, escape) {
				return '<div class="option">' +
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
			allTopics.push(topic);
			return topic;
		},
		onChange: function(values) {
			var selectedTopics = [];
			if (values) {
				values.forEach((value) => {
					selectedTopics.push({
						id: value,
						content: getContent(value)
					});
				});
			}
			self.topics = selectedTopics;
		}
	});
});
