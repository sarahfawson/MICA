// import mapbox_key from "../../config"
// var API_KEY = mapbox_key;

// Creating map object
// var map = L.map("heatmap", {
//     center: [38, -96],
//     zoomSnap: 0.1,
//     zoom: 4.7
//   });

var mapboxAccessToken = "pk.eyJ1Ijoic2FyYWhmYXdzb24iLCJhIjoiY2p0bG8yejh0MHVkNTQ0cGc3NjZsaWpmdCJ9.tcdLC_jzDT7l7WkfdKe5GQ";

// initialize map
var map = L.map('heatmap').setView([37.8, -96], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.dark',
    attribution: 'Mapbox 2019'
}).addTo(map);

L.geoJson(statesData).addTo(map);

// set color range
function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

// stylin'
function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        // dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(statesData, {style: style}).addTo(map);

// highlight on hover
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

// action on mouse out
function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

// zoom to state on click ... not needed but cool
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

// add listeners to state layers
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);