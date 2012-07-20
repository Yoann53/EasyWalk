//FirstView Component Constructor
function FirstView(mainWindow) {
	
	// Instance ui component
	var view_first = Ti.UI.createView({
		backgroundImage : '../../images/bkgCenterLight.png'	
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
	 */
	
	btn_signup.addEventListener('click', function(){
		
		mod_ui_signup = require('../common/view_signup');
		
		var view_signup = mod_ui_signup.getView();
		
		// create close button for our window
		var btn_back = Ti.UI.createButton(
			{
				width:200,
				title:'back',
				top:350
			});
		
		btn_back.addEventListener('click',function()
		{
			if(Ti.Platform.name == 'iPhone OS'){
				mainWindow.animate({view:view_first,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
			}else{
				view_first.show();
				mainWindow.remove(view_signup);
			}
		});
		
		if(Ti.Platform.name == 'iPhone OS'){
			view_signup.add(btn_back);
			mainWindow.animate({view:view_signup, transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
		}else{
			view_signup.add(btn_back);
			mainWindow.add(view_signup);
			view_signup.show();
			view_first.hide();
		}
		
	});
	
	btn_login.addEventListener('click', function(){
		
		mod_ui_login = require('../common/view_login');
		
		var view_login = mod_ui_login.getView();
		
		// create close button for our window
		var btn_back = Ti.UI.createButton({title:'Back',width:200,height:40});
		
		btn_back.addEventListener('click',function()
		{
			if(Ti.Platform.name == 'iPhone OS'){
				view_login.add(btn_back);
				mainWindow.animate({view:view_first,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
				mainWindow.remove(view_login);
			}else{
				view_first.show();
				mainWindow.remove(view_login);
			}
		});
		
		if(Ti.Platform.name == 'iPhone OS'){
			view_login.add(btn_back);
			mainWindow.animate({view:view_login, transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});	
		}else{
			view_login.add(btn_back);
			mainWindow.add(view_login);
			view_login.show();
			view_first.hide();
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
