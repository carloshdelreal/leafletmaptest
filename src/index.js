import L from 'leaflet';
import './style.css';

window.onload = () => {
  console.log("it works");
  console.log(L);
  const map = L.map('mapid').setView([4.485, -73.41], 5);

  L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiY2FybG9zaGRlbHJlYWwiLCJhIjoiY2s4c2N4Y2N1MGJyeDNmcXpxdm0xNnJkbiJ9.suJRJ9z3JgKIneyqPI_kHw'
}).addTo(map);
}