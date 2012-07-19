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

// Don't forget to set your appid and requested permissions, else the login button
// won't be effective.
Ti.Facebook.appid = '399921883389237';
Ti.Facebook.permissions = ['publish_stream', 'read_stream', 'user_photos', 'friends_photos'];
Ti.Facebook.addEventListener('login', function(e) {
    if (e.success) {
        alert('Logged in');
    }
});
Ti.Facebook.addEventListener('logout', function(e) {
    alert('Logged out');
});

var btn_facebookLogin = Ti.Facebook.createLoginButton({
    top : 300,
    style : Ti.Facebook.BUTTON_STYLE_WIDE
});

// Add the button.  Note that it doesn't need a click event listener.
win_welcome.add(btn_facebookLogin);

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