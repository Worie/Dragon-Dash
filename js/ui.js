
function updateSliders(){
	setSlider('sounds bonus',settings.sounds.bonus);
	setSlider('sounds buttons',settings.sounds.buttons);
	setSlider('sounds tiles',settings.sounds.tiles);
	setSlider('sounds shuffle',settings.sounds.shuffle);
	setSlider('auto_clicker',settings.auto_clicker);
	setSlider('animations',settings.animations);

	$('.difficultyRadio').each(function(){
		if($(this).parent().data('val')==settings.difficulty){$(this).click();}
	});

}

function achievement(id,show,emit,interval){
	if(typeof show ==='undefined'){show = true;}
	if(typeof emit ==='undefined'){emit = true;}
	if(typeof interval ==='undefined'){interval = 3000;}
	
	$('#achievements .achIco').eq(id).attr('src','imgs/achievements/'+parseInt(id)+'.png');

	if(show==true){
		// add if sounds
		playSound('bonus','achievement');
		monit($('.achievement').eq(id).html());	
		$('.achievementBar').click(function(){
			if(gameInProgress==true){pauseGame();}
			
			showScreen('achievements');

			$('#achievements').children('.informations').children('.scrollable').eq(0).scrollTop(id*size);
			
			$('.achievement').next().hide().eq(id).click();
		});

		if(logged==true && emit==true){
			socket.emit('achievement',{achievement:id});
		}
	}
	
	achievements[id]=id;
}

function saveAchievements(){}
function loadAchievements(){
	for(var i in achievements) {
		achievement(achievements[i],false);
	}
}
function setSlider(slider,val){
	var tmp = $('.slider[data-val="'+slider+'"]');
	//console.log(tmp+'\n'+slider+':'+val)
	
	if(val=='on' || val==true){
		tmp.addClass('on');
	}else{
		tmp.removeClass('on');
	}
}


function buttonSlide(el){
	playSound('buttons','tick');
	var e = $(el);
	if(e.parent().attr('class').indexOf('disabled')!=-1){return false;}
	if(e.css('left')=='0px'){
		var tmp = e.css('width');
		e.transition({left: tmp,rotate: '360deg' },100);
		e.parent().css('background','green');
		e.toggleClass('on');
	}else{
		e.transition({left: '0px',rotate: '0deg' },100);
		e.parent().css('background','black');


	}

}



function setDifficulty(val){
	playSound('buttons','tick');
	settings.difficulty = val;
	
	switch(val){
	case 1: {
		while(colors.length!=3){
			available_colors[available_colors.length]=colors[colors.length-1];
			var index = colors.length-1;
			// remove from array specific index
			if (index > -1) {
				colors.splice(index, 1);
			}
		
		}
	
	
	} break;
	case 2: {
	while(colors.length!=4){
		
			if(colors.length>4){
			
				available_colors[available_colors.length]=colors[colors.length-1];
				var index = colors.length-1;
				// remove from array specific index
				if (index > -1) {
					colors.splice(index, 1);
				}
			
			
			
			}else{
	
				colors[colors.length] = available_colors[available_colors.length-1]
				var index = available_colors.length-1;
				// remove from array specific index
				if (index > -1) {
					available_colors.splice(index, 1);
				}
			}
		
	}
	
	
	} break;
	case 3: {
	while(colors.length!=5){
			colors[colors.length] = available_colors[available_colors.length-1]
			var index = available_colors.length-1;
			// remove from array specific index
			if (index > -1) {
				available_colors.splice(index, 1);
			}
		
	}
	
	
	} break;
	}

}

function saveSession(id){
	if(supports_html5_storage()){
	localStorage['id']=id;
	localStorage['settings']=settings;
	
	}else{return false;}

	 
}

function restoreSession(){
	if(supports_html5_storage()){
	
	socket.emit('restoreSession',{id:localStorage['id']});
	// unbind restoresession client side
	}else{return false;}

}

function logIn(data,show,ach){
	if(logged==true){return false;}
	if(typeof show==='undefined'){show=true;}
	if(typeof ach==='undefined'){ach=true;}

	if(ach==true){
		achievements = data.achievements;
		loadAchievements();
	}
	
	logged=true;
	
	$('#logout').show();
	
	if(show==true){
		$('.achievementBar').click(function(){$(this).slideUp('fast');});
		monit('Welcome '+data.name);
	}
	
	$('#login').hide(); 		// Hide the start_screen Sign In button
	$('#score_monit').hide();	// Hide the monit "Login to save your score" in Singleplayer

	showScreen('start_screen');	// Show the start_screen
}

function logOut(){

	localStorage.removeItem('id');
	localStorage.removeItem('settings');
	location.reload();
/*logged=false;
$('#login').show(); 		// Hide the start_screen Sign In button
$('#score_monit').show();	// Hide the monit "Login to save your score" in Singleplayer
showScreen('start_screen');	// Show the start_screen*/
}




function monit(text,interval){
	if(typeof interval ==='undefined'){interval = 3000;}

	var tmp = $('.achievementBar');
	tmp.html(text);
	tmp.slideDown('slow');
	setTimeout(function(){tmp.slideUp('slow');$('.achievementBar').off();},interval);
}

