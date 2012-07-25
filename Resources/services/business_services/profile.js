/**
 * @author Yoann GAUCHARD
 */

//*******  Profile services  *******//


//Signup Service

var isAndroid = (Ti.Platform.osname == 'android') ? true : false;

exports.signup = function(obj_userArgs, callbackSignup){

	// 1 - Check if all fields aren't empty
	// 2 - Check if login is valid
	// 3 - Check if current user is exist
	// 4 - Compare password1 and password2
	// 5 - Save user on web server
	// 6 - Create one cookie on mobile
	// 7 - Instanciate current user in global scope 

	try{

		//** 1 - Check if all fields aren't empty **//

		if (obj_userArgs.login == '' || obj_userArgs.password1 == '' || obj_userArgs.password2 == '' || obj_userArgs.username == '') {
	    	callbackSignup('Veuillez renseigner tous les champs !');
		}
		
		//** 2 - Check if login is a valid **//

    	//Invoke utils services
    	var svc_utils = (isAndroid) ? require('../utils_services/utils') : require('services/utils_services/utils');
    	
    	//Call checkmail service to verify mail synthax
    	var mailok = svc_utils.check_mail(obj_userArgs.login);
    	if(!mailok) callbackSignup('Adresse mail invalide !');

		//** 3 - Save user on web server **//
	
		if(obj_userArgs.password1 != obj_userArgs.password2) callbackSignup('Mots de passe différents !');		

		//** 4 - Check if current user is exist **//

    	//Invoke web services
		var svc_web = (isAndroid) ? require('../resources_services/web') : require('services/resources_services/web');
		
		//Call "isExist" service to check if current user already exists
		svc_web.isExist({ obj_user : obj_userArgs, cbIsExist : callbackIsExist, cbSignup : callbackSignup, cbPostUser: callbackPostUser, svc_web: svc_web});
	} catch(e) {
		Ti.API.info('[DEV] SignUp profile service failed : ' + e);
	}
}


function callbackIsExist(isExist, ctx){

	if(isExist == "true"){
		ctx.cbSignup('Login déjà utilisé !');
	}else{ 		
		
		//** 5 - Save user on web server **//
		
		//Call postUserInfo service to register the current user on webserver
		ctx.svc_web.postUserInfo(ctx);
	}
}

function callbackPostUser(idUser, ctx){
	
	if(!idUser) {
		ctx.cbSignup('L\'inscription a échouée !');
	} else {

		//** 6 - Create one cookie on mobile **//
		
		//Get all user data
		
		var obj_userParams = {
			id : idUser,
			login : ctx.obj_user.login,
			password : Ti.Utils.md5HexDigest(ctx.obj_user.password1),
			username : ctx.obj_user.username,
		}

		//Invoke file services
		var svc_file = (isAndroid) ? require('../resources_services/file') : require('services/resources_services/file');

		//Call "writeUserCookie" service to log the user
		svc_file.writeUserCookie(obj_userParams);		

		//** 7 - Instanciate current user in global scope  **//

		//Invoke user entity
		var User = (isAndroid) ? require('../../business_entities/user') : require('business_entities/user');  
		
		var obj_user = new User();
		obj_user.setId(obj_userArgs.id);
		obj_user.setLogin(obj_userArgs.login);
		obj_user.setPassword(obj_userArgs.password1);
		obj_user.setUsername(obj_userArgs.username);
		obj_user.persist();
		
		ctx.cbSignup(obj_user);
	}//end else
}

//Login Service

exports.login = function(obj_userArgs, callback){

	try{
		//Invoke web services
		var svc_web = require('services/resources_services/web');
		
		//Call "login" service to log user on app
		svc_web.login(obj_userArgs, {obj_user : obj_userArgs, cbLogin : callback, cbCheckUser : callbackCheckUser, cbGetUser : callbackGetUser, svc_web: svc_web});

	} catch(e) {

		Ti.API.info('[DEV] Login profile service failed : ' + e);

	}
}

function callbackCheckUser(success,ctx){
	
	if(!success || success == 'false'){
		ctx.cbLogin("Authentification incorrecte !");
	} else {
		//Call "userInfo" service to get user infos
		ctx.svc_web.getUserInfo(ctx.obj_user.login, ctx);
	}
}

function callbackGetUser(obj_userInfo, ctx){
	//** 1 - Create one cookie on mobile **//
		
	var obj_userParams = {
		id : obj_userInfo.id,
		login : obj_userInfo.login,
		password : obj_userInfo.password,
		username : obj_userInfo.username
	}
	
	//Invoke file services
	var svc_file = (isAndroid) ? require('../resources_services/file') : require('services/resources_services/file');

	//Call "writeUserCookie" service to log the user
	svc_file.writeUserCookie(obj_userParams);			

	//** 2 - Instanciate current user in global scope  **//
	
	//Invoke user entity
	var User = (isAndroid) ? require('../../business_entities/user') : require('business_entities/user');  

	var obj_user = new User();
	obj_user.setId(obj_userInfo.id);
	obj_user.setLogin(obj_userInfo.login);
	obj_user.setPassword(obj_userInfo.password);
	obj_user.setUsername(obj_userInfo.username);
	obj_user.persist();
	
	ctx.cbLogin(obj_user);
}
