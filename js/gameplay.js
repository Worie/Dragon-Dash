function boardFall(){
	for(var i=0;i<7;i++){
		setAnimation(i);
	}
}
function killCombo(){
combo=0;
ssj=false;
showScore();
$('#handler,#ki_left').removeClass('saiyajin');
}
function clearIntervals(){
	for (var key in intervals) {
		clearInterval(intervals[key]);
	}	
}
function startIntervals(){
	if(gameType!='versus'){
		intervals['ki_ereaser'] = setInterval(function(){ki_meter();},200);
	}
	//intervals['tile_swap'] 	= setInterval(function(){tileChange();},3000);
	intervals['combo_killer']	= setInterval(function(){killCombo();},1000);
	
	if(settings.auto_clicker===true){intervals['clicker']	= setInterval(function(){checkIfCorrect($('.tile').random()[0]);},150);}

}

function pauseGame(){
	$('#refresh_tiles').hide();
	var t= tiles;
	$('#pause_btn').hide();
	showScreen('game_pause');
	game_paused=true;
	clearIntervals();
	t.each(function(){
		$(this).off("click");
	});
	
}



function resumeGame(){
	$('#refresh_tiles').show();
	var t=tiles;
	$('#pause_btn').show();
	showScreen('game_window');
	//t.each(function(){
	//	$(this).on('click',function(e) { checkIfCorrect(this);})
	//});
	startIntervals();
	game_paused=false;
	
}
function showScore(){
	info.html('Score '+score);//+score
}



function checkTypeOfHit(e){
	
		var length = special.length;
		var result = false;

		for(var i=0;i<length;i++){
			if(e.className.indexOf(special[i])>-1){
				return special[i];
					break;
				}
		}
		
		return 'normal';



	}
	
	function comboExtend(){
		
		clearInterval(intervals['combo_killer']);
		intervals['combo_killer'] = setInterval(function(){killCombo();},1000+(getRandomInt(0,5)*100));
		}
