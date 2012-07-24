/**
 * @author Yoann GAUCHARD
 */

//*******  Web services  *******//

//isExist Service

exports.isExist = function(username){

	//Check if user exists on database server
	try{ 

		var url = 'http://remoue.fr:81/Services/WebServ/API/isExist.php?login='+ username +'&format=json'; 
        var json;
        var xhr = Ti.Network.createHTTPClient({

	    	onload: function(e) {
				// this function is called when data is returned from the server and available for use
		        // this.responseText holds the raw text return of the message (used for text/JSON)
		        // this.responseXML holds any returned XML (including SOAP)
		        // this.responseData holds any returned binary data
	        	json = JSON.parse(this.responseText);
				return json['isUser'];
		    },
		    onerror: function(e) {
				// this function is called when an error occurs, including a timeout
		        Ti.API.info(e.error);
		    },
		    timeout: 4000  /* in milliseconds */
		});
		
		xhr.open("GET",url); //replace by url var
		xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		xhr.send(); // request is actually sent with this statement
	} catch(e) {
		
		Ti.API.info('[DEV] isExist web service failed : ' + e);
	}
};



//postUserInfo Service

exports.postUserInfo = function(user_args){
	//Check if user exists on database server
	try{ 

		var url = 'http://remoue.fr:81/Services/WebServ/API/postUser.php?format=json'; 
        var json;
        var xhr = Ti.Network.createHTTPClient({
	    	onload: function(e) {
				// this function is called when data is returned from the server and available for use
		        // this.responseText holds the raw text return of the message (used for text/JSON)
		        // this.responseXML holds any returned XML (including SOAP)
		        // this.responseData holds any returned binary data
		        Ti.API.info(this.responseText);
		        json = JSON.parse(this.responseText);
		        alert(json);
		        alert(json['posts']);
		    },
		    onerror: function(e) {
				// this function is called when an error occurs, including a timeout
		        Ti.API.info(e.error);
		    },
		    timeout: 5000  /* in milliseconds */
		});

		xhr.open("POST",url); //replace by url var
		xhr.send({
			login: user_args.login,
			password: Ti.Utils.md5HexDigest(user_args.password1),
			username: user_args.username
		});  // automatically serializing JavaScript object graphs into form-encoded POST parameters		     	
	} catch(e) {
		
		Ti.API.info('[DEV] postUserInfo web service failed : ' + e);
		
	}
};



//login Service

exports.login = function(user_args){
	//Check if user exists on database server
	try{ 

		var url = 'http://EasyWalk.com/WebServ/API/ChekUser/login=' + user_args.login + '&pw=' + user_args.password + '&format=json'; 
        var json;
        var xhr = Ti.Network.createHTTPClient({
	    	onload: function(e) {
				// this function is called when data is returned from the server and available for use
		        // this.responseText holds the raw text return of the message (used for text/JSON)
		        // this.responseXML holds any returned XML (including SOAP)
		        // this.responseData holds any returned binary data
		        Ti.API.info(this.responseText);
		        json = JSON.parse(this.responseText);
		    },
		    onerror: function(e) {
				// this function is called when an error occurs, including a timeout
		        Ti.API.info(e.error);
		    },
		    timeout: 5000  /* in milliseconds */
		});

		xhr.open("GET","http://localhost:8888/post_auth.php"); //replace by url var
		xhr.send();  // request is actually sent with this statement
		//return json.isExist;
		return true;       	
	} catch(e) {
		Ti.API.info('[DEV] login web service failed : ' + e);
	}
};


//getUserInfo service

