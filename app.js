//THE ARRAY OF CARDS

const cards = [
  {
    name: "Bulbasaur",
    damage: 60
  }, {
    name: "Caterpie",
    damage: 40
  }, {
    name: "Charmander",
    damage: 60
  }, {
    name: "Clefairy",
    damage: 50
  }, {
    name: "Jigglypuff",
    damage: 60
  }, {
    name: "Mankey",
    damage: 30
  }, {
    name: "Meowth",
    damage: 60
  }, {
    name: "Nidoran - female",
    damage: 60
  }, {
    name: "Nidoran - male",
    damage: 50
  }, {
    name: "Oddish",
    damage: 40
  }, {
    name: "Pidgey",
    damage: 50
  }, {
    name: "Pikachu",
    damage: 50
  }, {
    name: "Poliwag",
    damage: 50
  }, {
    name: "Psyduck",
    damage: 60
  }, {
    name: "Rattata",
    damage: 30
  }, {
    name: "Squirtle",
    damage: 60
  }, {
    name: "Vulpix",
    damage: 50
  }, {
    name: "Weedle", 
    damage: 40
  }
]

class Player {
	constructor(name){
		this.name = name;
		this.hand = [];
		this.points = 0;
		this.roundsWon = 0;
		this.handLength = 3;
	}
	addToHand(){
		const card = game.deck.splice(Math.floor(Math.random()*game.deck.length), 1)[0];
		this.hand.push(card);
	}
}

const game = {
	deck: cards,
	cardsPlayed: [],
	eggbert: new Player('eggbert'),
	computer: new Player('computer'),
	numRounds: null,
	roundsPlayed: 0,
	sizeOfHand: 3,
	
	drawHands: function(player1, player2, handSize) {
		for (let i = 0; i < handSize; i++){
			player1.addToHand();
			player2.addToHand();
		}
	},

	displayStats: function(player1, player2){
		$('#ComputerPoints').text(player2.points);
		$('#EggbertPoints').text(player1.points);
	},

	displayCards: function(player1, player2){
		$('#cards').html('<p/>');
		$('#cards').html('<p id ="playersCard"/><p id ="computersCard"/>');
		$('#playersCard').html('<span id ="playersName"/>\'s card is: <span id ="playersCardAttributes"/>');
		$('#computersCard').html('<span id ="computersName"/>\'s card is: <span id ="computersCardAttributes"/>');
		$('#playersName').text(player1.name);
		$('#computersName').text(player2.name);
		$('#playersCardAttributes').text(player1.hand[0].name + ' with ' + player1.hand[0].damage + ' damage');
		$('#computersCardAttributes').text(player2.hand[0].name + ' with ' + player2.hand[0].damage + ' damage');
	},

	determineRoundWinner: function(player1,player2) {
		if (player1.points > player2.points){
			player1.roundsWon++;
			$('#roundWinner').html('So, <span id = "roundWinnerName"/> won the round!');
			$('#roundWinnerName').text(player1.name);
		}
		else if (player2.points > player1.points) {
			player2.roundsWon++;
			$('#roundWinner').html('So, <span id = "roundWinnerName"/> won the round!');
			$('#roundWinnerName').text(player2.name);
		}
		else {
			$('#roundWinner').html('So, it was a tie!');
		}
		$('#EggbertScore').text(player1.roundsWon);
		$('#ComputerScore').text(player2.roundsWon);
	},

	battle: function(player1, player2) {
		if(player1.hand.length > 0 && player2.hand.length > 0){	
			this.displayCards(player1, player2);
			if (player1.hand[0].damage > player2.hand[0].damage){
				player1.points++;
				
			}
			else if (player2.hand[0].damage > player1.hand[0].damage){
				player2.points++;
			}
			this.displayStats(this.eggbert, this.computer);
			this.cardsPlayed.push(player1.hand.splice(0,1)[0]);
			this.cardsPlayed.push(player2.hand.splice(0,1)[0]);
		}
		else {
			this.determineRoundWinner(player1, player2);
			$('#playRound').prop('disabled', false);
			$('#battle').prop('disabled', true);
			$('#cards').html('<p/>');
		}
	},

	playRound: function(player1, player2) {	
		$('#roundWinner').html('');
		$('#EggbertPoints').text('0');
		$('#ComputerPoints').text('0');
		if(this.numRounds===this.roundsPlayed){
			this.determineGameWinner(this.eggbert, this.computer);
			$('#playRound').off('click');
			$('#battle').off('click');
			$('#playRound').prop('disabled', true );
			$('#battle').prop('disabled', true );
		}
		else{
			this.roundsPlayed++;
			this.numRounds = parseInt($('#rounds').val());
			$('#rounds').prop('disabled',true);
			$('#battle').prop('disabled', false);
			$('#playRound').prop('disabled', true);
			
			this.drawHands(this.eggbert, this.computer, this.sizeOfHand);
			$('#roundCount').html('This is round <span id ="roundsPlayed"/>, you have <span id ="roundsLeft"/> left');
			$('#roundsPlayed').text(this.roundsPlayed);
			$('#roundsLeft').text(this.numRounds-this.roundsPlayed);
			$('#battle').off().on('click', () => {	
				this.battle(player1, player2);
			});
			player1.points = 0;
			player2.points = 0;
		}
	},

	playAgain: function(){
		this.deck = cards;
		this.cardsPlayed = [];
		this.eggbert.roundsWon = 0;
		this.eggbert.points = 0;
		this.computer.roundsWon = 0;
		this.computer.points = 0;
		this.roundsPlayed = 0;
		this.numRounds = null;
		this.startGame();
	},

	determineGameWinner: function(player1, player2) {
		if (player1.roundsWon > player2.roundsWon){
			$('#game').append('<p>So <span id ="player1Won"/> won the game!');
			$('#player1Won').text(player1.name);
		}
		else if (player2.roundsWon > player1.roundsWon){
			$('#game').append('<p>So <span id ="player2Won"/> won the game!');
			$('#player2Won').text(player2.name);
		}
		else {
			$('#game').append('<p>So it was a tie game!');
		}
		$('#game').append('<button id ="playAgain">Play Again?</button>');
		$('#playAgain').off().on('click', () =>{
			this.playAgain();
		});
	},

	startGame: function() {
		$('body').empty();
		$('body').append('<p>A Basic pokemon game</p><p>Choose how many rounds you want to play, then click the battle button!');
		$('body').append('<input type ="number" max ="3" id ="rounds"> How many rounds would you like to play?(up to 3)</input>');
		$('body').append('<div id ="game"><p id ="roundCount"/><div id ="cards"></div><p id = "roundWinner"/></div>');
		$('#game').append('<button id ="playRound">Play Round</button>');
		$('#game').append('<button id ="battle">BATTLE!</button>');
		$('#battle').prop('disabled', true);
		$('#game').append('<p>It is currently <span id = "EggbertScore">0</span> rounds to <span id = "ComputerScore">0</span> rounds </p>');
		$('#game').append('<p>The score for this round is <span id = "EggbertPoints">0</span> points to <span id = "ComputerPoints">0</span> points.</p>');
		
		$('#playRound').on('click', () => {
			this.playRound(this.eggbert, this.computer);
		});
	}
}

game.startGame();
