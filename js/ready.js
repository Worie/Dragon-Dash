/**
Copyright (c) 2014
author Wojciech Połowniak aka Worie

Editing the source code, placing it on other websites without my permission is forbitten.
* 
Co potrafi JavaScript

- Zarządzanie weberwerami
- Obsługa mikrokontrolerów
- Real Time Communications
- Aplikacje desktopowe i mobilne
- Gry 3D
- Obsługa gamepadów
- Obsługa Microsoft Kinect przy pomocy JS

- Moja gra mobilna



bombs does not give any points currently - fix , create a function which returns an ammount of points that should be added
separete 'private' functions from this file.

indexOf returns an INDEX ! dude thats awesome .. ur idiot (youll need this when youll do the 'bomb into another')
refactor the code inside checkIfCorrect - you should get rid of mode and CheckTypeOfHit - you can do this in lookForMatch, at the begining.
this method will allow you to get bonuses if you hit one group of same color (without a need to aim for this bonus espacialy)

the longer hits, the higher time between combos?

bonuses can relay on score/time, too

remember about the settings menu and sliders. you can add an difficulty level there too (shorter combo time, more colors at once?) 
in settings menu provide an option that'll allow you to enable or disable auto (just for you)

fix the damn score-display after each hit... 

additional info you can show to the player (after finishing the match)
- Accuracy
- Score
- Clicks per second
- Highest combo
!!!!!!!!!!!!!!!!!!! score per second !!!!!!!!!!!!!!!!!!!!!!!


^^^^^^^^^^^^^^backend security:

-passwords hashing
-sessions checks on logins etc, logging out if needed

code improvements:
- functions, functions, functions!
	- formError // blink on red color and go back after 500s, as a plugin
	- login, logout

^^ 
senzu rozjeżdża grę

^^ 
dodaj więcej dostępnych kolorów, w przypadku trudnego poziomu trudnosci bedzie brakowalo np do bomby


.gameButton click redirect(this.data('href'))

nie ma potrzeby rysowac tile'ow za kazdym razem. 

poprawić animacje klocków które mają spaść z góry


------------------------------------

skalowalny small goku i logo główne

wyrównać text w monicie  / achievementach

przechowywanie informacji o graczu w device storage - ustawienia oraz logowanie (pamietaj - nie na zasadzie 'przechowuje tam haslo i nick' 







--------------------------------------
poprawić dźwięki. (ładniejsze + formaty dla wszystkich pzregladarek)
---------------------------------------
czcionka
----------------------------------------
--------------------------------------
saiyajin mode i bomba (zmiana nazwy przedewszystkim i zeby to kurde działało )
--------------------------------------

------------------------------------
zmiana loga głównego
-------------------------------------
-----------------------------------------


-----------------------------------------
mute button (main) , soundtrack button (settings)
-----------------------------------------
cień również na procentach
---------------------------------
--------------------------------------
wyłączanie listenerów clienckich - dodatek do ułatwienia na przyszłość i bezpieczenstwa
-----------------------------------------
seter sliderów
--------------------------------------------------------
shuffle animation off when settings
----------------------------------------
achievements back (logic)
--------------------------------------------------------------------
----------------------
poziomy trudności zmniejszają wymagane combo do ssj / do umiejetnosci ??

----------------------------
dodatkowy kolor
----------------------------
rage power instead of ssj ? 




nie mozna zapisac achievementu do bazy z jakiegos powodu, on achuievement table doesnt exists ? weird

combo pożera bonusy. zmienić, dodać warunek ze jesli src!= od none to wtedy rób bonus jakos

ustawianie avatarów
miejsce do ustawiania awatarów, coś jakby profil?


stopka? informacje tam w marquee (plugin)

rozważ rezygnacje z animacji (po prostu szybkie wyświetlanie kolejnych klocków u góry)
nie wiem czy to ma sens no ale spróbować można 



nie rób braku animacji bąbelkowo - wiesz , gdzie ma upaść dany klocek, wiec po prostu element w ktorym ma sie on znalezc pobierz za pomoca frompoint i zmien jego src na ten docelowy. Rób tak do czasu az wszystkie w kolumnie 'spadną' a gdy juz siagniesz limitu gornego w px z randomizuj wszystkie x od góry w tej kolumnie (x = hitsincol). podobnie jak set animation tylko troche w inna strone


- character select

- powers
- bosses (to defeat requires powers)  -consider

- multiplayer improvements (characters)
- powers uses combo. (-)

// skierować grę bardziej na multiplayer

// musisz trafić klocek żeby użyć umiejętności

difficulty balls (different stars)

lookformatch impr

check if iphone3gs, then do not load any sounds (perhaps...)

preload fix 

skills :
 - delayed fall 
 - only if animation
*/
	


