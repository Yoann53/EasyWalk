exports.ApplicationTabGroup = function() {
	var tabGroup = Titanium.UI.createTabGroup();

	Titanium.UI.setBackgroundColor('#fff');  
	var tabGroup = Titanium.UI.createTabGroup();  

	//First start 
	var win_race = Titanium.UI.createWindow({  
    	title:'Bienvenue sur EasyWalk',
    	backgroundColor:'#336699',
    	url:'ui/common/win_race.js'  
	});
			
	
	var tab_race = Titanium.UI.createTab({  
	    title:"Welcome",  
	    window:win_race  
	});    

	//Hide TabBar
	//win_welcome.hideTabBar();  
	tabGroup.addTab(tab_race);  
	tabGroup.open();
};

