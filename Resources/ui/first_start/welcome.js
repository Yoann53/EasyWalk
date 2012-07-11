/**
 * @author Yoann GAUCHARD
 */

var win_welcome = Titanium.UI.currentWindow;


// initialize to all modes
win_welcome.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
];

var btn_signup = Ti.UI.createButton({
	height:44,
	width:200,
	title:'S\'inscrire',
	top:100
});

var btn_login = Ti.UI.createButton({
	height:44,
	width:200,
	title:'S\'authentifier',
	top:150
});

win_welcome.add(btn_signup);
win_welcome.add(btn_login);

btn_signup.addEventListener('click', function()
{
	var win_signup = Titanium.UI.createWindow({
		title: 'Inscription',
		backgroundColor:'#336699',
		url: 'signup.js',
		backButtonTitle: 'Retour',
		barColor: '#336600'
	});

	Ti.UI.currentTab.open(win_signup);
});

btn_login.addEventListener('click', function()
{
	var win_login = Titanium.UI.createWindow({
		title: 'Authentification',
		backgroundColor:'#336699',
		url: 'login.js',
		backButtonTitle: 'Retour',
		barImage:'../navBar.png' 
	});

	Ti.UI.currentTab.open(win_login);
});