var highlightLayer = null;
//Function for finding certain Cities on the Map and zooming in on them
function changeFocusOnLocation(locName) {
    var geocodingUrl = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(locName);

    fetch(geocodingUrl)
        .then(response => response.json())
        .then(data => {
            
            if(data.length > 0) {                
                var result = data[0];                
                var lat = parseFloat(result.lat);                
                var lon = parseFloat(result.lon);
                var locationName = result.display_name.split(',')[0].trim();
                console.log(locationName); 
                highlightOutline(locationName);              
                map.setView([lat, lon], 13);
            }else{
                alert('Location not found');            
            }
        })
        .catch(error => {
            console.error('Geocoding-Error: ', error);
            alert('Geocoding-Error')
        });               
}

var searchInput = document.getElementById('search-input');

    searchInput.addEventListener('keydown', function(event) {
        if(event.key == 'Enter') {
            var locName = searchInput.value;
            changeFocusOnLocation(locName)
        }
});

function replaceUmlaute(str){     
     str = str.replace(/ä/g, 'Ã¤');
     str = str.replace(/ö/g, 'Ã¶');
     str = str.replace(/ü/g, 'Ã¼');
     str = str.replace(/ß/g, 'ÃŸ'); 
     
     str = str.replace(/Ä/g, 'Ã„');
     str = str.replace(/Ö/g, 'Ã–');
     str = str.replace(/Ü/g, 'Ãœ');
 
     return str;
}

function highlightOutline(locName){
    var xhr = new XMLHttpRequest();
    var sql = 'SELECT Koordinaten FROM gemeinde WHERE Bezeichnung = "' + locName +'";';
    
    console.log(sql);
    sql = replaceUmlaute(sql);
    console.log(sql);
    var url = 'fetchDataDynamic.php';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){
        if(xhr.status === 200){            
            var responseData = JSON.parse(xhr.responseText);
            console.log(responseData);
            var coords = responseData[0].Koordinaten;
            console.log(coords);
            if(highlightLayer){
                map.removeLayer(highlightLayer);
            }
            var parsedcoords = JSON.parse(coords);
            highlightLayer = L.geoJSON(parsedcoords).addTo(map);
            highlightLayer.setStyle({
                color: 'red',
                weight: 2,
                fillOpacity: 0.1
            });           
        }else{
            console.error('Fehler bei Anfrage: ', error);
        }
    };
    xhr.send('sqlQuery=' + encodeURIComponent(sql));
}