$(document).ready(function(){
	var tilesX = X,tilesY=Y;
	
	Oldies=false;
	
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
	    if (!(window.devicePixelRatio > 1)){
		  Oldies = true; 
	    }
	};

	//Oldies = true;
	
	if(Oldies==true){
		withoutSound();
	}else{
		withSound();
	}
/*
	$('#testt').noUiSlider({
	start: 40,
	connect: "lower",
	range: {
	  'min': 0,
	  'max': 100
	}
});


*/
	size = getTileSize();
	// Change the size in class
	$("#temporrr").text($(this).text().replace('.tile {','.tile { height:'+size+'px; width:'+size+'px;'));
	//$("#temporrr").text($(this).text().replace('body {','body { font-size:'+size+'px;'));
	$("#temporrr").text($(this).text().replace('body {','body { font-size:1px;')); // no idea why is it req to not overflow the page. probably some letter in body . or kid goku


	replaceClassProp('avatar','width',(size/2)+'px');
	replaceClassProp('avatar','height',(size/2)+'px');
	replaceClassProp('avatar','border-radius',size/6+'px');


	replaceClassProp('achIco','width',(size/10)*8+'px');
	replaceClassProp('achIco','height',(size/10)*8+'px');
	replaceClassProp('achIco','margin-top',size/10+'px');
	replaceClassProp('achIco','margin-left',size/10+'px');
	replaceClassProp('achIco','border-radius',size/8+'px');

/*
replaceClassProp('avatar','width',(size/10)*8+'px');
replaceClassProp('avatar','height',(size/10)*8+'px');
replaceClassProp('avatar','margin-top',size/10+'px');
replaceClassProp('avatar','margin-left',size/10+'px');
*/

	replaceClassProp('rotationBall','width',2*size+'px');
	replaceClassProp('rotationBall','height',2*size+'px');

//replaceClassProp('achievement','width',size+'px');
	replaceClassProp('achievement','height',size+'px');
	replaceClassProp('achievement','line-height',size+'px');

	replaceClassProp('leader','height',size+'px');
	replaceClassProp('leader','line-height',size+'px');

	replaceClassProp('details','font-size',size/3+'px');

	replaceClassProp('achievementBar','font-size',size/4+'px');
	replaceClassProp('achievementBar','line-height',size/4+'px');


	replaceClassProp('slider.on>img','left',size/2+'px');
	$('.slider').css('width',size+'px');
	$('.slider').css('height',size/2+'px');
	$('.slider').css('border-radius','100px');
	$('.slider>img').css('width',size/2+'px');
	$('.slider>img').css('height',size/2+'px');

	replaceClassProp('slider','width',2*size+'px');
	replaceClassProp('slider','height',size+'px');
//replaceClassProp('slider>img','width',2*size+'px');
//replaceClassProp('slider','height',size+'px');

	$('.slider').on('mousedown touchstart',function(){buttonSlide($(this).children('img'));

		var value=$(this).data('val');
		
		switch(value){
			case 'auto_clicker': settings.auto_clicker=toggle(settings.auto_clicker);break;
			case 'animations' : settings.animations=toggle(settings.animations);$.fx.off = toggle($.fx.off);break;
			case 'sounds tiles' : settings.sounds.tiles=toggle(settings.sounds.tiles);break;
			case 'sounds bonus' : settings.sounds.bonus=toggle(settings.sounds.bonus);break;
			case 'sounds buttons' : settings.sounds.buttons=toggle(settings.sounds.buttons);break;
			case 'sounds shuffle' : settings.sounds.shuffle=toggle(settings.sounds.shuffle);break;
			case 'remember': settings.remember=toggle(settings.remember);break;
		}

	});
	

	replaceClassProp('character','height',size+'px');
	replaceClassProp('character','width',size+'px');

	replaceClassProp('difficultyRadio','height',size+'px');
	replaceClassProp('difficultyRadio','width',size+'px');
	$('.difficultyRadio').parent().click(function(){
		if(gameInProgress==true){return false;}
		$('.difficultyRadio').removeClass('on');
		$(this).children('img').addClass('on');
		setDifficulty($(this).data('val'));
	});
// CREATE CREDITS

	$('body').css('width',$(window).width()+'px');
	$('body').css('height',$(window).height()+'px');
	$('body').css('overflow','hidden');

	$('#handler').hide();

	$('#preloading').css('width',$(window).width()+'px');
	$('#preloading').css('font-size',size+'px');
	$('#preloading img').css('width',size+'px');
	$('#preloading img').css('height',size+'px');
	$('#preloading').css('height',size*2+'px');
	$('#preloading').center(false);


	$('.loading.small').children('img').css('width',size+'px');
	$('.loading.small').children('img').css('height',size+'px');

	$('#small_goku').css('width',size*3+'px');
	$('#small_goku').css('right',-size+'px');
	$('body').show();

	var box = document.createElement("div");
		box.className = 'gameButton';
		box.innerHTML='Main menu';
		box.style.marginTop='10px';
		$(box).on('click',function() {showScreen('start_screen'); return false;});
		$('#credits').append(box);
		$('#credits').append('Copyright (C) Worie.<br/> DragonBall (C) Akira Toriyama. All rights reserved.<br/><br/>Created by Wojciech Polowniak<br/>I hope you enjoy the game. Thanks for playing!');
	
	


		
		//$('#credits').append(con);
		
		
// CREATE PAUSE

	box = document.createElement("div");
	box.className = 'gameButton';
	box.innerHTML='Resume game';
	box.style.marginTop='100px';
	
	$(box).on('click',function(e) {resumeGame(); return false;});
	
	$('#game_pause').append(box);
	
	
	box = document.createElement("div");
	box.className = 'gameButton';
	box.innerHTML='Settings';
	box.style.marginTop='100px';
	
	$(box).on('click',function(e) {showScreen('settings');});
	
	$('#game_pause').append(box);
	
	box = document.createElement("div");
	box.className = 'gameButton';
	box.innerHTML='Achievements';
	box.style.marginTop='100px';
	
	$(box).on('click',function(e) {showScreen('achievements');});
	
	$('#game_pause').append(box);
	
	

	
	// 	$('#start_screen').show();

	
	$('#init_game').on('click',function(){gameStart(); return false;});
	$('#credits_game').on('click',function(){showScreen('credits'); return false;});
	
	var box = document.createElement("div");
	box.className = 'gameButton';
	box.innerHTML='Quit match';
	box.style.marginTop='10px';
	$(box).on('click',function(e) {gameEnd('giveup');$('#game_pause').hide();$('#small_goku').hide();if(gameType=='versus'){socket.emit('multiplayer_resign');}});
	$('#game_pause').append(box);
	$('#game_pause').css('padding-top',($('#game_pause').css('height')-size*2-15)/2+'px');
	
	//$('#pause_btn').on('click',function(){$(con).remove();startIntervals();});
	
// CREATE FINAL SCREEN 





	var pause_button = document.createElement('button');
	pause_button.id = 'pause_btn';
	
	$('#top_bar').append(pause_button);
	$('#pause_btn').on('click',function(){pauseGame(); return false;});
	$('#pause_btn').hide();
	
	
	
	//$('#versus_v
	
	$('.achievementBar').css('line-height',$(window).height()/12+'px');
	$('.achievementBar').css('font-size',$(window).height()/12+'px');
	
	$('#ki_bar,#top_bar').css('height',$(window).height()/12+'px');	
	$('#ki_info').css('line-height',size/2+'px');
	$('#ki_info').css('font-size',size/2+'px');
	$('#ki_bar,#top_bar').css('width',size*7+'px');
	$('#ki_bar').css('top',size*8+size/2+'px');
	$('#hanlder').css('height',$(window).height()+'px');
	//$('.screen').css('height',$(window).height()/10+'px');
	$('.screen,#container').css('width',size*7+'px');
	$('.screen').css('height',size*9+'px');
	
	//$('#start_screen').css('top',$('#handler').css('height')-$('#top_bar').css('height')-

	$('#handler').css('height',$(window).height()+'px');
	$('#handler').css('width',size*7+'px');

	$('#container').css('height',$(window).height()-$(window).height()/11+'px');
	
	$('#nick_field,#pass_field').on('focus',function(){$(this).html('');});
	
	$('#login').on('click',function(){showScreen('sign_in'); return false;});
	
	$('#form_login').submit(function(e){e.preventDefault();
	
	socket.emit('login',{name : $('#login_nick_field').val(), pass : $('#login_pass_field').val(),remember:settings.remember});return false;});
	
	$('#form_register').submit(function(e){
	e.preventDefault();

	var nick=$('#register_nick_field'),mail=$('#register_mail_field'),pass=$('#register_pass_field');
	if(nick.val()=='' || mail.val()=='' || pass.val()==''){
	
	if(nick.val()==''){
			nick.formError();
	}
	if(mail.val()==''){
			mail.formError();
	}
	if(pass.val()==''){
			pass.formError();
	}
	
	return false;
	}
	socket.emit('register',{name : $('#register_nick_field').val(), pass : $('#register_pass_field').val(),mail : $('#register_mail_field').val()});
	return false;});
	
	$('#sign_in_main_menu,#sign_up_main_menu').on('click',function(){showScreen('start_screen');  return false;});
	$('#sign_in_sign_up').on('click',function(){showScreen('sign_up'); return false;});
	
	$('#ki_bar').css('font-size',size/2+'px');
	$('.gameButton:not(.inactive)[data-href]').each(function(){
	
	// theres probably better way to to it with obj.click(fun) handler.
	$(this).on('click',function(){
			playSound('buttons','tick');
			gameButtonAction($(this).attr('data-href'));
	
	});
	
	
	});
	
	$('#multiplayer').on('click',function(){		
		socket.emit('multiplayer');
		showScreen("versus_search"); 
		$('#settings_icon').hide();
	});
	
	$('.gameButton').css('height',size+'px');
	$('.gameButton').css('line-height',size+'px');
	$('.gameButton.small').css('height',size/2+'px');
	$('.gameButton.small').css('line-height',size/2+'px');
	$('.gameButton').css('width',size*6+'px');
	$('.gameButton.small').css('width',size*4+'px');

	
	$('#remember_me').css('width',size*4+'px');


	$('.gameButton').css('text-align','center');
	
	$('#logout').click(function(){ logOut();});
	
	$('.screen').css('font-size',size/2+'px');
	$('.gameButton').css('font-size',size/2+'px');
	
	$('.gameButton:not(:submit)').css('padding-top',(size-size/2)/2+'px');
	
	$('.gameButton').css('margin-top',size/4+'px');
	
//	if(!jQuery.browser.mobile){$('body').css('text-align','');$('#handler').css('margin','');}else{
//		$('body').css('text-align','center');$('#handler').css('margin','0 auto');
//		}

	
		$('body').css('text-align','center');$('#handler').css('margin','0 auto');
		$('#achievements_menu').click(function(){showScreen('achievements');});
		$('.achievement').click(function(){$(this).next().slideToggle("fast");});
		$('.achInfo').click(function(){$(this).slideToggle("fast");});
		
		
			$(document).on('keypress',function(e){
		var code = e.keyCode || e.which;
		if(code==32){
			// not an elegant solution ... make one function that randomize all tiles
			$('#refresh_tiles').click();
					

			}
		else{
		}
	});
		
		
		$('#refresh_tiles').on('click',function(){
		if(gameInProgress && !game_paused){
	if(settings.sounds.shuffle===true)lowLag.play('refresh');
	
	if(settings.animations===true){
		$('#refresh_tiles').hide();
		tiles.each(function(){
		var tmp = this;
		setTimeout(function(){
		$(tmp).transition({
		rotateY: '360deg'
		},100).transition({rotateY:'0deg'});
		$(tmp).Randomize();
		},getRandomInt(50,300));
		
		setTimeout(function(){$('#refresh_tiles').show();},400);
		}
		);
	}else{
		tiles.each(function(){
		$(this).Randomize();
		});

	}
	}
	});
});



