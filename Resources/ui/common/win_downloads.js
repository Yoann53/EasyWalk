/**
 * @author Yoann GAUCHARD
 */

var isAndroid = (Ti.Platform.osname == 'android') ? true : false;

var win = Titanium.UI.currentWindow;

//Invoke web service
var svc_web = (isAndroid) ? require('services/resources_services/web') : require('services/resources_services/web');

// create table view data object
var data = [];


//Take all circuits buyed by user
svc_web.getCircuits();

function callback(json){
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
	
	for(var i=0, max=json.posts.length; i<max; i++){
		var row = Ti.UI.createTableViewRow({height:'auto',backgroundColor:'#ffffff',selectedBackgroundColor:'#dddddd',hasChild:true});	
	
		var lab_title = Ti.UI.createLabel({
			text: json.posts[i].circuit.Title,
			color: '#b40000',
			textAlign:'left',
			left:70,
			top:2,
			height:'auto',
			font:{fontWeight:'bold',fontSize:13}
		});
		row.add(lab_title);
		
		
		var lab_desc = Ti.UI.createLabel({
			text: json.posts[i].circuit.Difficulty + ' - ' +json.posts[i].circuit.Distance + ' km - ' + json.posts[i].circuit.Duration, 
			color: '#111',
			textAlign:'left',
			left:70,
			height:'auto',
			top:17,
			font:{fontWeight:'bold',fontSize:16}
		});
		row.add(lab_desc);
		
		
		// using remote image array
		var img_photo = Ti.UI.createImageView({
			image: images[i],
			//image: "http://remoue.fr/"+json.posts[i].circuit.Miniature,
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
		data:data
	});
	
	// add table view to the window
	Titanium.UI.currentWindow.add(tableview);
}
