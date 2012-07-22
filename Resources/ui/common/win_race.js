/**
 * @author Yoann GAUCHARD
 */
var isAndroid = (Ti.Platform.osname == 'android') ? true : false;


var win_race = Titanium.UI.currentWindow;

// initialize to all modes
win_start.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
];


//Include all scrollable views

if(isAndroid){
	Ti.include('../common/view_scroll_one.js');
}else{
	Ti.include('ui/common/view_scroll_one.js');
}



var tab_views = [view_main];

var scrollableview = Ti.UI.createScrollableView({
	showPagingControl : true,
	currentPage : 0,
	pagingControlHeight : 30,
	views: tab_views
});

win_race.add(scrollableview);

