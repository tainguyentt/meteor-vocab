Topics = new Mongo.Collection('topics');

Meteor.methods({
    insertTopic: function(topicAttr) {
    	var listId = [];
		_.each(topicAttr, function(topic) { 
		  listId.push(Topics.insert(topic));
		})
		return listId;
    }
})