exports.getUserInfo = function(login){

	//Check user infos from database server
	try{ 

		var url = 'http://EasyWalk.com/WebServ/API/Userinfo/login=' + login + '&format=json'; 
        var json;
        var xhr = Ti.Network.createHTTPClient({
	    	onload: function(e) {
				// this function is called when data is returned from the server and available for use
		        // this.responseText holds the raw text return of the message (used for text/JSON)
		        // this.responseXML holds any returned XML (including SOAP)
		        // this.responseData holds any returned binary data
		        json = JSON.parse(this.responseText);
		    },
		    onerror: function(e) {
				// this function is called when an error occurs, including a timeout
		        Ti.API.info(e.error);
		    },
		    timeout: 5000  /* in milliseconds */
		});

		xhr.open("GET","http://localhost:8888/post_auth.php"); //replace by url var
		xhr.send();  // request is actually sent with this statement
		
		//return json;
		//return false;
		json = {
			login : 'yoann.gauchard@gmail.com',
			password : 'aaa',
			username : 'Tall'
		}
		return json;

	} catch(e) {

		Ti.API.info('[DEV] login web service failed : ' + e);

	}


};


//getUserInfo service

exports.getCircuits = function(userId){

	//Check user infos from database server
	try{ 
		var url = 'http://localhost:8888/EasyWalk/Services/WebServ/API/GetCircuitsUser.php?idUser='+ userId +'&format=json'; 
        var json;
        var xhr = Ti.Network.createHTTPClient({
	    	onload: function(e) {
				// this function is called when data is returned from the server and available for use
		        // this.responseText holds the raw text return of the message (used for text/JSON)
		        // this.responseXML holds any returned XML (including SOAP)
		        // this.responseData holds any returned binary data
		       	Ti.App.fireEvent(jsonParameters.eventName, {'dataXHR': JSON.parse(this.responseText)});
		    },
		    onerror: function(e) {
				// this function is called when an error occurs, including a timeout
		        Ti.API.info(e.error);
		    },
		    timeout: 5000  /* in milliseconds */
		});

		xhr.open("GET",url,true); //replace by url var
		xhr.send();  // request is actually sent with this statement
		
	} catch(e) {

		Ti.API.info('[DEV] login web service failed : ' + e);

	}
		
		/*
		json = {
		  	"posts":[{
		  		"circuit":{
		  			"ID_Circuit":"15",
		  			"Title":"c'est le circuit",
		  			"Description":"l'app",
		  			"Miniature":"Miniature\/Chrysanthemum.jpg ",
		  			"Distance":"0",
		  			"Duration":"00:00:00",
		  			"Difficulty":"expert",
		  			"Price":"0",
		  			"GPXFile":"GPX\/pocotrail.xml",
		  			"ID_Field":"2",
		  			"ID_Circuit_User":"7",
		  			"ID_User":"9",
		  			"Comment":"Nul!",
		  			"Note":"1",
		  			"0":{
		  				"comments":[{
		  					"comment":{
		  						"ID_Comment":"9",
		  						"Comment":"test",
		  						"Note":"3",
		  						"ID_User":"9",
		  						"ID_Circuit":"15",
		  						"isPrivate":"0",
		  						"login":"admin"
		  					}
		  				}]
		  			}
		  		}
		  	},{"circuit":
		  		{"ID_Circuit":"2",
		  		"Title":"Mayenne",
		  		"Description":"Circuit id&eacute;al pour les famille sportives.",
		  		"Miniature":"Miniature\/pocotrail.png",
		  		"Distance":"15",
		  		"Duration":"00:00:00",
		  		"Difficulty":"amateur",
		  		"Price":"5",
		  		"GPXFile":"\/EasyWalkNO\/GPX\/pocotrail.xml",
		  		"ID_Field":"1",
		  		"ID_Circuit_User":"6",
		  		"ID_User":"9",
		  		"Comment":"",
		  		"Note":"0"
		  		}
		  	},{
		  		"circuit":{
		  		"ID_Circuit":"1",
		  		"Title":"Laval",
		  		"Description":null,
		  		"Miniature":"Miniature\/FalaisesBeauvoir.png",
		  		"Distance":"10",
		  		"Duration":"01:00:00",
		  		"Difficulty":"facile",
		  		"Price":"12",
		  		"GPXFile":"GPX\/FalaisesBeauvoir.xml",
		  		"ID_Field":"1",
		  		"ID_Circuit_User":"5",
		  		"ID_User":"9",
		  		"Comment":"",
		  		"Note":"0"
			  	}
		  	}]
		  };
		  */
};




