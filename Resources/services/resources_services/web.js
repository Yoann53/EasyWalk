/**
 * @author Yoann GAUCHARD
 */

//*******  Web services  *******//

//isExist Service

exports.isExist = function(username){

	//Check if user exists on database server
	try{ 

		var url = 'http://remoue.fr:81/Services/WebServ/API/isExist.php?login="'+ username +'"&format=json'; 
		alert(url);
        var json;@
        var test;
        var xhr = Ti.Network.createHTTPClient({
        	validatesSecureCertificate: false,
    		tlsVersion: Titanium.Network.TLS_VERSION_1_1,
	    	onload: function(e) {
				// this function is called when data is returned from the server and available for use
		        // this.responseText holds the raw text return of the message (used for text/JSON)
		        // this.responseXML holds any returned XML (including SOAP)
		        // this.responseData holds any returned binary data
		        
		        json = JSON.parse(this.responseText);
		        test = this.responseText;
		    },
		    onerror: function(e) {
				// this function is called when an error occurs, including a timeout
		        Ti.API.info(e.error);
		    },
		    timeout: 30000  /* in milliseconds */
		});
		
		xhr.open("GET",url); //replace by url var
		xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		xhr.send(); // request is actually sent with this statement
		alert('test' + test);
		alert('json : '+json);

		return json.isUser;
		//return false;      	
	} catch(e) {

		Ti.API.info('[DEV] isExist web service failed : ' + e);

	}
};



//postUserInfo Service

exports.postUserInfo = function(user_args){
	//Check if user exists on database server
	try{ 

		var url = 'http://EasyWalk.com/WebServ/API/postUserInfo/format=json'; 
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

		xhr.open("POST","http://localhost:8888/post_auth.php"); //replace by url var
		xhr.send({
			login: user_args.login,
			password: Ti.Utils.md5HexDigest(user_args.password1),
			username: user_args.username
		});  // automatically serializing JavaScript object graphs into form-encoded POST parameters		
		//return json.success;
		return true;       	
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