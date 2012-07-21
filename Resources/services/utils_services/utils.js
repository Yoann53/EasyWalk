/**
 * @author Yoann GAUCHARD
 */

//Verify email address

exports.check_mail = function(emailAddress){
  
  	try{

	  	var mailOK; 
	    var mail = emailAddress;  

	    var obj_filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;  
	    if (obj_filter.test(mail))  
	    {  
	        mailOK = true;  
	    }  
	    else  
	    {  
	        mailOK = false;  
	    }  
	    return mailOK;	

  	}catch(e){
  		
  		Ti.API.info('[DEV] checkmail utils service failed : ' + e);
  		
  	}
}

