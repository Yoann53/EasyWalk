//FirstView Component Constructor
function FirstView() {
	
	//Instance ui component	

	var self = Ti.UI.createView({
		backgroundImage : 'images/bkgCenterLight.png'	
	});
	
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
	var btn_facebookLogin = Ti.Facebook.createLoginButton({
	    top : 300,
	    style : Ti.Facebook.BUTTON_STYLE_WIDE
	});
	
	
	/*
	 * EventListeners
	 * 
	 */
	
	btn_signup.addEventListener('click', function(){
		
	});
	
	btn_login.addEventListener('click', function(){
		
	});
		
	Ti.Facebook.addEventListener('login', function(e) {
	    if (e.success) {
	    	Ti.App.fireEvent('logged');
	    }else{
	    	Ti.App.fireEvent('error_login');
	    }
	});
	
	Ti.Facebook.addEventListener('logout', function(e) {
	    Ti.App.fireEvent('logout');
	});
	
	Ti.App.addEventListener('logged', function(){
		//Start tabgroup
		
	});
	
	Ti.App.addEventListener('error_login', function(){
		alert("erreur d'authentification!");
		
	});
	
	Ti.App.addEventListener('logged', function(){
		//Start tabgroup
		
	});
	
	/*
	//Add behavior for UI
	label.addEventListener('click', function(e) {
		var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
		
		var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
		var Window;
		if (isTablet) {
			Window = require('ui/tablet/ApplicationWindow');
		}
		else {
			Window = require('ui/handheld/ApplicationWindow');
		}
	
		var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
		new ApplicationTabGroup(Window).open();
	});
	*/
	
	self.add(btn_signup);
	self.add(btn_login);
	self.add(btn_facebookLogin);
	
	return self;
}

module.exports = FirstView;
