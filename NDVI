var EGIPTY = 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[32.51287972549637, 25.76450142246131],
                  [32.51287972549637, 25.63333152694949],
                  [32.65020882705887, 25.63333152694949],
                  [32.65020882705887, 25.76450142246131]]], null, false),
            {
              "system:index": "0"
            })]);
            
            
var startDate = ee.Date.fromYMD(2020,1,1);
var endDate = ee.Date.fromYMD(2020,1,30);

var S2 = ee.ImageCollection("COPERNICUS/S2").filterDate(startDate,endDate).filterBounds(EGIPTY)

var img = ee.Image(S2.median()).clip(EGIPTY);

//NDVI - ((B8 - B4) / (B8 + B4))

var nir = img.select('B8');
var red = img.select('B4');
var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVI');

//or

var ndvi2 = img.expression(
    '((NIR - RED) / (NIR + RED))', {
      'NIR': img.select('B8'),
      'RED': img.select('B4')
}).rename('NDVI');

//or

var ndvi3 = img.normalizedDifference(['B8','B4']);

//display layer

var ndviParams = {min: -0.2, max: 0.8, palette: ['red', 'yellow', 'green']};
Map.addLayer(ndvi, ndviParams, 'NDVI');

var viz = {min:0,max:3000,bands:"B4,B3,B2"};
Map.addLayer(img,viz,"True Color");
            
