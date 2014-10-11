var SFquiz = {
	name: '19th Century Science Fiction Quiz',
	questions: [
		{
			id: 0,
			question: 'I wrote a story where a mechanical man kills its creator. Who am I?',
			answer: 'Melville',
			choices: ['Melville','Verne','Hawthorne','Shelley'],
			result: '"And so, for the interval, he was oblivious of his creature, which, not oblivious of him, and true to its creation, and true to its heedful winding up, left its post precisely at the given moment, along its well-oiled route, slid noiselessly towards its mark, and, aiming at the hand of Una to ring one clangorous note, dully smote the intervening brain of Bannadonna..." -- Herman Melville, "The Bell-Tower" (1855)'
		},
		{
			id: 1,
			question: 'The term "science fiction" first appeared in:',
			answer: '1851',
			choices: ['1851','1873','1890','1901'],
			result: '"...Science-Fiction, in which the revealed truths of Science may be given interwoven with a pleasing story which may itself be poetical and true--thus circulating a knowledge of the Poetry of Science clothed in a garb of the Poetry of Life." -- William Wilson, <em>A Little Earnest Book upon a Great Old Subject</em>'
		},
		{
			id: 2,
			question: 'I wrote about a scientist genetically engineering his daughter. Who am I?',
			answer: 'Hawthorne',
			choices: ['Verne', 'Shelley', 'Poe', 'Hawthorne'],
			result: '"My science and the sympathy between thee and him have so wrought within his system that he now stands apart from common men, as thou dost, daughter of my pride and triumph, from ordinary women." -- Hawthorne, "Rappaccini\'s Daughter" (1844)'
		},
		{
			id: 3,
			question: 'I slept around with accomplished women. A lot. Who am I? And what are you doing later?',
			answer: 'Wells',
			choices: ['Verne', 'Wells', 'Poe', 'Hawthorne'],
			result: "Wells slept with Dorothy Richardson, Violet Hunt, Rosamund Bland, Margaret Sanger, Amber Reeves, Rebecca West, Odette Keun, Elizabeth von Arnim, and probably many more."
		},
		{
			id: 4,
			question: 'I didn\'t write about a trip to the moon. Who am I?',
			answer: 'Shelley',
			choices: ['Verne','Poe','Wells','Shelley'],
			result: '<ul><li>"The Unparalleled Adventure of One Hans Pfaall" (1835) by Poe<li> <em>From the Earth to the Moon</em> (1865) and <em>Around the Moon</em> (1870) by Verne<li> <em>The First Men in The Moon</em> (1901) by Wells</ul>'
		}
	],
	players: [],
	scores: [],
	averageClicks: undefined
}

function Quiz( quizData ) {
	this.name     = quizData.name;
	this.questions= quizData.questions;
	this.players	= quizData.players;
	this.scores	  = quizData.scores;
	this.averageClicks   = quizData.averageClicks || Array.apply(null, new Array(quizData.questions.length)).map(Number.prototype.valueOf,0);
}

function Question(questionData) {
	this.id       = questionData.id;
	this.question = questionData.question;
	this.answer   = questionData.answer;
	this.choices  = questionData.choices;	
	this.result   = questionData.result;
}

function ScorerModel(name,score) {
	this.name     = name;
	this.clicks   = score;
}

function AverageClickModel(clicks) {
	this.clicks   = clicks;
}

var SFquizObject = new Quiz(SFquiz);