//Application Window Component Constructor
function ApplicationWindow() {
	var isAndroid = (Ti.Platform.osname == 'android') ? true : false;
	
	//load component dependencies
	var mod_view_first = (isAndroid) ? require('../common/view_first') : require('ui/common/view_first');

	if(isAndroid) {
		//create component instance
		var self = Ti.UI.createWindow({
			backgroundColor:'#ffffff',
			navBarHidden:true,
			exitOnClose:true
		});
	} else {
		//create component instance
		var self = Ti.UI.createWindow({
			backgroundColor:'#ffffff'
		});		
	}

	//construct UI
	var view_first = new mod_view_first(self);
	self.add(view_first);

	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;