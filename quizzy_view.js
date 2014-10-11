$(document).on('ready', function() {
	$('.starting_button').on('click', function() {
		var quiz = QuizController.QuizLoader();
		ApplicationController.startQuiz(quiz);
	});

	$('.create_quiz').on('click', function() {
		QuizController.quizCreator();
	});
});

var QuizView = function(quizzy) {
	$container = $('.left')
	$container.empty();

	$('.quiz_title, .buttons').empty();
	$('.quiz_title').text(quizzy.name)
	
	var questionsData = quizzy.questions
	for (var i = 0; i < questionsData.length; i++) {
		var questionModel = new Question(questionsData[i]);
		var questionView = new QuestionView(questionModel,$container);
	}

	$('.buttons').append('<button class="top_scorers_button" type="button">Top Scorers</button>');	
	$('.buttons').append('<button class="average_answers_button" type="button">Clicks Per Right Answer</button>');

	$('.top_scorers_button').on('click', function() {
		ApplicationController.showTopScorers();
	});

	$('.average_answers_button').on('click', function() {
		ApplicationController.showAverageClicks();
	});
};

function QuestionView(questionModel, $container) {
	var myTemplate = _.template([
		'<div>',
			'<h3><%= question %></h3>',
			'<% for (var i = 0; i < choices.length; i++) { %>',
				'<input name="<%= id %>" type="radio" value="<%= choices[i] %>">',
				'<label><%= choices[i] %></label>',
			'<% } %>',
		'</div>'
	].join(''));
	var compiledHTML = myTemplate({
		question: questionModel.question,
		answer: questionModel.answer,
		choices: questionModel.choices,
		id: questionModel.id
	});
	$container.append(compiledHTML);
}

function ScorerView(answers,$container) {
	var minimum = undefined;
	answers.length > 10 ? minimum = 10 : minimum = answers.length
	
	var myTemplate = _.template([
		'<ol>',
		'<% for (var i = 0; i < minimum; i++) { %>',	
			'<li><%= answers[i]["name"]%> <%=answers[i]["clicks"]%>',
		'<% } %>',
		'</ol>'
	].join(''));
	var compiledHTML = myTemplate({
		minimum: minimum,
		answers: answers
	});
	$container.empty();
	$container.append(compiledHTML);
}

function AverageClickView(answers,people,$container) {
	var myTemplate = _.template([
		'<ol>',
		'<% for (var i = 0; i < answers.length; i++) { %>',	
			'<li>Average Clicks: <%=answers[i]["clicks"]/people%>',
		'<% } %>',
		'</ol>'
	].join(''));
	var compiledHTML = myTemplate({
		answers: answers,
		people: people
	});
	$container.empty();
	$container.append(compiledHTML);
}

var populateDropdown = function(quizzes) {
	var myTemplate = _.template([
		'<% for (var i = 0; i < quizzes.length; i++) { %>',	
			'<option value="<%=quizzes[i]["name"]%>"><%=quizzes[i]["name"] %></option>',
		'<% } %>'
	].join(''));
	var compiledHTML = myTemplate({
		quizzes: quizzes
	});
	$('.select_quiz').empty()
	$('.select_quiz').append(compiledHTML);
}

var QuizBuilder = function() {
	$('.quiz_title, .left, .right').empty();
	$('.quiz_title').html('<input type="text" name="quiz_title_input" value="" placeholder="Your Quiz\'s Title"/>');
	$('.left').append('<button type="button" class="quiz_saving_button">Save quiz!</button>')
	$('.left').append('<button type="button" class="question_adding_button">Add Question!</button>')

	$('.quiz_saving_button').on('click', function() {
		QuizController.quizSaver();
	});

	$('.question_adding_button').on('click', function() {
		QuestionBuilder(id);
		id++;
	});

};

var QuestionBuilder = function(id) {
	$('.left').append('<div><input type="text" name="question_input" value="" placeholder="Your question here" width="100"/></div>');
	for (var i = 0; i < 4; i++) {
		$('.left').append('<div><input type="text" class="'+i+'text" name="answer_input" value="" placeholder="Answer (check correct)"/><input type="radio" class="'+i+'" name="'+id+'" value=""></div>');
	}
	$('.left').append('<hr align="left">');
};
