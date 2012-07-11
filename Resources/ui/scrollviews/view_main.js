/**
 * @author Yoann GAUCHARD
 */


/*
 * global vars
 */

//Invoke geo services
var Geo = require('services/business_services/geo'); 
var _geo =  new Geo();

//Invoke Timer class
var Timer = require('services/utils_services/timer');
var _timer;

var scrolled = false;

/*
 * functions
 */
function displayTimerCallback(obj_timer) {
	lab_timer.text = obj_timer.h + ' : ' + obj_timer.m + ' : ' + obj_timer.s;
}

function displayAlertCallback() {

}


/*
 * UI elements
 */

var view_main = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: {
    	latitude : _geo.getArr_GPXpos()[0].latitude, 
    	longitude : _geo.getArr_GPXpos()[0].longitude,
        latitudeDelta : 0.1, 
        longitudeDelta : 0.1},
    animate : false,
    regionFit : false,
    userLocation : false
});

var view_top = Titanium.UI.createView({
	backgroundColor:'#000',
	height:100,
	width:'auto',
	top:-100
});

var btn_scroll = Ti.UI.createButton({
	height : 20,
	width : 20,
	title : 'o',
	bottom : 0,
	left : 130,
	color : "red"
});

var btn_start = Ti.UI.createButton({
	height : 44,
	width : 55,
	title : 'Start',
	bottom : 40,
	left : 40
});

var btn_pause = Ti.UI.createButton({
	height : 44,
	width : 55,
	title : 'Pause',
	bottom : 40,
	left : 40,
	visible : false
});

var btn_stop = Ti.UI.createButton({
	height : 44,
	width : 55,
	title : 'Stop',
	bottom : 40,
	right : 40
});

var lab_timer =  Ti.UI.createLabel({
	text:"00 : 00 : 00",
	height:40,
	width:200,
	top:0,
	right:0,
	color:'#fff',
	borderRadius:10,
	backgroundColor:'#000',
	font:{
		fontSize:30,
		fontWeight:'bold'
	},
	textAlign:'center'
});

var lab_distance =  Ti.UI.createLabel({
	text:"Distance 00 km",
	height:40,
	width:50,
	top:0,
	right:0,
	color:'#fff',
	borderRadius:10,
	backgroundColor:'#000',
	font:{
		fontSize:10,
		fontWeight:'bold'
	},
	textAlign:'center'
});

var lab_speed =  Ti.UI.createLabel({
	text:"Vitesse 00 km/h",
	height:40,
	width:50,
	bottom:0,
	left:0,
	color:'#fff',
	borderRadius:10,
	backgroundColor:'#000',
	font:{
		fontSize:10,
		fontWeight:'bold'
	},
	textAlign:'center'
});

var lab_calories =  Ti.UI.createLabel({
	text:"Calories 000",
	height:40,
	width:230,
	top:0,
	left:0,
	color:'#fff',
	borderRadius:10,
	backgroundColor:'#000',
	font:{
		fontSize:10,
		fontWeight:'bold'
	},
	textAlign:'center'
});

var lab_avgspeed =  Ti.UI.createLabel({
	text:"Vitesse moy. 00 km/h",
	height:40,
	width:230,
	top:0,
	left:0,
	color:'#fff',
	borderRadius:10,
	backgroundColor:'#000',
	font:{
		fontSize:10,
		fontWeight:'bold'
	},
	textAlign:'center'
});


/*
 * Event Listeners
 */

btn_start.addEventListener('click', function(){

	//Add top view
	view_main.add(view_top);

	//ScrollDown animation
	if(!scrolled) {
		var scrolldownAnimation = Ti.UI.createAnimation({
			top : 0,
			duration : 800
		});
		view_top.animate(scrolldownAnimation);
		scrolled = true;
	}	

	if(!_timer) _timer = new Timer();
	_timer.start(displayTimerCallback);
	btn_pause.setVisible(true);
	this.setVisible(false);

	//TEST
	tracking();

});


btn_pause.addEventListener('click', function(){

	_timer.pause(displayTimerCallback);

	btn_pause.setVisible(false);
	btn_start.setVisible(true);

});


btn_stop.addEventListener('click', function(){

	if(_timer) {
		_timer.stop(displayTimerCallback);
		_timer = null;
	}

	//ScrollUp animation
	if(scrolled) {
		var scrollUpAnimation = Ti.UI.createAnimation({
			top : -100,
			duration : 800 
		});

		view_top.animate(scrollUpAnimation);
		scrolled = false;
	}

	if(btn_pause.getVisible) {
		btn_pause.setVisible(false);
		btn_start.setVisible(true);
	}

});

btn_scroll.addEventListener('click', function(){

	if(!scrolled) {
		//ScrollDown animation
		var scrolldownAnimation = Ti.UI.createAnimation({
			top : 0,
			duration : 800
		});
		view_top.animate(scrolldownAnimation);
		scrolled = true;	
	} else {
		//ScrollUp animation
		var scrollUpAnimation = Ti.UI.createAnimation({
			top : -80,
			duration : 800 
		});

		view_top.animate(scrollUpAnimation);
		scrolled = false;
	}
});	

Ti.App.addEventListener('evtLocationUpdate', function(obj_coords){

	var tab_anno = view_main.getAnnotations();

	Ti.API.info('Annotations de la map : \n'+tab_anno);
	tab_anno[0].latitude = obj_coords.latitude;
	tab_anno[0].longitude = obj_coords.longitude;
	view_main.setAnnotations(tab_anno);

	var anno_new = Ti.Map.createAnnotation({
		titleid : _geo.getAnno_current().getTitleid() + 1,
		animate : true,
		pincolor : Titanium.Map.ANNOTATION_GREEN,
		title : 'Vous êtes ici !',
		latitude : 	obj_coords.latitude,
		longitude : obj_coords.longitude
	});

	_geo.setAnno_current(anno_new);

	view_main.addAnnotation(_geo.getAnno_current());
});



view_top.addEventListener('swipe', function(e){

	Ti.API.info('Ca marche');

});


/*
 * UI element adds	
 */

view_top.add(lab_timer);
view_top.add(btn_scroll);
view_main.add(btn_start);
view_main.add(btn_pause);
view_main.add(btn_stop);
view_main.addAnnotation(_geo.getAnno_current());



/*
 * Functions calls
 */

//svc_geo.monitorGPSPosition();

function tracking(){

	var i = 1;
	var anno;
	var prec_anno;
	var timerAnno = setInterval( function() {

		if(i < 35) {
			anno = Ti.Map.createAnnotation({
				animate : true,
				pincolor : Titanium.Map.ANNOTATION_GREEN,
				title : lab_timer.text,
				latitude : 	_geo.getArr_GPXpos()[i].latitude,
				longitude : _geo.getArr_GPXpos()[i].longitude
			});

			if(!prec_anno) {
				prec_anno = _geo.getAnno_current();
			} else {
				prec_anno.setPincolor(Titanium.Map.ANNOTATION_RED);
			}

			view_main.addRoute({
				name : 'myRoute',
				width : 4,
				color : '#f00',	
				points : [
					{latitude : prec_anno.latitude, longitude : prec_anno.longitude},
					{latitude : _geo.getArr_GPXpos()[i].latitude, longitude : _geo.getArr_GPXpos()[i].longitude},
				]
			});

			view_main.addAnnotation(anno);
			prec_anno = anno;
			i++;	
		} else {
			clearInterval(timerAnno);
			timerAnno = null;	
		}
	}, 3000);

}
