/**
 * @author Yoann GAUCHARD
 */

var win_start = Titanium.UI.currentWindow;

// initialize to all modes
win_start.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
];


//Include all scrollable views
Ti.include('./scrollable_views/view_main.js');


var tab_views = [view_main];

var scrollableview = Ti.UI.createScrollableView({
	showPagingControl : true,
	currentPage : 0,
	pagingControlHeight : 30,
	views: tab_views
});

win_start.add(scrollableview);

