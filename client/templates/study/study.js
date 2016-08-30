Template.study.onCreated(function () {
	let instance = this;
	instance.questions = _.shuffle(Questions.find().fetch());
	instance.studyingQuestion = new ReactiveVar(instance.questions.pop());
	instance.autorun(function () {
		instance.subscribe("question", instance.studyingQuestion.get()._id);
	});
	Session.set("showAnswer", false);
});

Template.study.helpers({
	studyingQuestion: function () {
		let studyingQuestionId = Template.instance().studyingQuestion.get()._id;
		return Questions.findOne(studyingQuestionId);
	},
	showAnswer: function () {
		return Session.get("showAnswer");
	},
});

Template.study.events({
	'click #next-question': function () {
		let questions = Template.instance().questions;
		if (questions.length < 1) {
			Template.instance().subscribe("studyQuestions");
			Template.instance().questions = Questions.find().fetch();
		}
		Template.instance().studyingQuestion.set(Template.instance().questions.pop());
		Session.set("showAnswer", false);
	},
});
