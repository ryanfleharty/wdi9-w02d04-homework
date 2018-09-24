console.log('BATTLE BEGIN')

class Ship {
   constructor(name,hull,accuracy, damage) {
     this.name = name;
     this.hull = hull;
     this.accuracy = accuracy;
     this.damage = damage;
   }
}
const game = {
  mothership: new Ship("Alien Mothership",50,1,15),
  mothership_turret: new Ship("Mothership Turret",5,.7,5),
  xenos_fleet: [],
  active_xenos: [],
  player: {},
  killed_mothership: false,
  make_wave(){
    game.active_xenos = [];
    for(i = 0; i < 3;i++){
      if(game.xenos_fleet[0]){
       game.active_xenos[i] = game.xenos_fleet[0];
       game.xenos_fleet.splice(0,1);
     }
    }
    game.update_xenos();
  },
  attack(attacker, target){
    console.log(attacker.accuracy);
    console.log(target);
    if(attacker.accuracy >= Math.random()){
      target.hull-=attacker.damage;
      $('header').html(`<h1>${attacker.name} attacked ${target.name} for ${attacker.damage}</h1>`);
    }else{
      $('header').html(`<h1>${attacker.name} missed!</h1>`);
    }
    game.update_player();
    game.update_xenos();
  },
  check_win(){
    console.log(game.active_xenos)
    if(!game.active_xenos[0]){
      game.make_wave()
    }
    if(!game.active_xenos[0] && !game.killed_mothership){
      game.active_xenos[1] = game.mothership;
      game.active_xenos[0] = game.mothership_turret;
      game.active_xenos[2] = game.mothership_turret;
      game.update_xenos();
    }
    if(game.mothership.hull == 0){
      game.killed_mothership = true;
    }
    if(game.killed_mothership){
      console.log("you win!")
      $('body').html('');
    }
    if(game.player.hp<=0){
      console.log("you have failed!");
    }
  },
  update_player(){
    $('.human div').html(`
      <div class="human">
        <h1>Star Defender</h1>
        <p>
          Hull: ${game.player.hull}
          Damage: ${game.player.damage}
          Accuracy: ${game.player.accuracy}
        </p>
        <image src="images/star_defender.png" class="human_ship">
      </div>`)
  },
  update_xenos(){
    console.log(game.active_xenos);
    for(i=0;i<game.active_xenos.length;i++){
      if(game.active_xenos[i].hull <= 0){
        game.active_xenos.splice(i,1);
      }
    }
    $('.alien').html('<div class="alien"></div>');

    for(i = 0;i < game.active_xenos.length;i++){
      $('.alien div').append(`
        <h1>${game.active_xenos[i].name}</h1>
        <p>
        Hull: ${game.active_xenos[i].hull}
        Damage: ${game.active_xenos[i].damage}
        Accuracy: ${game.active_xenos[i].accuracy}
        </p>
        <image src="images/alien.png" class="alien_ship">
        <button id="${i}" type="active_xenos[${i}]">Fire!</button>
    `)
    }
    $('button').on('click', function(){
      console.log(this);
      game.on_button_click($(this).attr('id'))
    });
  },
  on_button_click(button_id){
    console.log(button_id);
    console.log("button works!");
    //attack enemy passed as parameter
    game.attack(game.player,game.active_xenos[button_id]);
    game.update_player();
    game.update_xenos();
    game.check_win();
    },
  play(){
    game.player = new Ship('defender', 1000, .7, 5);
    for(i=0;i<15;i++){
      game.xenos_fleet[i] = new Ship(`Xenos Ship ${i+1}`, 5+Math.floor(Math.random())*3, .5+Math.random()*.2, 5);
    }
    game.make_wave()
    game.update_player();
    game.update_xenos();
  }
}
game.play();
