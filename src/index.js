import L, { divIcon } from 'leaflet';
import './style.css';
const colombiaMap = require('./deptos2.json')

window.onload = () => {
  const map = L.map('mapid').setView([4.485, -73.41], 5);

  L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiY2FybG9zaGRlbHJlYWwiLCJhIjoiY2s4c2N4Y2N1MGJyeDNmcXpxdm0xNnJkbiJ9.suJRJ9z3JgKIneyqPI_kHw'
  }).addTo(map);
  
  function getColor(d) {
    return d > 1975 ? '#800026' :
           d > 1950  ? '#BD0026' :
           d > 1925  ? '#E31A1C' :
           d > 1900  ? '#FC4E2A' :
           d > 1850   ? '#FD8D3C' :
           d > 1800   ? '#FEB24C' :
           d > 1500   ? '#FED976' :
                      '#FFEDA0';
  }
  function style(feature) {
    return {
        fillColor: getColor(feature.properties.AñO_CREAC),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  }

  const geojson = L.geoJson(colombiaMap, {style: style, onEachFeature: onEachFeature}).bindPopup("helo").addTo(map);
  const info = L.control();

  function highlightFeature(e) {
    const layer = e.target;
    
    layer.setStyle({
      weight: 2,
      color: '#0f1',
      fillOpacity: 0.2
    });
    
    info.update(layer.feature.properties);

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  }

  function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    });
  }


  info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
  };

  // method that we will use to update the control based on feature properties passed
  info.update = function (props) {
      this._div.innerHTML = '<h4>Fecha de Creación de Departamento</h4>' +  (props ?
          '<b>' + props.Name + '</b><br />' + props.AñO_CREAC: 'Hover over a state');
  };

  info.addTo(map);
}