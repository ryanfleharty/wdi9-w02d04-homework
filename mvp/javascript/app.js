class Ship  {
  constructor(hull, damage, accuracy,name){
    this.hull = hull,
    this.damage = damage,
    this.accuracy = accuracy,
    this.name = name
  }
}

const game = {
  //Generates a random number between zero and one, including the end points
  zero_to_one_inclusive () {
      if(Math.random() == 0)
      return 1;
      else
      return Math.random();
  },
  //Generates a random integer between the given values, including the end points
  inclusive_random_int (min, max) {
    range = max - min + 1;
    return min + Math.round(game.zero_to_one_inclusive()*range);
  },
  //Generates a random number between the given values, includes the end points
  inclusive_random_float(min, max){
    range = max - min;
    return min + game.zero_to_one_inclusive()*range;
  },
  //The attacker will attack the target, reducing the target's hp by the attacker's
  //damage if the attack hits.
  attack_target (attacker, target) {
    //If a random number between 0 and 1 is greater than the attacker's accuracy, the attack misses.
    if (game.zero_to_one_inclusive() >= attacker.accuracy){
      return (`${attacker.name} misses!`);
    }
    //Otherwise the defender loses hp equal to the attacker's damage.
    target.hull -= attacker.damage;
    return (`${attacker.name} attacks ${target.name} for ${attacker.damage} damage!`);
  },
  //This handles a round of combat between two ships
  combat_round (player, alien) {
    //first the player will attack the alien and the returned string will be logged to the console
    console.log(game.attack_target(player, alien));
    //then if the alien survives it gets a chance to attack
    if (alien.hull > 0){
      console.log(game.attack_target(alien, player));
    }
    //otherwise its death is displayed in the console
    else {
      console.log(`${alien.name} explodes!`);
    }

  },
  //This is the main function where the game plays out
  play () {
    //First we creat
    const player = new Ship (20, 5, .7, "The Enterprize")
    let aliens= [];
    for(i = 1; i <7;i++){
      aliens[i] = new Ship(game.inclusive_random_int(3, 6), game.inclusive_random_int(2,4), game.inclusive_random_float(.6,.8), `Alien Ship ${i}`)
      }
    //has_exploded keeps track of whether the player is alive
    has_exploded = false;
    //This loop calls combat round with the player and the active alien ship
    //while the player is still alive and that there is an alien ship left to make the active ship,
    //and deletes the active alien ship once it has died. If the player dies it
    //ends the loop by setting has_exploded to true.
    while(aliens[1] && has_exploded === false){
    active_alien = aliens[1];
        while (player.hull > 0 && aliens[1].hull > 0){
        game.combat_round(player, active_alien);
      }
      if (active_alien.hull < 1){
        aliens.splice(i,1);
      }
      if (player.hull < 1){
      console.log("Criticial systems failure!");
      has_exploded = true;
      }
    }
  //After we get out of that loop the game is over and all we have to do is
  //print a message based on the results.
  if (has_exploded === false){
    console.log("You have vanquished the invading alien fleet!")
    return;
  }
  else {
    console.log("You have failed to save Earth!");
    return;
  }

},
}
//calling game.play so that the game will play.
game.play();
