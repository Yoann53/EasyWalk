/**
 * @author Yoann GAUCHARD
 */

/*
 * Geo Class
 */

/*
 * Constructor
 */

function Geo() {
	
	this.LATITUDE_BASE = 38.500000;
	this.LONGITUDE_BASE = -121.050210;
	this.annos = []; //map's annotations
	this.isTrackStarted = false;
	//this.arr_GPXpos = this.getGPXtrace();
	this.anno_current = Ti.Map.createAnnotation({
		titleid : 0,
		animate : true,
		pincolor : Titanium.Map.ANNOTATION_GREEN,
		title : 'Vous êtes ici !',
		latitude : 38.500000, 
		longitude : -121.050210
	});
	
}


/*
 *  Continually monitor GPS Position as soon as location change 
 */
Geo.prototype.monitorGPSPosition = function(){
	
	
	if(this.isAndroid){
		var locationAdded = false;
		var handleLocation = function(e) {
		    if (!e.error) {
		        Ti.App.fireEvent('evtLocationUpdate',e.coords);
		    }else{
		    	alert('Error: ' + e.error);
		    }
		};
		var addHandler = function() {
		    if (!locationAdded) {
		        Ti.Geolocation.addEventListener('location', handleLocation);
		        locationAdded = true;
		    }
		};
		var removeHandler = function() {
		    if (locationAdded) {
		        Ti.Geolocation.removeEventListener('location', handleLocation);
		        locationAdded = false;
		    }
		};
		
		Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
		Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
		Titanium.Geolocation.distanceFilter = 0;
		Titanium.Geolocation.frequency = 1;
		/*
		gpsProvider = Ti.Geolocation.Android.createLocationProvider({
		    name: Ti.Geolocation.PROVIDER_GPS,
		    minUpdateTime: 10, 
		    minUpdateDistance: 10
		});
		Ti.Geolocation.Android.addLocationProvider(gpsProvider);
		*/
		if (Ti.Geolocation.locationServicesEnabled) {
		    addHandler();
			
		    var activity = Ti.Android.currentActivity;
		    activity.addEventListener('destroy', removeHandler);
		    activity.addEventListener('pause', removeHandler);
		    activity.addEventListener('resume', addHandler);
		    
		} else {
		    alert('Activez le service gps.');
		}
	}else{
		if (Ti.Geolocation.locationServicesEnabled) {
		    Ti.Geolocation.purpose = 'Get Current Location';
		    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
		    Ti.Geolocation.distanceFilter = 10;
	
		    Ti.Geolocation.addEventListener('location', function(e) {
		        if (e.error) {
		            alert('Error: ' + e.error);
		        } else {
		        	Ti.App.fireEvent('evtLocationUpdate',e.coords);
		            Ti.API.info(e.coords);
		        }
		    });
		} else {
		    alert('Activez le service gps.');
		}
	}
};


/*
 * Save current coords in temporary gpx file
 */
Geo.prototype.saveCurrentCoords = function(){

	var svc_file = require('services/resources_services/file');

};

/*
Geo.prototype.getGPXtrace = function() {

	var svc_file = require('services/resources_services/file');
	var xml_gpxtrace = svc_file.readGPXfile();
	var doc = Ti.XML.parseString(xml_gpxtrace);
	var trace = doc.documentElement.getElementsByTagName('trkpt');

	var tab_XMLpositions = [];
	var latitude;
	var longitude;
	for (var i=0, max = trace.length; i < max; i++) {
		latitude = trace.item(i).getAttributes().item(0).nodeValue;
		longitude = trace.item(i).getAttributes().item(1).nodeValue;
		tab_XMLpositions[i] = {
			longitude : longitude,
			latitude : latitude
		}
	};

	return tab_XMLpositions;
};

*/


/*
 * Accessors
 */

Geo.prototype.getLONGITUDE_BASE = function() {
	return this.LONGIITUDE_BASE;
};

Geo.prototype.getLATTITUDE_BASE = function() {
	return this.LATTITUDE_BASE;
};




Geo.prototype.getAnnos = function() {
	return this.annos;
};

Geo.prototype.setAnnos = function(arr_arg) {
	this.annos = arr_arg;
};




Geo.prototype.getArr_GPXpos = function() {
	return this.arr_GPXpos;
};

Geo.prototype.setArr_GPXpos = function(arr_arg) {
	this.arr_GPXpos = arr_arg;
};



Geo.prototype.getAnno_current = function() {
	return this.anno_current;
};

Geo.prototype.setAnno_current = function(obj_anno) {
	this.anno_current = obj_anno;
};


module.exports = Geo;


