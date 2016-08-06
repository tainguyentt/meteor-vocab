Topics = new Mongo.Collection('topics');

Meteor.methods({
    insertTopic: function(topicAttr) {
    	var topicId = Topics.insert(topicAttr);
		return topicId;
    }
})