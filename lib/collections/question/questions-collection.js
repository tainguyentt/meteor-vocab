Questions = new Mongo.Collection("questions");

QuestionSchema = new SimpleSchema({
    content: {
        type: String,
    },
    topics: {
        type: [{
        	content: String,
        	id: String
        }],
    },
    userId: {
        type: String,
        autoValue: function() {
            if(Meteor.userId()) {
                return Meteor.userId();
            }
        },
        regEx: SimpleSchema.RegEx.Id,
    },
    voteCount: {
        type: Number,
        defaultValue: 0,
    },
    voters: {
        type: [String],
        defaultValue: [],
    },
    created: {
        type: Date,
        defaultValue: new Date(),
        denyUpdate: true,
    },
    updated: {
        type: Date,
        autoValue: function() {
            if (this.isUpdate)
                return new Date();
        },
        optional: true,
        denyInsert: true,
    }
});

Questions.attachSchema(QuestionSchema);
