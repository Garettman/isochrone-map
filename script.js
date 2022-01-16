var map = null; // carte leaflet pour affichage

function go() {
  var lon = document.getElementById("lon").value;
  var lat = document.getElementById("lat").value;
  var reverse= document.getElementById("reverse").checked;
  var limit = document.getElementById("limit").value;
  var graphIdx = document.getElementById("graph").selectedIndex;
  var graph = document.getElementById("graph").options[graphIdx].value ;
  var methodIdx = document.getElementById("method").selectedIndex;
  var method = document.getElementById("method").options[methodIdx].value ;
  var resultDiv = document.getElementById("result");
  try {
    Gp.Services.isoCurve({
      position: {
        x: 5.497940,
        y: 45.331053
      },
    //  time: (method=="time" ? limit : null),
      distance: 10000,
     //(method=="distance" ? limit : null),
      holes: false,
      smoothing: true,
      graph: graph,
      reverse: reverse,
      apiKey: "i76efs3gomkp3pieg8qz0zif",
      onSuccess: function(result) {
        resultDiv.innerHTML = "<p>" + JSON.stringify(result) + "</p>" ;
        // affichage sur la carte
        L.geoJson(result.geometry).addTo(map);
      },
      onFailure: function(error) {
        resultDiv.innerHTML = "<p>" + error + "</p>"
      }
    });
  } catch (e) {
    resultDiv.innerHTML = "<p>" + e + "</p>"
  }
}
map = L.map("map").setView([45.331053, 5.497940], 10);
L.tileLayer(
  'https://wxs.ign.fr/i76efs3gomkp3pieg8qz0zif/geoportail/wmts?service=WMTS&request=GetTile&version=1.0.0&tilematrixset=PM&tilematrix={z}&tilecol={x}&tilerow={y}&layer=ORTHOIMAGERY.ORTHOPHOTOS&format=image/jpeg&style=normal', {
    minZoom: 0,
    maxZoom: 18,
    tileSize: 256
  }).addTo(map);
var infoDiv = document.getElementById("info");
infoDiv.innerHTML = "<p> Bibliothèque d'accès version " + Gp.servicesVersion + " (" + Gp.servicesDate + ")</p>";
