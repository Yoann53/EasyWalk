/**
 * @author Yoann GAUCHARD
 */

exports.getView = function(){

	var view_login = Ti.UI.createView({
		title: 'Authentification',
		backgroundImage: '../../images/bkgCenterLight.png'
	});
	
	var txt_login = Titanium.UI.createTextField({
		color:'#336699',
		top:20,
		left:35,
		width:250,
		height:40,
		hintText:'Login',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var txt_password = Titanium.UI.createTextField({
		color:'#336699',
		top:80,
		left:35,
		width:250,
		height:40,
		hintText:'Mot de passe',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var btn_login = Ti.UI.createButton({
		height:44,
		width:150,
		title:'Login',
		top:150
	});
	
	var ent_user;
	/*
	btn_login.addEventListener('click', function(){
	
		try{
	
			//Handle all textfield values
			var obj_params = {
				login : txt_login.value,
				password : txt_password.value,
			}
	
			//Invoke profile services
			var svc_profile = require('services/business_services/profile');
	
			//Call signup service to register the current user on webserver
			var result = svc_profile.login(obj_params);	
	
			if(typeof(result) == 'string') alert(result);
			else if(typeof(result) == 'object') {
				ent_user = result;
	
				var win_start = Titanium.UI.createWindow({  
			    	title:'Bienvenue sur EasyWalk',
			    	backgroundColor:'#336699',
			    	url:'../start.js'  
				});
	
				Ti.UI.currentTab.open(win_start);
			}//end else
	
		} catch(e) {
	
			Ti.API.info('[DEV] SignUp ui EventListener failed : ' + e);
	
		}
	});
	*/
	view_login.add(txt_login);
	view_login.add(txt_password);
	view_login.add(btn_login);
	
	return view_login;

}
