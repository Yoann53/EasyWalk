/**
 * @author Yoann GAUCHARD
 */



var win_race = Titanium.UI.currentWindow;

// initialize to all modes
win_race.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
];


//Include all scrollable views
Ti.include('../common/view_scroll_one.js');


var tab_views = [view_scroll_one];

var scrollableview = Ti.UI.createScrollableView({
	showPagingControl : true,
	currentPage : 0,
	pagingControlHeight : 30,
	views: tab_views
});

win_race.add(scrollableview);

