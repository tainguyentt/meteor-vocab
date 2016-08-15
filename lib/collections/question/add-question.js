Meteor.methods({
	'question.insert': function(question) {
		var topicIds = [];
		_.each(question.topics, function(topic) {
			if (parseInt(topic.id) < 10) {
				delete topic.id;
				topicIds.push(Topics.insert(topic));
			} else {
				topicIds.push(topic.id);
			}
		});
		question.topics = topicIds;
		return {
			_id: Questions.insert(question)
		};
	},

	updateQuestion: function(questionId, question) {
		Questions.update(questionId, {
			$set: question
		});
	}
})
