class GameManager {
  constructor(score_id, player_id, enemy_id, rock_id, paper_id, scissors_id, info_id) {

    // score, enemy and player
    this.score_el = document.getElementById(score_id);
    this.player_el = document.getElementById(player_id);
    this.enemy_el = document.getElementById(enemy_id);

    // player options
    this.rock_el = document.getElementById(rock_id);
    this.paper_el = document.getElementById(paper_id);
    this.scissors_el = document.getElementById(scissors_id);

    // game state header
    this.info_el = document.getElementById(info_id);

    // json of options
    this.option = {
      0: 'Scissors',
      1: 'Rock',
      2: 'Paper'
    }

    // json with emojis
    this.images = {
      0: '✂️',
      1: '✊',
      2: '📜'
    }

    // setting the score
    this.player_score = 0;
    this.enemy_score = 0;

    // event subscriptions
    this.rock_el.onclick = () => {
      this.play(1);
    }
    this.paper_el.onclick = () => {
      this.play(2);
    }
    this.scissors_el.onclick = () => {
      this.play(0);
    }

  }

  // next play step
  play(player_choice) {
      let player_index = player_choice;
      let enemy_index = getRandomInt(0, 3);

      player_choice = this.option[player_index];
      let enemy_choice = this.option[enemy_index];

      let result = this.evaluate(player_choice, enemy_choice);
      if (result == 'Win') {
        this.player_score++;
      }else if (result == 'You lost') {
        this.enemy_score++;
      }else {
        this.enemy_score++;
        this.player_score++;
      }

      this.updateUI(player_index, enemy_index, result);
  }

  updateUI(p_index, e_index, result) {
    this.score_el.innerHTML = this.player_score + ':' + this.enemy_score;
    this.player_el.innerHTML = this.images[p_index];
    this.enemy_el.innerHTML = this.images[e_index];

    this.info_el.innerHTML = result;
  }

  evaluate(player_choice, enemy_choice) {
    if (player_choice == enemy_choice) {
      return 'Draw';
    }else if (player_choice == 'Rock' && enemy_choice == 'Scissors') {
      return 'Win';
    }else if (player_choice == 'Paper' && enemy_choice == 'Rock') {
      return 'Win';
    }else if (player_choice == 'Scissors' && enemy_choice == 'Paper') {
      return 'Win';
    }else {
      return 'You lost';
    }
  }
}

// function that returns the random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}