$(window).load(function(){

	$('#preloading').fadeOut(200);
	setTimeout(function(){
			$('#preload').remove();
			$('#preloading').remove();
			showScreen('start_screen');
			//showScreen('versus_finish');

			$('#handler').show();

	},200);

	socket = io.connect('89.69.14.248',{'force new connection':true});
	socket.on('achievement',function(data){achievement(data.id,true,false);});
	socket.on('register_successful',function(data){logIn(data,false,false);});
	socket.on('login_successful',function(data){logIn(data);if(typeof data.id!=='undefined'){saveSession(data.id);}});
	socket.on('form_error',function(data){
		if(data.type=='login_fail'){
			$('#login_pass_field,#login_nick_field').css('background','#FF6666');
			setTimeout(function(){$('#login_pass_field,#login_nick_field').css('background','');},500);
			$('#login_pass_field,#login_nick_field').val('');
		}
		else if(data.type=='register_fail'){
			console.log(data);
			if(typeof data.name !== 'undefined'){
				$('#register_nick_field').css('background','#FF6666');
				setTimeout(function(){$('#register_nick_field').css('background','');},500);
			}
			if(typeof data.mail !== 'undefined'){
				$('#register_mail_field').css('background','#FF6666');
				setTimeout(function(){$('#register_mail_field').css('background','');},500);
			
			}
			
		
		}
	});
	
	

	
	socket.on('login_fail',function(){$('#login_pass_field,#login_nick_field').css('background','#FF6666');setTimeout(function(){$('#login_pass_field,#login_nick_field').css('background','');},500);$('#login_pass_field,#login_nick_field').val('');});
	
	socket.on('Opponent',function(data){gameStart('versus');});
	socket.on('game-damage',function(data){versusHeart(-data.value);});
	socket.on('victory',function(){gameEnd();});
	
	$('#main_menu').on('click',function(){showScreen('start_screen');});
	$('#play_again').on('click',function(){	
		if(gameType=='versus'){
		socket.emit('multiplayer');
		showScreen('versus_search');
		}else{gameStart();}
		
		});
		$("#versus_resign").on('click',function(){$('#settings_icon').show();socket.emit('multiplayer_cancel');showScreen("start_screen");});
	
	$('#lead_href').click(function(){socket.emit('leaderboards');});
	socket.on('leaderboards',function(data){createLeaderboards(data);});
	
	if(typeof localStorage['id']!=='undefined'){restoreSession();}
	
	if(typeof localStorage['settings']!=='undefined'){
		settings = JSON.parse(localStorage.getItem('settings'));
		updateSliders();
	}
	
});



