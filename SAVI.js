var AOI = 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[37.739874227073486, 30.684763027808177],
          [37.739874227073486, 29.50614372431096],
          [40.189825398948486, 29.50614372431096],
          [40.189825398948486, 30.684763027808177]]], null, false),
    AOI2 = 
    /* color: #0b4a8b */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-100.95961186326416, 37.97210607844035],
          [-100.95961186326416, 37.61996931482217],
          [-100.56959721482666, 37.61996931482217],
          [-100.56959721482666, 37.97210607844035]]], null, false);
          
var startDate = ee.Date.fromYMD(2019,5,15);
var endDate = ee.Date.fromYMD(2019,6,29);


var S2_1 = ee.ImageCollection("COPERNICUS/S2").filterDate(startDate,endDate).filterBounds(AOI)
var img1 = ee.Image(S2_1.median()).clip(AOI);

var S2_2 = ee.ImageCollection("COPERNICUS/S2").filterDate(startDate,endDate).filterBounds(AOI2)
var img2 = ee.Image(S2_2.median()).clip(AOI2);

var viz = {min:0,max:3000,bands:"B4,B3,B2"};
Map.addLayer(img1,viz,"True Color SDA");

Map.addLayer(img2,viz,"True Color USA");

var ndvi1 = img1.expression(
    '((NIR - RED) / (NIR + RED))', {
      'NIR': img1.select('B8'),
      'RED': img1.select('B4')
}).rename('NDVI');

var savi1 = img1.expression(
    '((NIR - RED) / (NIR + RED + 1) * (1.0 + 1))', {
      'NIR': img1.select('B8'),
      'RED': img1.select('B4')
}).rename('SAVI');

var ndvi2 = img2.expression(
    '((NIR - RED) / (NIR + RED))', {
      'NIR': img2.select('B8'),
      'RED': img2.select('B4')
}).rename('NDVI');

var savi2 = img2.expression(
    '((NIR - RED) / (NIR + RED + 0.5) * (1.0 + 0.5))', {
      'NIR': img2.select('B8'),
      'RED': img2.select('B4')
}).rename('SAVI');


var saviParams = {min: -0.2, max: 0.8, palette: ['red', 'yellow', 'green']};
Map.addLayer(savi1, saviParams, 'SAVI SDA');
Map.addLayer(savi2, saviParams, 'SAVI USA');

var ndviParams = {min: -0.2, max: 0.8, palette: ['red', 'yellow', 'green']};
Map.addLayer(ndvi1, ndviParams, 'NDVI SDA');
Map.addLayer(ndvi2, ndviParams, 'NDVI USA');          