//http://jsfiddle.net/tnrwsg1m/5/
function checkIfCorrect(e){
	//var a = performance.now();
	

	if(animation_done==false){
	
		$('.tile').each(function(){
			
			$(this)
			.velocity('stop',true)
			.velocity('stop',true)
			.stop(true,false)
			.stop(true,false)
			.clearQueue()
			.css('top',$(this).attr('fall'))
			.removeAttr('fall');
				
		});
	
	playSound('tiles','tick');

	}
	
	var mode=checkTypeOfHit(e);
	var t = tiles;
	
	t.attr('affected',0);


	var hitsInCol = [];
	var hit = [];
	
	var properHit = false;

	if(mode=='normal'){	
		var clickY = parseInt($('#game_window').offset().top)+parseInt(e.style.top)+size/2;
		var clickX = parseInt($('#game_window').offset().left)+parseInt(e.style.left)+size/2;


		



		lookForMatch(clickX,clickY);
		
		hit=$('.tile[affected=1]');
		if(bonus_scored=='bomb'){
			
		comboExtend();
		
		var yui = e.className.replace('tile','');
		yui = yui.replace(' ','');
		
		var randomIndex=getRandomInt(0,available_colors.length-1);

		var specialIndex=colors.indexOf(yui);
		colors[specialIndex]=available_colors[randomIndex];
		available_colors[randomIndex]=yui;
				
		var clnme=e.className;
		$(document.getElementsByClassName(clnme)).attr('affected','1').attr('src','imgs/none.png');
		
		//$('.tile[affected=1]').HideTile();
		hit=$('.tile[affected=1]');
		}
		
			bonus_scored = false;
			
		var length = hit.length;
		if(length>2){
		
		if(ssj===true){
			$('#handler').shake();
			playSound('bonus','boom');
		}
		success_hits++;
		
		comboExtend();
		if(combo>highest_combo){highest_combo=combo;}
		combo++;
		
		
		
		if(combo%20==0 ){$(".tile:not('.sensu')").random().attr('src','http://www.mricons.com/store/png/653_1232_128_bomb_explosive_icon.png');}
		
		if(combo==20){
		ssj = true;
		$('#handler,#ki_left').toggleClass('saiyajin');
		}

		
		if(combo>2){info.html(combo+' Combo!');}else{info.html('Score '+score);}

		// Count the ammount of hit tiles in Column
		
			for(var x=0;x<length;x++){
				var tmpIndex = hit[x].style.left;
				if(typeof (hitsInCol[tmpIndex])==='undefined'){
					hitsInCol[tmpIndex]=0;
				}
				
				hitsInCol[tmpIndex]++;
			
				if(hitsInCol[tmpIndex]==8 && typeof achievements[7]=== 'undefined'){achievement(7,true,false);}

			}
		
		// End of the for that counts ammount of hit tiles in Column
		
		if(Object.keys(hitsInCol).length==7 && typeof achievements[6]=== 'undefined'){achievement(6,true,false);}
		
		// It is setAnimation() for all rows ... 
		if(settings.animations==true){
		boardFall();
		
		animation_done=false;

	
		var wait = 30;
		var clickedTiles = $('.tile[affected=1]');
		if(ssj==false){
		clickedTiles.each(function(){
		this.style.top=-size+'px';
		
		}).hide();
		}else{
		wait = 30;
		clickedTiles.Randomize('white');
		}

		
		if(settings.animations!==true){wait=0;}

		clickedTiles.delay(wait).show();
		var delay = $.extend( {}, hitsInCol );
		
		//var beginPerformance = performance.now();
		
		var affected = $(".tile[affected!=0]");
		
		affected.each(function(){
			if($(this).attr('affected')=='1'){
				
				var left = this.style.left;
				
				//delay this with wait
				$(this).delay(wait).queue(function(){
				$(this).Up();
			if(sensu_time>20){
				$(this).Randomize('sensu');
				sensu_time=0;
				}else{
				$(this).Randomize();
				}
				$(this).dequeue();
				});
			
				var distance = ((hitsInCol[left]-1)*size)+(size/2)+'px';
				$(this).attr('fall',distance);
				var d = delay[left]-hitsInCol[left];
				
				var Delay = (wait+(d*100)),Duration = 100;
				if(settings.animations!==true){Duration=0;Delay=0;}
				// delay this with (wait+(d*100))
				$(this).velocity({
				top: distance
				},{duration: Duration,delay: Delay}).promise().done(function(){	

				playSound('tiles','tick');
				});
				
				hitsInCol[left]--;
				return true;
			}else {
				var distance = $(this).attr('fall');
			}
		
		
				var Delay = (wait+(d*100)),Duration = 100;
				if(settings.animations!==true){Duration=0;Delay=0;}
			//delay this with wait
			$(this).velocity({
				top: distance
			},{duration: 100,delay:wait});
		
		}).promise().done(function(){
		// triggered once animation is finished
		animation_done=true;
		//t.css('transition','');
		//t.css('-webkit-transition','');
		//t.removeAttr('fall');
		
		playSound('tiles','tick');
		});
		
		}else{
			for(var i=0;i<7;i++){
				noAnimation(i);
			}
			var offL = $('#game_window').offset().left;
			var offT = $('#game_window').offset().top;
			for (var key in hitsInCol) {
				
				for(var hitsin=hitsInCol[key];hitsin>=0;){
					var tmp=$(document.elementFromPoint(parseInt(key)+offL,(hitsin*size)+size+offT));
					tmp.Randomize();
					hitsin--;
				 }
			}

		}
		
		//var endPerformance = performance.now();
		
	//	alert(endPerformance-beginPerformance);

		var points = parseInt(((hit.length/2)+hit.length)*hit.length)*difficulty;
		
		if(combo>15){points*=parseInt(((combo/10))*hit.length/2);
		//$('body').css('background-image',"url('http://pjnicholson.com/psp/FireAnimation.gif')");
		
		}
		
		properHit=points;
		score+=points;
			
		
		}else{
		missed_hits++;
			$(hit).each(function(){
			if(this.className.indexOf('bw')==-1){

			$(this).Mono();}});
			setTimeout(function(){
			$('.tile').each(function(){$(this).Color();});
			},200);
			
			killCombo();
		
			}
		
		

	}else{
	if(mode=='sensu'){

		time+=getRandomInt(3,10);
		playSound('bonus','crunch');
		$(e).attr('affected',1);
		setAnimation(parseInt(e.style.left)/size);
		
	
		$(e).Up().velocity({
			top: size/2+"px"
			}
		,100);
		$(e).Randomize();
		
		$(".tile[affected=2]").each(function(){
				var distance = $(this).attr('fall');
			
	
		
	
	$(this).velocity({
		top: distance
	},100);
	
	});

	$('#ki_info').html('Senzu!');
	}else if(mode=='ha'){
	/*
	$(e).attr('affected','1');
	var offsetTop = $('#game_window').offset().top;
	var offsetLeft = $('#game_window').offset().left;
	
	var clickY = parseInt(offsetTop)+parseInt(e.style.top)+size/2;
	var clickX = parseInt(offsetLeft).offset().left)+parseInt(e.style.left)+size/2;

	var top = parseInt(e.style.top);
	var left = parseInt(e.style.left);
	
	var a = clickX;
	
	while(a>offsetLeft){
	
	var elem = $(document.elementFromPoint(a+offsetLeft,offsetTop+top+size/2));
		setAnimation(elem);
		elem.style.top = -size+'px';
	a-=size;
	*/
	}
	
}
		
	
	if(gameType=='versus' && properHit!=false){socket.emit('correct',{value : properHit});versusHeart(properHit);}
	hit.length = 0;
	hitsInCol.length = 0;
	ex= "";
	//		$(".tile").attr('affected',0);
//
	//var b = performance.now();
	//alert(b-a);
}

