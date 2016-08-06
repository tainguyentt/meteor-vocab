Topics = new Mongo.Collection('topics');

Meteor.methods({
    insertTopic: function(topicAttr) {
    	return Topics.insert(topicAttr);
    }
})