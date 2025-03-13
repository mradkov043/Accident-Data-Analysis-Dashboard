var markersCluster = L.markerClusterGroup();

function getFilterValues() {
    var ukategorie = document.getElementById('ukategorie').value;
    var vehicleTypes = {
        IstRad: document.getElementById('IstRad').checked,
        IstPKW: document.getElementById('IstPKW').checked,
        IstFuss: document.getElementById('IstFuss').checked,
        IstKrad: document.getElementById('IstKrad').checked,
        IstGkfz: document.getElementById('IstGkfz').checked,
        IstSonstige: document.getElementById('IstSonstige').checked,
    };
    var date = document.getElementById('date-selector').value;
    var unfallart = document.getElementById('unfallart').value;

    return {
        ukategorie,
        vehicleTypes,
        date,
        unfallart
    };
}

function clearMarkers() {
    markersCluster.clearLayers();
}

function loadMarkers() {
    clearMarkers();

    const filters = getFilterValues();
    var queryParams = new URLSearchParams();
    queryParams.append("filters", JSON.stringify(filters));

    fetch('loadEntriesDB.php?' + queryParams.toString())
        .then(response => response.json())
        .then(data => {
            data.forEach(unfall => {
                const ukategorieMapping = {
                    "1": "Unfall mit Getoeteten",
                    "2": "Unfall mit Schwerverletzten",
                    "3": "Unfall mit Leichtverletzten"
                };
                const ukategorieText = ukategorieMapping[unfall.UKATEGORIE] || 'Unbekannte Kategorie';

                const uartMapping = {
                    "1": "Zusammenstoss mit anfahrendem/anhaltendem/ruhendem Fahrzeug",
                    "2": "Zusammenstoss mit vorausfahrendem / wartendem Fahrzeug",
                    "3": "Zusammenstoss mit seitlich in gleicher Richtung fahrendem Fahrzeug",
                    "4": "Zusammenstoss mit entgegenkommendem Fahrzeug",
                    "5": "Zusammenstoss mit einbiegendem / kreuzendem Fahrzeug",
                    "6": "Zusammenstoss zwischen Fahrzeug und Fussgaenger",
                    "7": "Aufprall auf Fahrbahnhindernis",
                    "8": "Abkommen von Fahrbahn nach rechts",
                    "9": "Abkommen von Fahrbahn nach links",
                    "0": "Unfall anderer Art",
                };
                const uartText = uartMapping[unfall.UART] || 'Unbekannte Unfallart';

             const umonatMapping = {
                 "1": "Januar", "2": "Februar", "3": "März",
                 "4": "April", "5": "Mai", "6": "Juni",
                 "7": "Juli", "8": "August", "9": "September",
                 "10": "Oktober", "11": "November", "12": "Dezember"
             };
             const umonatText = umonatMapping[unfall.UMONAT] || 'Unbekannter Monat';

             const uwochentagMapping = {
                 "1": "Montag", "2": "Dienstag", "3": "Mittwoch",
                 "4": "Donnerstag", "5": "Freitag", "6": "Samstag",
                 "7": "Sonntag"
             };
             const uwochentagText = uwochentagMapping[unfall.UWOCHENTAG] || 'Unbekannter Wochentag';

             const utypMapping = {
                "1": "Fahrunfall",
                "2": "Abbiegeunfall",
                "3": "Einbiegen / Kreuzen-Unfall",
                "4": "Ueberschreiten-Unfall",
                "5": "Unfall durch ruhenden Verkehr",
                "6": "Unfall im Laengsverkehr",
                "7": "Sonstiger Unfall"
            };
            const utypText = utypMapping[unfall.UTYP] || 'Unbekannte Typ';

            const ulichtverhMapping = {
                "0": "Tageslicht",
                "1": "Daemmerung",
                "2": "Dunkelheit"
            };
            const ulichtverhText = ulichtverhMapping[unfall.ULICHTVERH] || 'Unbekannte Lichtverhaeltnisse';

            const ustrzustandMapping = {
                "0": "trocken",
                "1": "nass/feucht/schluepfrig",
                "2": "winterglatt"
            };
            const ustrzustandText = ustrzustandMapping[unfall.USTRZUSTAND] || 'Unbekannte Strassenzustand';
                

                const marker = L.marker([unfall.YGCSWGS84, unfall.XGCSWGS84]);
                marker.bindPopup(`
                    <strong>Unfall ID:</strong> ${unfall.ID}<br>
                    <strong>Unfall Kategorie:</strong> ${ukategorieText}<br>
                    <strong>Unfallart:</strong> ${uartText}<br>
                    <strong>Unfalltyp:</strong> ${utypText}<br>
                    <strong>Jahr:</strong> ${unfall.UJAHR || 'N/A'}<br>
                    <strong>Monat:</strong> ${umonatText}<br>
                    <strong>Wochentag:</strong> ${uwochentagText}<br>
                    <strong>Stunde: |</strong> ${unfall.USTUNDE} <strong>: 00 |</strong><br>
                    <strong>Lichtverhaeltnisse:</strong> ${ulichtverhText}<br>
                    <strong>Strassenzustand:</strong> ${ustrzustandText}<br>
                `);
                markersCluster.addLayer(marker);
            });
            map.addLayer(markersCluster);
            console.log("Number of markers generated:", data.length);
        })
        .catch(error => console.error('Error fetching data:', error));
}


document.getElementById('apply-filters').addEventListener('click', loadMarkers);

document.addEventListener('DOMContentLoaded', function() {
    loadMarkers();
});
