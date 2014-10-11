var ApplicationController = {
	
	correctAnswers: undefined,
	averageClicksArray: undefined,
	clicks: undefined,

	startQuiz: function(quizData) {
		$('.right').empty();
		$('.result').empty;

		var me = this;
		me.correctAnswers = Array.apply(null, new Array(quizData.questions.length)).map(Boolean.prototype.valueOf,false);
		me.averageClicksArray = Array.apply(null, new Array(quizData.questions.length)).map(Number.prototype.valueOf,0);

		$('input[type=radio]').on('click', function() {
			me.averageClicksArray[$(this).attr('name')]++;
			$('.right').empty();
			if (($(this).val()) === (quizData.questions[$(this).attr('name')].answer)) {
				$('.right').html(quizData.questions[$(this).attr('name')].result);
				me.correctAnswers[$(this).attr('name')] = true;
				if (me.correctAnswers.every(isTrue)) {
					ApplicationController.winningCondition();
				}
			} else {
				$('.right').html("Try again");
			}
		});
	},

	winningCondition: function() {
		var me = this;
		clicks = me.averageClicksArray.reduce(function(a, b) {
  		return a + b;
		});
		$('.announcement').append("You clicked " +clicks+ " times before you got all "+me.correctAnswers.length+" answers correct");
		$('.overlay, .result').show();
	},

	attachListeners: function() {
		$(document).on('click', '#submit', function(e) {
			e.preventDefault();
			winningFunction(clicks,ApplicationController.averageClicksArray);
		});
	},

	showTopScorers: function() {
		$container = $('.right');
		answers = []

		var storedNames = retrieve("players");
		
		var storedScores = retrieve("scores");
		
		for (i in storedNames) {
			answers.push(new ScorerModel(storedNames[i], storedScores[i]));
		}
		answers.sort(function(a, b) {return a['clicks'] - b['clicks']});
		ScorerView(answers,$container);
	},

	showAverageClicks: function() {
		$container = $('.right');
		answers = []

		var averageClicks = retrieve("averageClicks");

		var people = retrieve("players").length;

		for (i in averageClicks) {
			answers.push(new AverageClickModel(averageClicks[i]));
		}
		AverageClickView(answers,people,$container);
	}
};

ApplicationController.attachListeners();

function isTrue(element) {
  return element === true;
}

function retrieve(name) {
	var answer = [];
	if (typeof (localStorage[name]) != 'undefined') {
		answer = JSON.parse(localStorage[name]);
	}
	return answer;
}

function winningFunction(clicks, averageClicksArray) {
	$('.announcement').empty();
	$('.overlay, .result').hide();

	var storedNames = retrieve("players");
	storedNames.push($('#name').val());
	$('#name').val('');
	localStorage.setItem("players",JSON.stringify(storedNames));

	var storedScores = retrieve("scores");
	storedScores.push(clicks);
	localStorage.setItem("scores",JSON.stringify(storedScores));

	var storedAverages = retrieve("averageClicks");
			
	for (i in averageClicksArray) {
		storedAverages[i] = storedAverages[i] +averageClicksArray[i];
	}

	localStorage.setItem("averageClicks",JSON.stringify(storedAverages));

	QuizController.QuizUnloader();
	var quiz = QuizController.QuizLoader();
	ApplicationController.startQuiz(quiz);
}

var QuizController = {
	quizToLoad: undefined,

	quizCreator: function() {
		id = 0;
		QuizBuilder();
	},

	quizSaver: function() {
		var rawQuiz = {
			name : $('[name="quiz_title_input"]').val(),
			questions : [],
			players : [],
			scores :	[],
			averageClicks : []
		}
		var quizData = new Quiz(rawQuiz);
		
		for (var q = 0; q < id; q++) {
			var rawQuestion = {
				id : q,
				question : $('[name="question_input"]').val(),
				choices : [],
				answer : ""
			}
			for (var i = 0; i < 4; i++) {
				var potentialAnswer = $('.'+i+'text').val();
				rawQuestion.choices.push(potentialAnswer);
				if ($('.'+i).prop( "checked")) {
					rawQuestion.answer = potentialAnswer;
				}
			}
			var questionData = new Question(rawQuestion);
			quizData.questions.push(questionData);
		}
	Repo.addQuiz(quizData);
	},

	QuizLoader: function() {
		this.quizToLoad = $('.select_quiz :selected').val();
		objectQuiz = Repo.loadQuiz(this.quizToLoad);
		localStorage.setItem('players',JSON.stringify(objectQuiz.players));
		localStorage.setItem('scores',JSON.stringify(objectQuiz.scores));
		localStorage.setItem('averageClicks',JSON.stringify(objectQuiz.averageClicks));
		QuizView(objectQuiz);
		return objectQuiz;
	},

	QuizUnloader: function() {
		objectQuiz = Repo.loadQuiz(this.quizToLoad);
		var players = JSON.parse(localStorage.getItem('players'));
		var scores = JSON.parse(localStorage.getItem('scores'));
		var averageClicks = JSON.parse(localStorage.getItem('averageClicks'));
		objectQuiz['players'] = players;
		objectQuiz['scores'] = scores;
		objectQuiz['averageClicks'] = averageClicks;
		localStorage.setItem(objectQuiz.name, JSON.stringify(objectQuiz));
	}
};