function createLeaderboards(data){

	var str = "";

	for(var i = 0,j =1;i<data.length;i++,j++){

		str += "<div class = 'leader'>";
		str += "<div style='float:left;display:inline-block;width:10%;'>#"+j+"</div> ";
		str += "<div style='float:left;display:inline-block;width:40%;text-align:right;'>"+data[i].score+"</div>";
		str += "<div style='float:left;display:inline-block;margin-left:10%;width:30%;text-align:left;'><img class='avatar' src='imgs/achievements/"+data[i].avatar+".png' /> "+data[i].name+'</div>';
		str += "</div>";
		str += "<div class='details'>";
		str += "CPS: "+data[i].cps+"  ACC: "+data[i].acc+" Max Combo: "+data[i].combo;
		str += "</div>";

	}

	$('#lead').children('.scrollable').html(str);


	 //change the below to class of leaderboard
	 $('.leader').click(function(){$(this).next().slideToggle("fast");});
	 $('.details').click(function(){$(this).slideToggle("fast");});
}



function saveSettings(){
	if(supports_html5_storage()){
	localStorage.setItem('settings', JSON.stringify(settings));
	
	//localStorage['settings']=settings;
	}
}
function saveScore(data){
	socket.emit('saveScore',data);
}

function showScreen(element,mode,time){
	if(element=='previous'){showScreen(temporary_screen);return true;}
	$('.screen').each(function(){
		$(this).hide();
	});

	$('#small_goku').hide();

	if(element=='game_pause'){$('#game_window').show();}

	if(element!='game_window' && element!='game_finish'){$('#small_goku').show();}
	$('#'+element).show();
	//if(element=='achievements'){}


	if(element!=='settings' && element !== 'achievements') temporary_screen = element;

	/*


if(!mode){
	mode='hide';
}

if(!time){
	time=400;
}

switch(mode){
	case 'hide' : 
		$('.screen').each(function(){
			$(this).hide(time);
		});
	break;

	case 'fade' : 
		$('.screen').each(function(){
			$(this).fadeOut(time);
		});
	break;

	case 'slide' : 
		$('.screen').each(function(){
			$(this).slideDown(time);
		});
	break;
}


$('#small_goku').hide();


if(element!='game_window' && element!='game_finish'){$('#small_goku').show();}
$('#'+element).show();
*/

}

















function gameButtonAction(v){
	switch(v){
	case 'characters': renderCharacters();showScreen("screen-characters");break;//
	case 'play': showScreen('screen-gamemode'); break;
	case '1pGame' : gameType='normal'; gameButtonAction('characters'); break;
	case 'start': if(gameType=='normal'){
		gameStart(gameType);}else{socket.emit('multiplayer');
		showScreen("versus_search"); 
		$('#settings_icon').hide();} break;
	case '2pGame' : gameType='versus';gameButtonAction('characters'); break;
	case 'menu' : showScreen('start_screen');break;
	}
		
			
}

function renderCharacters(){

	var list = "";
	for(var i=0,l=characters.length;i<l;i++){
		list+=addCharacter(characters[i]);
		
	}
	
	$('#screen-characters > div:nth-child(2)').html(list);
	
	$('#screen-characters > div:nth-child(2) > div.character').click(function(){
		pickCharacter($(this).attr('data-character'));
		
	});
	
	$('#screen-characters > div:nth-child(2) > div.character').each(function(){
		$(this).css('background-image','url("imgs/characters/'+$(this).attr('data-character')+'.png")');
	});
	pickCharacter(settings.character);
}

function addCharacter(c){
	return "<div class='character' data-character='"+c+"'></div>";
	
}

function pickCharacter(c){
	
//	select
	var l =	$('#screen-characters > div:nth-child(2) > div.character');
	l.removeClass('picked');
	$('#screen-characters > div:nth-child(2) > [data-character="'+c+'"]').addClass('picked');
	var b=$("#screen-characters > div:first-child > div");
	b.eq(0).html('<img src="imgs/characters/'+c+'.png"/>'+c);
	playerCharacter = c; // unnessesary  ?
	b.eq(1).html('Description here for '+c);
	settings.character = c;
}


function playSound(m,v){
	var p = false;
	if(Oldies==true){return true;}
	var t = settings.sounds;
	
	if(m.indexOf('bonus')>-1){
		if(t.bonus==true){
			p=true;
		}
	}
	else if(m.indexOf('tile')>-1){
		if(t.tiles==true){
			p=true;
		}
	}
	else if(m.indexOf('buttons')>-1){
		if(t.buttons==true){
			p=true;
		}
	}
	else if(m.indexOf('shuffle')>-1){
		if(t.shuffle==true){
			p=true; //Consider replacing with something like actions and add achievements 
		}
	}
	if(p==true){lowLag.play(v);}
}


function withSound(){
	lowLag.init({'urlPrefix':'audio/'});
	lowLag.load(['boom.mp3'],'boom');
	lowLag.load(['tick.mp3'],'tick');
	lowLag.load(['back.mp3'],'back');
	lowLag.load(['crunch.mp3'],'crunch');
	lowLag.load(['refresh.mp3'],'refresh');
	lowLag.load(['achievement.mp3'],'achievement');
	//initialize sound 
	background_audio = document.createElement("audio");
	background_audio.loop = true;
	background_audio.src = "audio/back.mp3";
	


	$('#music_control').on('click',function(){audioControl(background_audio); return false;});
	
}
function withoutSound(){
	$(".slider[data-val*='sounds']").addClass('disabled').removeClass('on');
	var s=settings.sounds;
	$('#music_control').remove();
	// settings off
	// block the sound sliders 
	
}