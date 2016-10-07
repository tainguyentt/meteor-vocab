Answers = new Mongo.Collection('answers');

answerSchema = new SimpleSchema({
	content: {
		type: String,
	},
	questionId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
	},
	userId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		denyUpdate: true
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
		autoValue: function () {
			if (this.isUpdate)
				return new Date();
		},
		optional: true,
		denyInsert: true,
	}
});


Answers.attachSchema(answerSchema);