function versusHeart(value){
	time+=value;
	
	var percent = (time/total_time)*100;
	ki_bar.css('width',percent+"%");

	if(time<=0){gameEnd();}
	}


function setAnimation(start){
	var offsetTop = $('#game_window').offset().top;
	var offsetLeft = $('#game_window').offset().left;
	var top = 8*size+size/2;
	var left = start*size;
	/*
	var top = parseInt(start.style.top);
	var left = parseInt(start.style.left);
	
	*/
	var distance = 0;
	//var distance= size;
	var maxTop = parseInt($('#game_window').offset().top);
	
	var y = top+offsetTop;
	while(y>maxTop+size/2){
		
		var elem = $(document.elementFromPoint(offsetLeft+left+size/2,y-size/2));

			if(elem.attr('affected')=='0'){
					
					elem.attr('affected',2);
					elem.attr('fall',parseInt(elem.css('top'))+distance+'px');
				}else{
					distance+=size;
				}	
		y-=size;
	}
}


function noAnimation(start){
	var offsetTop = $('#game_window').offset().top;
	var offsetLeft = $('#game_window').offset().left;
	var top = 8*size+size/2;
	var left = start*size;
	/*
	var top = parseInt(start.style.top);
	var left = parseInt(start.style.left);
	
	*/
	var distance = 0;
	//var distance= size;
	var maxTop = parseInt($('#game_window').offset().top);
	
	var y = top+offsetTop;
	while(y>maxTop+size/2){
		
		var elem = $(document.elementFromPoint(offsetLeft+left+size/2,y-size/2));

			if(elem.attr('affected')=='0'){
					
//					console.log(offsetLeft+left+size/2+':'+parseInt(y-(size/2)+distance));
					var tmp = $(document.elementFromPoint(offsetLeft+left+size/2,y-(size/2)+distance));
					tmp.attr('src',elem.attr('src'));
					tmp.attr('class',elem.attr('class'));
					//$(document.elementFromPoint(offsetLeft+left+size/2,y-(size/2)+distance)).attr('src',elem.attr('src'));
					
				}else{
					distance+=size;
				}	
		y-=size;
	}
}



