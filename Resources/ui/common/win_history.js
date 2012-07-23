/**
 * @author Yoann GAUCHARD
 */

var win = Titanium.UI.currentWindow;

// create table view data object
var data = [];

var images = [
	'http://i.ytimg.com/vi/CzyilSByWbo/0.jpg',
	'http://i.ytimg.com/vi/ltSyVNO5tvM/0.jpg',
	'http://m.wsj.net/video/20100217/021710atdlynch/021710atdlynch_115x65.jpg',
	'http://philestore1.phreadz.com/_users/2d/04/e4/16/bennycrime/2010/02/19/bennycrime_1266618797_60.jpg',
	'http://philestore1.phreadz.com/_users/30/02/86/06/kosso/2010/02/19/kosso_1266556045_60.jpg',
	'http://farm5.static.flickr.com/4019/4369245306_7e96b9dd39_s.jpg',
	'http://a3.twimg.com/profile_images/294512463/kosso_k2_normal.jpg',
	'http://a1.twimg.com/profile_images/682506508/freakshowicon_normal.jpg',
	'http://www.appcelerator.com/wp-content/themes/appcelerator/img/ipad_image.png',
	'http://www.bytelove.com/images/uploads/Bytelove/Geek/rss%20feed%20me%20-%20photo.jpg'
];

for (var i=0; i<10; i++) {
	var row = Ti.UI.createTableViewRow({height:'auto',backgroundColor:'#ffffff',selectedBackgroundColor:'#dddddd'});	

	var lab_title = Ti.UI.createLabel({
		text: 'Randonnée '+i,
		color: '#b40000',
		textAlign:'left',
		left:70,
		top:2,
		height:'auto',
		font:{fontWeight:'bold',fontSize:13}
	});
	row.add(lab_title);
	
	
	var lab_desc = Ti.UI.createLabel({
		text: 'Date - distance - durée',
		color: '#111',
		textAlign:'left',
		left:70,
		height:'auto',
		top:17,
		font:{fontWeight:'bold',fontSize:16}
	});
	row.add(lab_desc);
	
	// Kosso:
	// using remote image array
	var img_photo = Ti.UI.createImageView({
		image: images[i],
		top: 5,
		left: 5,
		width:60,
		height:40
	});

	row.add(img_photo);
	
	data[i] = row;
}

// create table view
var tableview = Titanium.UI.createTableView({
	data:data, 
	editable:true, 
	moveable:true,
	hasDetail:true
});


// add move event listener
tableview.addEventListener('move',function(e)
{
	Titanium.API.info("move - row="+e.row+", index="+e.index+", section="+e.section+", from = "+e.fromIndex);
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);

//
//  create edit/cancel buttons for nav bar
//
var edit = Titanium.UI.createButton({
	title:'Edit'
});

edit.addEventListener('click', function()
{
	win.setRightNavButton(cancel);
	tableview.editing = true;
});

var cancel = Titanium.UI.createButton({
	title:'Cancel',
	style:Titanium.UI.iPhone.SystemButtonStyle.DONE
});
cancel.addEventListener('click', function()
{
	win.setRightNavButton(edit);
	tableview.editing = false;
});

win.setRightNavButton(edit);