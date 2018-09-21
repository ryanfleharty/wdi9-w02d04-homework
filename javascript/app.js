console.log("Javascript is working!");
class Ship {
   constructor(name,hp,accuracy, firepower) {
     this.name = name;
     this.hp = hp;
     this.accuracy = accuracy;
     this.firepower = firepower;
   }

   attack (enemy) {
    if (this.missile_attack = true){
      this.missile_attack = false;
      this.missiles--;
      enemy.hp = 0;
      console.log(`Your missile obliterated ${enemy}`);
    }else{
    if (Math.random() < this.accuracy) { //if a hit is rolled, subtract our firepower from the enemy's hp
        enemy.hp = enemy.hp - this.firepower;
        if(enemy.hp <= 0){ //if the enemy's hp is less than zero change it to zero
            enemy.hp = 0;
        }
        console.log( `${this.name} hit ${enemy.name} for ${this.firepower}. ${enemy.name} has ${enemy.hp} remaining!`);
    } else {
        console.log(`${this.name} missed`)
    }
  }
  }
}


class AlienShip extends Ship {
    constructor(name,hp,accuracy,firepower) {
        super(name,hp,accuracy,firepower)
        this.name = name;
        this.hp = Math.floor(Math.random()*(7-3)+3);
        this.accuracy = (Math.random()*(.2)+.6);
        this.firepower = Math.floor(Math.random()*(3))+2;
    }
}



const game = {
  create_alien_fleet(){
    let alien_fleet = [];
    const numberOfAlienShips = Math.floor(Math.random()*12)+2;
    console.log(`There are ${numberOfAlienShips} alien ships.`);

    for(let i =1; i<(numberOfAlienShips); i++){
       alien_fleet[i] = new AlienShip(`alienShip${i}`, "hp","accuracy","firepower")
    }
    return alien_fleet;
  },

  play_game(){
    const player_name = prompt("Name your starship!");
    const player_ship = new Ship(player_name, 20,.7,5);
    let alien_fleet = game.create_alien_fleet();
    console.log(alien_fleet);
    
  }
}
game.play_game();
