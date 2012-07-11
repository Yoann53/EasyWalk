/**
 * @author Yoann GAUCHARD
 */

//*******  Profile services  *******//


//Signup Service

exports.signup = function(obj_userArgs){

	// 1 - Check if all fields aren't empty
	// 2 - Check if login is a valid
	// 3 - Check if current user is exist
	// 4 - Compare password1 and password2
	// 5 - Save user on web server
	// 6 - Create one cookie on mobile
	// 7 - Instanciate current user in global scope 


	try{

		//** 1 - Check if all fields aren't empty **//

		if (obj_userArgs.login == '' || obj_userArgs.password1 == '' || obj_userArgs.password2 == '' || obj_userArgs.username == '') {
	    	return 'Veuillez renseigner tous les champs !';
		}



		//** 2 - Check if login is a valid **//

    	//Invoke utils services
    	var svc_utils = require('services/utils_services/utils');
    	
    	//Call checkmail service to verify mail synthax
    	var mailok = svc_utils.check_mail(obj_userArgs.login);
    	
    	if(!mailok) return 'Adresse mail invalide !';



		//** 3 - Check if current user is exist **//

    	//Invoke web services
		var svc_web = require('services/resources_services/web');

		//Call "isExist" service to check if current user already exists
		var isExist = svc_web.isExist(obj_userArgs.login);

		if(isExist) return 'Login déjà utilisé !';			



		//** 4 - Save user on web server **//

		if(obj_userArgs.password1 != obj_userArgs.password2) return 'Mots de passe différents !';	 		



		//** 5 - Save user on web server **//

		//Call postUserInfo service to register the current user on webserver
		var success = svc_web.postUserInfo(obj_userArgs);

		if(!success) return 'L\'inscription a échouée !';
		else {



			//** 6 - Create one cookie on mobile **//

			var obj_userParams = {
				login : obj_userArgs.login,
				password : Ti.Utils.md5HexDigest(obj_userArgs.password1),
				username : obj_userArgs.username,
			}

			//Invoke file services
			var svc_file = require('services/resources_services/file');

			//Call "writeUserCookie" service to log the user
			svc_file.writeUserCookie(obj_userParams);		



			//** 7 - Instanciate current user in global scope  **//

			//Invoke user entity
			var User = require('business_entities/user');  

			var obj_user = new User();
			obj_user.setLogin(obj_userArgs.login);
			obj_user.setPassword(obj_userArgs.password1);
			obj_user.setUsername(obj_userArgs.username);

			return obj_user;
		}//end else

	} catch(e) {

		Ti.API.info('[DEV] SignUp profile service failed : ' + e);

	}
}


//Login Service

exports.login = function(obj_userArgs){

	try{
		//Invoke web services
		var svc_web = require('services/resources_services/web');

		//Call "login" service to log user on app
		var success = svc_web.login(obj_userArgs);
		if(!success) return "Authentification incorrecte !";
		else {

			//Call "etuserInfo" service to get user infos
			var obj_userInfo = svc_web.getUserInfo(obj_userArgs.login);

			//** 1 - Create one cookie on mobile **//

			var obj_userParams = {
				login : obj_userInfo.login,
				password : obj_userInfo.password,
				username : obj_userInfo.username
			}

			//Invoke file services
			var svc_file = require('services/resources_services/file');

			//Call "writeUserCookie" service to log the user
			svc_file.writeUserCookie(obj_userParams);			

			//** 2 - Instanciate current user in global scope  **//

			//Invoke user entity
			var User = require('business_entities/user');  

			var obj_user = new User();
			obj_user.setLogin(obj_userInfo.login);
			obj_user.setPassword(obj_userInfo.password);
			obj_user.setUsername(obj_userInfo.username);

			return obj_user;

		}//end else 
	} catch(e) {

		Ti.API.info('[DEV] Login profile service failed : ' + e);

	}
}
