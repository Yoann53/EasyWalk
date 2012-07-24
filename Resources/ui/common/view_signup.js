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
	
	var activityIndicator = Ti.UI.createActivityIndicator({
      color: 'white',
      font: {fontFamily:'Helvetica Neue', fontSize:20, fontWeight:'bold'},
      message: 'Loading...',
      style:Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN,
      top:290,
      height:'auto',
      width:'auto'
    });
    
    if(!isAndroid) view_signup.add(activityIndicator);

	// eventListeners must always be loaded before the event is fired 
	btn_send.addEventListener('click', function () {
  		btn_send.setVisible(false);
		activityIndicator.show();
		// do some work that takes 6 seconds
		// ie. replace the following setTimeout block with your code
		setTimeout(function(){
			activityIndicator.hide();
			btn_send.setVisible(true);
		}, 6000);
    });
	
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
			
			//Tempo to be sure we have time to receive the webservice response
			setTimeout(function(){
       			
       			if(typeof(result) == 'string'){
					alert(result);
				} else if(typeof(result) == 'object') {
					ent_user = result;
					
				} else {
					alert('erreur d\'inscription');
				}
      		}, 6000);
			
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

