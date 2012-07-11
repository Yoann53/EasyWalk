//Application Window Component Constructor
exports.ApplicationWindow = function() {

	var tabGroup = Titanium.UI.createTabGroup();

	Titanium.UI.setBackgroundColor('#fff');  
	var tabGroup = Titanium.UI.createTabGroup();  

	//Check cookie if user is already logged
	var svc_file = require('/services/resources_services/file');
	var logged = svc_file.isCookieExist();

	if(!logged){
		//First start 
		var win_welcome = Titanium.UI.createWindow({  
	    	title:'Bienvenue sur EasyWalk',
	    	backgroundColor:'#336699',
	    	url:'ui/first_start/welcome.js'  
		});	
	} else {
		var win_welcome = Titanium.UI.createWindow({  
	    	title:'Bienvenue sur EasyWalk',
	    	backgroundColor:'#336699',
	    	url:'ui/start.js'  
		});
	}//end else  

	var tab_welcome = Titanium.UI.createTab({  
	    title:"Welcome",  
	    window:win_welcome  
	});    

	//Hide TabBar
	win_welcome.hideTabBar();  
	tabGroup.addTab(tab_welcome);    
	tabGroup.open();  

	return tabGroup;
};