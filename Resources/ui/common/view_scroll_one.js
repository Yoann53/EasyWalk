/**
 * @author Yoann GAUCHARD
 */


/*
 * global vars
 */

//Invoke geo services
var isAndroid = (Ti.Platform.osname == 'android') ? true : false;

var Geo = (isAndroid) ? require('../../services/business_services/geo') : require('services/business_services/geo'); 
var _geo =  new Geo();

//Invoke Timer class
var Timer = (isAndroid) ? require('../../services/utils_services/timer') : require('services/utils_services/timer');
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

var view_scroll_one = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: {
    	latitude : 48.06159, 
    	longitude : -0.81114,
        latitudeDelta : 0.1, 
        longitudeDelta : 0.1},
    animate : false,
    regionFit : false,
    userLocation : false
});

var view_top = Titanium.UI.createView({
	backgroundImage: '../../images/topView.png',
	height:100,
	width:'auto',
	top:-100
});

var btn_scroll = Ti.UI.createButton({
	height : 10,
	width : 10,
	title : 'o',
	bottom : 0,
	left : 158,
	color : "green"
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
	width:180,
	top:20,
	left:18,
	color:'#fff',
	//borderRadius:10,
	backgroundColor:'transparent',
	font:{
		fontSize:30,
		fontWeight:'bold'
	},
	textAlign:'center'
});

var lab_distance =  Ti.UI.createLabel({
	text:"00 km parcourus",
	height:40,
	width:200,
	bottom:14,
	left:10,
	color:'#fff',
	borderRadius:10,
	backgroundColor:'transparent',
	font:{
		fontSize:15,
		fontWeight:'bold'
	},
	textAlign:'center'
});

var lab_speed =  Ti.UI.createLabel({
	text:"00 km/h",
	height:40,
	width:100,
	left:0,
	color:'#fff',
	borderRadius:10,
	backgroundColor:'transparent',
	font:{
		fontSize:15,
		fontWeight:'bold'
	},
	textAlign:'center'
});

var lab_avgspeed =  Ti.UI.createLabel({
	text:"00 km/h",
	height:40,
	width:100,
	top:8,
	right:16,
	color:'#fff',
	borderRadius:10,
	backgroundColor:'transparent',
	font:{
		fontSize:15,
		fontWeight:'bold'
	},
	textAlign:'center'
});


var lab_calories =  Ti.UI.createLabel({
	text:"00 cal.",
	height:40,
	width:100,
	bottom:11,
	right:15,
	color:'#fff',
	borderRadius:10,
	backgroundColor:'transparent',
	font:{
		fontSize:15,
		fontWeight:'bold'
	},
	textAlign:'center'
});

_geo.monitorGPSPosition();

/*
 * Event Listeners
 */

btn_start.addEventListener('click', function(){

	//Add top view
	view_scroll_one.add(view_top);

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
	//tracking();

});


btn_pause.addEventListener('click', function(){

	_timer.pause(displayTimerCallback);

	this.setVisible(false);
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
			top : -90,
			duration : 800 
		});

		view_top.animate(scrollUpAnimation);
		scrolled = false;
	}
});	

Ti.App.addEventListener('evtLocationUpdate', function(obj_coords){

	//Ti.API.info('Annotations de la map : \n'+tab_anno);
	Ti.API.warn(obj_coords);
	Ti.API.warn('latitude: '+obj_coords.latitude);
	Ti.API.warn('longitude: '+obj_coords.longitude);

	var anno_new = Ti.Map.createAnnotation({
		titleid : _geo.getAnno_current().getTitleid() + 1,
		animate : true,
		pincolor : Titanium.Map.ANNOTATION_RED,
		title : 'Vous êtes ici !',
		latitude : 	obj_coords.latitude,
		longitude : obj_coords.longitude
	});

	_geo.setAnno_current(anno_new);

	view_scroll_one.addAnnotation(_geo.getAnno_current());
	
});



view_top.addEventListener('swipe', function(e){
	
	Ti.API.info('Ca marche');
	
});


/*
 * UI element adds	
 */

view_top.add(lab_timer);
view_top.add(lab_distance);
view_top.add(lab_avgspeed);
view_top.add(lab_calories);
view_top.add(btn_scroll);
view_scroll_one.add(btn_start);
view_scroll_one.add(btn_pause);
view_scroll_one.add(btn_stop);
view_scroll_one.addAnnotation(_geo.getAnno_current());



/*
 * Functions calls
 */

//svc_geo.monitorGPSPosition();
/*
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

			view_scroll_one.addRoute({
				name : 'myRoute',
				width : 4,
				color : '#f00',	
				points : [
					{latitude : prec_anno.latitude, longitude : prec_anno.longitude},
					{latitude : _geo.getArr_GPXpos()[i].latitude, longitude : _geo.getArr_GPXpos()[i].longitude},
				]
			});

			view_scroll_one.addAnnotation(anno);
			prec_anno = anno;
			i++;	
		} else {
			clearInterval(timerAnno);
			timerAnno = null;	
		}
	}, 3000);

}
*/