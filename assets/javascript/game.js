$(document).ready(() => {
    
    let dmg = '';
    let fought = {
        names: '',
        number: 0
    }
    let fight = {
        player: {
            name: '',
            attack: 0,
            isDefending: false,
            special: true,
            health: ''
        },
        enemy: {
            name: '',
            isDefending: false,
            special: true,
            health: ''
        },
    }
    const characters = {
        theDude: new person('#dude', 'The Dude', ' abides ', " doesn't like your Eagles music ", 100, 15, 6, './assets/images/dude.jpg'),
        flea: new person('#flea', 'Flea', ' uses nihilism ', ' attacks with scissors ', 80, 8, 4, './assets/images/flea.jpg'),
        ferret: new person ('#ferret', 'Illegal Amphibious Marmot', ' projects thoughts of crime ', ' scratches', 70, 30, 8, './assets/images/ferret.jpg'),
        walter: new person('#walter', 'Walter', ' bites off an ear ', ' hurls bowling ball ', 150, 20, 8, './assets/images/walter1.jpg')
    }

    window.onload = nGame ();

    function person(id, name, spMsg, attkMsg, hp, cattk, attk, url) {
        this.id = id;
        this.whatsYourNameBby = name;
        this.specialMessage = spMsg;
        this.attackMessage = attkMsg;
        this.health = hp;
        this.counter = cattk;
        this.attack = attk;
        this.url = url;
    }

    function hBar (health, baseHp, id) {
        $(id).css('width', ((health / baseHp) * 280) + 'px');
    }
    
    function nGame () {
        (fight.player.name === '' || fight.enemy.name === '') ? $('#attack, #special').prop('disabled', true) : $('#attack, #special').prop('disabled', false);
        $('#fightText').html('Choose Your Character!')
    }

    $('.hero').click( function () {
        if (fight.player.name === '') {
            $('#fightText').html('Choose your first opponent!')
            fight.player.name = $(this).attr('value')
            fight.player.health = characters[fight.player.name].health
            fight.player.attack = characters[fight.player.name].attack
            $("#player").attr('src', characters[fight.player.name].url)
            $("#player").attr('style', 'height:200px')
        } else if (fight.player.name !== '' && fight.enemy.name === '') {
            fight.enemy.name = $(this).attr('value');
            fight.enemy.health = characters[fight.enemy.name].health
            fight.player.attack = characters[fight.player.name].attack
            $("#opponent").attr('src', characters[fight.enemy.name].url)
            $("#opponent").attr('style', 'height:200px')
            $('#attack, #special').prop('disabled', false)
            $('.hero').prop('disabled', true)
        }else if (fight.player.name !== '' && fight.enemy.name !== '' && fight.enemy.health <= 0) {
            fight.enemy.name = $(this).attr('value');
            fight.enemy.health = characters[fight.enemy.name].health
            $('#enemyH').css('width', '280px');
            $("#opponent").attr('src', characters[fight.enemy.name].url)
            $("#opponent").attr('style', 'height:200px')
            $('#attack, #special').prop('disabled', false)
            $('.hero').prop('disabled', true)
        }
    })

    function win (id) {
        if (fight.enemy.health <= 0) {
            $('#attack, #special').prop('disabled', true)
            $('.hero').prop('disabled', false)
            if (fought.names === '') { 
                (fought.names = id)  
            } else {
                (fought.names = fought.names + ', ' + id)
            }
            $(fought.names).prop('disabled', true);
            $('#fightText').html('Choose your next opponent!')
            fought.number += 1;
        }
        if (fought.number === 4) {
            $('#fightText').html('You Win! Good for you!')
        }
    }
    function lose () {
        if (fight.player.health <= 0) {
            $('#attack, #defend, #special').prop('disabled', true)
            $('.hero').prop('disabled', true)
            $('#fightText').html('You lost your rug and the money. <br>Game Over')
            $('#info').html('')
    }}
    
    function counter () {
        if (fight.enemy.health > 0 && !fight.player.isDefending) {
            dmg = characters[fight.enemy.name].counter;
            fight.player.health -= dmg;
        } else if (fight.enemy.health > 0 && fight.player.isDefending) {
            dmg = (characters[fight.enemy.name].counter * characters[fight.player.name].defend)
            fight.player.health -= dmg;
            fight.player.isDefending = false;
        }
    }
        
    $('#attack').click(() => {
        fight.enemy.health -= fight.player.attack
        fight.player.attack += characters[fight.player.name].attack
        counter ();
        hBar (fight.player.health, characters[fight.player.name].health, '#playerH')
        hBar (fight.enemy.health, characters[fight.enemy.name].health, '#enemyH')
        $('#fightText').html(characters[fight.player.name].whatsYourNameBby + characters[fight.player.name].attackMessage + (fight.player.attack - characters[fight.player.name].attack) + ' damage<br>' + characters[fight.enemy.name].whatsYourNameBby + characters[fight.enemy.name].attackMessage + characters[fight.enemy.name].counter + ' damage')
        $('#info').html('Player takes ' + characters[fight.enemy.name].counter +' dmg<br>' + characters[fight.enemy.name].whatsYourNameBby + ' takes ' + (fight.player.attack - characters[fight.player.name].attack) + ' dmg<br>Player Turn...')
        win (characters[fight.enemy.name].id)
        lose ();
    })

    $('#special').click(() => {
        if (fight.player.special = true) {
            fight.enemy.health -= (fight.player.attack * 2)
            fight.player.attack += characters[fight.player.name].attack
            $('#special').prop('disabled', true)
            counter ();
            $('#fightText').html(characters[fight.player.name].whatsYourNameBby + characters[fight.player.name].specialMessage + ((fight.player.attack - characters[fight.player.name].attack) * 2) + ' damage<br>' + characters[fight.enemy.name].whatsYourNameBby + characters[fight.enemy.name].attackMessage + characters[fight.enemy.name].counter + ' damage')
            $('#info').html('Player takes ' + characters[fight.enemy.name].counter +' dmg<br>' + characters[fight.enemy.name].whatsYourNameBby + ' takes ' + ((fight.player.attack - characters[fight.player.name].attack) * 2) + ' dmg<br>Player Turn...')
        }
        hBar (fight.player.health, characters[fight.player.name].health, '#playerH')
        hBar (fight.enemy.health, characters[fight.enemy.name].health, '#enemyH')
        win (characters[fight.enemy.name].id)
        lose ();
    })

    $('#reset').click(() => {
        fought.names = '';
        fought.number = 0;
        dmg = ''
        fight.player.name = '';
        fight.player.attack = 0;
        fight.player.health = '';
        fight.enemy.name = '';
        fight.enemy.health = '';
        $('#enemyH, #playerH').css('width', '280px');
        $('#player, #opponent').attr('src', './assets/images/750161_game_512x512.png')
        $('#player, #opponent').attr('style', 'height:200px')
        $('#info').html('')
        $('.hero').prop('disabled', false)
        nGame ();
    })
  })
    