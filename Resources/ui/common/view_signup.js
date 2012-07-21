/**
 * @author Yoann GAUCHARD
 */

exports.getView = function(){
	
	var isAndroid = (Ti.Platform.osname == 'android') ? true : false;
	
	var view_signup = Ti.UI.createView({
		title: 'Inscription',
		backgroundImage : (isAndroid) ? '../../images/bkgCenterLight.png' : 'images/bkgCenterLight.png'	
	});

	var txt_login = Titanium.UI.createTextField({
		color:'#336699',
		top:20,
		left:35,
		width:250,
		height:40,
		hintText:'Adresse_mail',
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
	
	var txt_confirm_password = Titanium.UI.createTextField({
		color:'#336699',
		top:140,
		left:35,
		width:250,
		height:40,
		hintText:'Confirmation du mot de passe',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	
	var txt_username = Titanium.UI.createTextField({
		color:'#336699',
		top:210,
		left:35,
		width:250,
		height:40,
		hintText:'Pseudo',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var btn_send = Ti.UI.createButton({
		height:44,
		width:200,
		title:'Valider',
		top:280
	});
	
	//global variable
	var ent_user;
	
	btn_send.addEventListener('click', function(){
		
		try{
			//Handle all textfield values
			var obj_params = {
				login : txt_login.value,
				password1 : txt_password.value,
				password2 : txt_confirm_password.value,
				username : txt_username.value
			}
			
			//Invoke profile services
			var svc_profile = (isAndroid) ? require('../../services/business_services/profile') : require('services/business_services/profile');
			
			//Call signup service to register the current user on webserver
			var result  = svc_profile.signup(obj_params);
			
			if(typeof(result) == 'string'){
				alert(result);
			} else if(typeof(result) == 'object') {
				ent_user = result;
				Ti.API.info('object is returned');
				var win_start = Titanium.UI.createWindow({  
			    	title:'Bienvenue sur EasyWalk',
			    	backgroundColor:'#336699',
			    	//url:'../start.js'  
				});
				//Ti.UI.currentTab.open(win_start);
			} else {
				alert('erreur d\'inscription');
			}
			
		} catch(e) {
			Ti.API.info('[DEV] SignUp ui EventListener failed : ' + e);
		}
		
	});
	
	view_signup.add(txt_login);
	view_signup.add(txt_password);
	view_signup.add(txt_confirm_password);
	view_signup.add(txt_username);
	view_signup.add(btn_send);
	
	return view_signup;
}
