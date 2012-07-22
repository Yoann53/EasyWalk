/**
 * @author Yoann GAUCHARD
 */

//*******  Web services  *******//

//findFile Service

exports.isCookieExist = function(str_filename) {

	var file_userCookie = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'userCookie.txt');

	if(file_userCookie.exists()){
		return true;
	} else {
		return false;
	} 
};




//writeUserCookie Service

exports.writeUserCookie = function(obj_userArgs){

	var file_userCookie = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'userCookie.txt');
	Ti.API.info(Ti.Filesystem.applicationDataDirectory);
	file_userCookie.write(JSON.stringify(obj_userArgs));
};

//Read XML Datas from local file

exports.readGPXfile = function(){

	var file_gpx = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'test.gpx');
	Ti.API.info(Ti.Filesystem.applicationDataDirectory);
	var xml_text = file_gpx.read().text;
	Ti.API.info(xml_text);
	return xml_text;
};

exports.writeGPXfile = function(obj_coords) {

	var file_gpx = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'temp.gpx');
	var str_data = '<?xml version="1.0"?>\n <gpx version="1.1" creator="EasyWalkGroup">\n';
	str_data += '	<trk>\n';
	str_data += '		<name>temp</name>\n';
	str_data += '		<trkseg>\n';


}