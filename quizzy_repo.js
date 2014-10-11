var Repo = {
	loadQuiz: function(index) {
		var quiz = new Quiz(JSON.parse(localStorage.getItem(index)));
		return quiz;
	},

	addQuiz: function(quizModel) {
		var quizIDs = retrieve('quizIDs');
		quizIDs.push({name:quizModel.name});
		populateDropdown(quizIDs);
		localStorage.setItem('quizIDs',JSON.stringify(quizIDs));
		localStorage.setItem(quizModel.name,JSON.stringify(quizModel));
	},

	getQuestion: function(quizIndex, questionIndex) {
		var quiz = getQuiz(quizIndex);
		return quiz.questions[questionIndex];
	}
};

localStorage.setItem('quizIDs',JSON.stringify(
	[{name:'19th Century Science Fiction Quiz'}]
));

localStorage.setItem(JSON.parse(localStorage.getItem('quizIDs'))[0]['name'],JSON.stringify(SFquizObject));

populateDropdown(JSON.parse(localStorage.getItem('quizIDs')))