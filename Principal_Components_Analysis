var AOI = 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-6.144239049799758, 37.27557651596654],
          [-6.144239049799758, 37.07916868520456],
          [-5.800916295893508, 37.07916868520456],
          [-5.800916295893508, 37.27557651596654]]], null, false);
          
var startDate = ee.Date.fromYMD(2020,5,1);
var endDate = ee.Date.fromYMD(2020,5,7);

var collectionS2 = ee.ImageCollection("COPERNICUS/S2").filterDate(startDate,endDate).filterBounds(AOI);                  
var S2 = ee.Image(collectionS2.median()).clip(AOI).divide(10000);

Map.addLayer(S2, {min:0, max: 0.3, bands:"B4,B3,B2"}, 'S2');
Map.centerObject(AOI)

var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7','B8','B8A','B11','B12']



var img = S2.select(bands);

var bandNames = img.bandNames();

var getNewBandNames = function(prefix) {
  var seq = ee.List.sequence(1, bandNames.length());
  return seq.map(function(b) {
    return ee.String(prefix).cat(ee.Number(b).int());
  });
};


var getPrincipalComponents = function(centered, scale, region) {

  var arrays = centered.toArray();
  var covar = arrays.reduceRegion({
    reducer: ee.Reducer.centeredCovariance(),
    geometry: region,
    scale: scale,
    maxPixels: 1e9
  });
  
  var covarArray = ee.Array(covar.get('array'));
  var eigens = covarArray.eigen();
  var eigenValues = eigens.slice(1, 0, 1);
  var eigenVectors = eigens.slice(1, 1);
  var arrayImage = arrays.toArray(1);
  var principalComponents = ee.Image(eigenVectors).matrixMultiply(arrayImage);
  var sdImage = ee.Image(eigenValues.sqrt())
      .arrayProject([0]).arrayFlatten([getNewBandNames('sd')]);

  return principalComponents.arrayProject([0]).arrayFlatten([getNewBandNames('pc')]).divide(sdImage);
};
  
var pca = getPrincipalComponents(img,20,AOI)  

Map.addLayer(pca, {min:-2, max: 2, bands:"pc3,pc2,pc1"}, 'S2');

for (var i = 0; i < bandNames.length().getInfo(); i++) {
  var band = pca.bandNames().get(i).getInfo();
  Map.addLayer(pca.select([band]), {min: -2, max: 2}, band);
}