var f_draw = function draw(){

	for(var i=0;i<X;i++){
		for(var j=Y-1;j>=0;j--){
		box = document.createElement("img");
		box.className = 'tile';
		box.style.left = i*size+'px';
		if(settings.animations===true){
		box.style.top = -size+'px';
		$(box).data('place',j);}
		else{
		box.style.top = j*size+size/2+'px'; // jesli chcesz zrobic zeby spadaly z gory to pamietaj ze to musi byc wielokrotnosc 40
		}
		
		$(box).Randomize();
		box.src='imgs/none.png';
		$('#game_window').append(box);
		$(box).attr('affected',0);
		//all[all.length]=box;
				

		}
	}
	if(settings.animations===true){
		playSound('tiles','refresh');
	$('.tile').each(function(){
	var tmp = parseInt($(this).data('place'));
	var to=tmp*size+(size/2)+'px';
	var tmp2= parseInt($(this).css('left'))/size;
	// delay(((8-tmp)*70+(tmp2*70)))
	$(this).velocity({
	top: to
	},{duration: 70,delay:(((8-tmp)*70+(tmp2*70)))}).promise().done(function(){});
	});
	$('.tile').removeAttr('place');
	}
	$('img').on('dragstart', function(e) {  e.preventDefault(); 
	/*var x = parseInt(this.style.top)+parseInt($('#game_window').offset().top);
	var y = parseInt(this.style.left)+parseInt($('#game_window').offset().left);
	checkIfCorrect(x,y);
	*/
	
	});
//	$('.tile').css('width',size+'px')
//	$('.tile').css('height',size+'px')
}




function lookForMatch(x,y){

//setInterval(function(){ //zdecydowanie do wywalenia

	var elem = document.elementFromPoint(x, y);
	if(elem.src.indexOf('imgs/none.png')==-1){bonus_scored='bomb';}
	//if(typeof h ==='undefined'){var h=[];}
//		h[h.length]=elem;
	
	ex+= '('+x+'/'+y+')';
	
	
	// nl instead n.l , var from = document.elementFromPoint() ? 

	var n =[];
	n[n.length]=document.elementFromPoint(x+size, y);
	n[n.length]=document.elementFromPoint(x-size, y);
	n[n.length]=document.elementFromPoint(x, y+size);
	n[n.length]=document.elementFromPoint(x, y-size);

	var e= [];
	e[e.length]='('+parseInt(x+size)+'/'+y+')';
	e[e.length]='('+parseInt(x-size)+'/'+y+')';
	e[e.length]='('+x+'/'+parseInt(y+size)+')';
	e[e.length]='('+x+'/'+parseInt(y-size)+')';

	var p = [];
	p[p.length]=[x+size,y];
	p[p.length]=[x-size,y];
	p[p.length]=[x,y+size];
	p[p.length]=[x,y-size];
	
	
	
	$(elem).attr('affected',1);
	for(var i=0;i<n.length;i++){

		if(!n[i] || n[i].nodeName != 'IMG' || ex.indexOf(e[i])>-1 || n[i].className!=elem.className){	
			
			// SHIT do wywalenia, tylko do prezentacji
			//if(ex.indexOf(e[i])>-1){continue;}else if(n[i]){
			//n[i].src='imgs/white.png';}
			// koniec shit do wywalenia
			if( n[i] && n[i].className!=elem.className && ssj==true){if(getRandomInt(1,10)==10){$(n[i]).attr('affected',1);}}
			continue;
		}
		lookForMatch(p[i][0],p[i][1]);
		
		}
	//elem.src = 'http://upload.wikimedia.org/wikipedia/en/e/e4/Green_tick.png'; // do wywalenia

//},2000); // zdecydowanie do wywalenia
		
}


function ki_meter(){
	
	sensu_time+=0.2;
	
	time-=0.2;
	var percent = (time/total_time)*100;
	ki_bar.css('width',percent+"%");

	if(time<=0){gameEnd();}
}



