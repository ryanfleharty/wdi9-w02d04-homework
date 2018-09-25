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
	numRounds: 0,
	roundsPlayed: 0,
	sizeOfHand: 3,
	
	drawHands: function(player1, player2, handSize) {
		for (let i = 0; i < handSize; i++){
			player1.addToHand();
			player2.addToHand();
		}
	},

	displayStats: function(player1, player2){
		console.log(`Score: ${this.eggbert.name}: ${this.eggbert.points}, ${this.computer.name}: ${this.computer.points}`);

	},

	battle: function(player1, player2) {
		if (player1.hand[0].damage > player2.hand[0].damage){
			player1.points++;
		}
		else if (player2.hand[0].damage > player1.hand[0].damage){
			player2.points++;
		}
		this.displayStats(this.eggbert, this.computer);
		this.cardsPlayed.push(player1.hand.splice(0,1)[0]);
		this.cardsPlayed.push(player2.hand.splice(0,1)[0]);
	},

	determineRoundWinner: function(player1,player2) {
		console.log(`${player1.name} had ${player1.points} points. ${player2.name} had ${player2.points} points. Therefore: `);
		if (player1.points > player2.points){
			player1.roundsWon++;
			console.log(`${player1.name} won! ${player2.name} sucks`);
		}
		else if (player2.points > player1.points) {
			player2.roundsWon++;
			console.log(`${player2.name} won! ${player1.name} sucks`);
		}
		else {
			console.log('It was a tie!');
		}
	},
	playRound: function(player1, player2) {
		console.log(`The cards in ${player1.name}\'s hand are: \n${JSON.stringify(player1.hand)}`); 
				console.log(`The cards in ${player2.name}\'s hand are: \n${JSON.stringify(player2.hand)}`);
				while((player1.hand.length > 0) && (player2.hand.length > 0)){
					this.battle(player1, player2);
			}
		this.determineRoundWinner(player1,player2);
		player1.points = 0;
		player2.points = 0;
	},

	determineGameWinner: function(player1, player2) {
		console.log(`${player1.name} won ${player1.roundsWon} and ${player2.name} won ${player2.roundsWon} so:`);
		if (player1.roundsWon > player2.roundsWon){
			console.log(`${player1.name} won the game! ${player2.name} sucks!`);
		}
		else if (player2.roundsWon > player1.roundsWon){
			console.log(`${player2.name} won the game! ${player1.name} sucks!`);
		}
		else {
			console.log('It was a tie game!');
		}
	},

	playGame: function() {
		this.drawHands(this.eggbert, this.computer, this.sizeOfHand); 
		this.numRounds = $('#rounds').val();
		
		this.playRound(this.eggbert, this.computer);
	},

	startGame: function() {
		$('body').append('<p>A Basic pokemon game</p><p>Choose how many rounds you want to play, then click the battle button!');
		$('body').append('<input type ="number" max ="6" id ="rounds"> How many rounds would you like to play?(up to 6)</input>');
		$('body').append('<div id ="game"></div>');
		$('#game').append('<button id ="playRound">Play Round</button>');
		$('#game').append('<button id ="battle>BATTLE!</button>');
		$('#game').append('<p>It is currently <span id = "EggbertScore">0</span> rounds to <span id = "ComputerScore">0</span> rounds </p>');
		$('#game').append('<p>The score for this round is <span id = "EggbertPoints">0</span> points to <span id = "ComputerPoints">0</span> points.</p>');
		
		$('#playRound').on('click', () =>{
			this.playGame(this.eggbert, this.computer);
			console.log('Out of Cards to play with, Game Over!');
			this.determineGameWinner(this.eggbert, this.computer);
		})	
	}	
}

game.startGame();
