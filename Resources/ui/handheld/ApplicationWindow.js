//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var mod_view_first = require('ui/common/view_first');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});	
		
	//construct UI
	var view_first = new mod_view_first(self);
	self.add(view_first);
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