function gameStart(type){
	if(typeof type ==='undefined'){gameType='normal';}else{gameType=type;}
	
	$('.difficultyRadio').addClass('disabled');
	
	gameInProgress = true;
	game_paused=false;
	animation_done=true;
	combo = 0;
	score = 0;
	
	$('#logout').hide();
	
	$('#settings_icon').hide();
	difficulty = settings.difficulty;
	begin_time = new Date().getTime(); 
	
	total_hits = 0;
	success_hits = 0;
	missed_hits = 0;
	highest_combo = 0;
	total_time = 60;
	if(gameType=='versus'){total_time=5000;difficulty = 2;}
	
	setDifficulty(difficulty);
	
	ki_bar.css('width',"100%");
	
	sensu_time = 0;
	time = total_time;

	
	//alert(colors.length+':'+available_colors.length);
	
	//alert(size);
	
	

	f_draw();
	
	tiles = $('.tile');		
	
	
	$('#ki_bar').show();
	
	showScreen('game_window');
	
	info.html('Ready');
	

	
	blank_screen = document.createElement('div');
	//blank_screen.style.background='black';
	//blank_screen.style.opacity='0.7';
	//blank_screen.style.color='black';
	blank_screen.style.position='absolute';
	blank_screen.style.width='100%';
	blank_screen.style.height=size*Y+'px';
	blank_screen.style.top=size/2+'px';
	blank_screen.style.paddingTop=($('#game_window').height()-(1.5*size))/2+'px';
	blank_screen.style.fontSize=size+'px';
	blank_screen.innerHTML= 'Ready?';
	$('#container').append(blank_screen);
	
	var t = tiles;
	
	var mode ='';
	if(!jQuery.browser.mobile){mode+='mousedown';}else{mode+='touchstart click';}
	
	
	setTimeout(function(){
					
		t.each(function(){
			//$(this).on('touchstart',function(){$(this).click();});
			$(this).swipe( {
								  swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
								  	//alert("You swiped " + direction + " with " + fingerCount + " fingers");
									if(combo>10){
																			
									}
								  },
								  threshold:size/2,
								  fingers:'all'
								});
	
			$(this).on(mode,function() {checkIfCorrect(this);return false;/*$('.freezer').attr('affected','1');boardFall();*/}); //click
		
		});
		
		$(blank_screen).html('SET');
		info.html('SET');
		
		setTimeout(function(){
			
				$(blank_screen).html('GO!');
				info.html('GO!');

			setTimeout(function(){
				$(blank_screen).remove();
				$('#small_goku').hide();
				$('#pause_btn').show();
				$('#refresh_tiles').show();

				startIntervals();
			
			},400);
		
		},400);
	},400);
	
	
	

	
	
	
	game_paused=false;
	//audioControl(background_audio);
	
}




function gameEnd(arg){

	
	$('.difficultyRadio').removeClass('disabled');
	killCombo();
	if(typeof arg==='undefined'){arg=='casual';}
	var t = tiles;
	clearIntervals();
	info.html("Time's up!");

	if(logged)$('#logout').show();
	
	$('#settings_icon').show();
	
	$('#refresh_tiles').hide();
	game_paused=true;
	$('#pause_btn').hide();
	t.off('click');
	t.off('mousedown');
	t.Mono();

	
	finish_time = new Date().getTime(); 

	var play_time = finish_time-begin_time;
	play_time/=1000;
	
	
	var total_hits = missed_hits+success_hits;
	
	var cps=total_hits/play_time;
	cps=Math.round(cps*1000)/1000;
	intervals = [];
	if(total_hits==0){total_hits=1;}
	//$('#game_window').fadeOut(1000);
	
	if(gameType=='versus'){
		//socket.disconnect();
		if(time<=0 || arg=='giveup'){
		$('#game_window').slideUp();t.remove();
		socket.emit('lost');
		showScreen('game_finish');
		$('#match_result').html('You lost!');
		}else{
		$('#game_window').slideUp();t.remove();
		$('#match_result').html('You won!');
		}
		showScreen('game_finish');
		
		}else{
		
	if(arg!=='giveup'){
	$('#match_result').html('');
	setTimeout(function(){$('#game_window').slideUp();t.remove();
	showScreen('game_finish');
	},1200);
	}else{t.remove();showScreen('start_screen');}
}

	var acc = parseInt(success_hits/total_hits*100);
	$('#match_result').append('<br/>Your score: '+score+'<br/>Highest combo: '+highest_combo+'<br/>Clicks per second:'+cps+'<br/>Accuracy: '+acc+'%');



	if(logged && arg!=='giveup' && gameType=='normal'){
	var data = {};
	data.score = score;
	data.combo = highest_combo;
	data.cps = cps;
	data.acc = acc;
	saveScore(data);
	}


	gameInProgress = false;
	if(typeof achievements[1]=== 'undefined' && gameType!=='versus' && arg!='giveup'){achievement(1);}
		clearIntervals(); // additional, perhaps its useless

}



function useSkill(d){
	var s=skills[playerCharacter][d]; // consider how to
	switch(s){
	default:break;
		
	}
}
