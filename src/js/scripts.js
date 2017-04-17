var obj = JSON.parse(JSON.stringify(points));
var objWarn = JSON.parse(JSON.stringify(warn));
var objTimer = JSON.parse(JSON.stringify(timer));
var objError = JSON.parse(JSON.stringify(CHPError));
var markers = [];
function initMap() {
    var pinColor;

    var center = new google.maps.LatLng(51.396097, 10.130077);
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var num_markers = points.length;
    for (var i = 0; i < num_markers; i++) {
        if (obj[i].fields.CHPInoperation == true) {
            //green
            pinColor = "00ff00";
        } else if (obj[i].fields.CHPReady == true) {
            //blue
            pinColor = "0000ff";
        } else if (obj[i].fields.CHPWarning == true) {
            //yellow
            pinColor = "ffff00";
        } else if (obj[i].fields.CHPMalfunction == true) {
            //red
            pinColor = "ff0000";
        } else {
            //black
            pinColor = "000000";
        }
        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34));
        markers[i] = new google.maps.Marker({
            position: { lat: parseFloat(obj[i].fields.CHPLatitude), lng: parseFloat(obj[i].fields.CHPLongitude) },
            map: map,
            html: obj[i].fields.CHPName,
            id: parseFloat(obj[i].fields.CHPInfo),
            icon: pinImage
        });
        google.maps.event.addListener(markers[i], 'click', function () {
            var infowindow = new google.maps.InfoWindow({
                id: this.id,
                content: this.html,
                position: this.getPosition()
            });
            google.maps.event.addListenerOnce(infowindow, 'closeclick', function () {
                markers[this.id].setVisible(true);
            });
            infowindow.open(map);
        });
    };
};

function setInfo() {
    var buildNameList = document.getElementById('name');
    var buildTimerList = document.getElementById('timer');
    var buildWarningNameList = document.getElementById('nameWarning');
    var buildWarningList = document.getElementById('warning');
    var malfunctionName = document.getElementById('malfunctionName');
    var malfunction = document.getElementById('malfunction');

    for (var i = 0; i < objTimer.length; i++) {
        buildNameList.innerHTML += objTimer[i].fields.CHPName + '<br />';
        buildTimerList.innerHTML += objTimer[i].fields.CHPMaintenance_time1 + '<br />';
    }
    for (var m = 0; m < objWarn.length; m++) {
        buildWarningNameList.innerHTML += objWarn[m].fields.CHPName + '<br />';
        buildWarningList.innerHTML += " Warning  <br />";
    }
    for (var n = 0; n < objError.length; n++) {
        malfunctionName.innerHTML += objError[n].fields.CHPName + '<br />';
        malfunction.innerHTML += "Malfunction <br />";
    }
}

setInfo();
