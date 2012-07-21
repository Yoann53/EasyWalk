//FirstView Component Constructor
function FirstView(win_main) {
	
	var isAndroid = (Ti.Platform.osname == 'android') ? true : false;
	
	// Instance ui component
	var view_first = Ti.UI.createView({
		backgroundImage : (isAndroid) ? '../../images/bkgCenterLight.png' : 'images/bkgCenterLight.png'	
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
	
	// create Facebook configuration and login button
	Ti.Facebook.appid = '399921883389237';
	Ti.Facebook.permissions = ['publish_stream', 'read_stream', 'user_photos', 'friends_photos'];
	var btn_facebookLogin = Ti.Facebook.createLoginButton({
	    top : 300,
	    style : Ti.Facebook.BUTTON_STYLE_WIDE
	});


	/*
	 * EventListeners
	 */
	
	//Display signup view
	btn_signup.addEventListener('click', function(){
		
		if(isAndroid){
			
			mod_ui_signup = require('../common/view_signup');	
			var view_signup = mod_ui_signup.getView();
		
			win_main.addEventListener('android:back',function(){
				view_first.show();
				win_main.remove(view_signup);
			});
			
			win_main.add(view_signup);
			view_signup.show();
			view_first.hide();
			
		}else{
			
			mod_ui_signup = require('ui/common/view_signup');
			var view_signup = mod_ui_signup.getView();
			//view_signup.hide();
			//win_main.add(view_signup);
			
			// create close button for our window
			var btn_back = Ti.UI.createButton(
			{
				height:40,
				width:200,
				title:'Retour',
				top:350
			});
			
			//Android back button function
			btn_back.addEventListener('click',function()
			{
				win_main.animate({view:view_first,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
				view_signup == null;
			});
			
			view_signup.add(btn_back);
			win_main.animate({view:view_signup, transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
		}
	});
	
	//Display login view
	btn_login.addEventListener('click', function(){
		
		if(isAndroid){
			
			var mod_ui_login = require('../common/view_login');
			var view_login = mod_ui_login.getView();
			
			//Android back button function
			win_main.addEventListener('android:back',function(){
				view_first.show();
				win_main.remove(view_login);
			});
			
			win_main.add(view_login);
			view_login.show();
			view_first.hide();
			
		}else{
			
			var mod_ui_login = require('ui/common/view_login');	
			var view_login = mod_ui_login.getView();
			//view_login.hide();
			//win_main.add(view_login);
			
			// create close button for our window
			var btn_back = Ti.UI.createButton({
				title:'Retour',
				width:200,
				height:40
			});
			
			btn_back.addEventListener('click',function()
			{
				view_login.add(btn_back);
				win_main.animate({view:view_first,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
				view_login = null;
			});
			
			view_login.add(btn_back);
			win_main.animate({view:view_login, transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});	
		}
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
		
	});
	
	Ti.App.addEventListener('error_login', function(){
		alert("erreur d'authentification!");
		
	});
	
	Ti.App.addEventListener('logged', function(){
		
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
	
	view_first.add(btn_signup);
	view_first.add(btn_login);
	view_first.add(btn_facebookLogin);
	
	return view_first;
}

module.exports = FirstView;
