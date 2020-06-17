var AOI = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[3.9357526647546814, 52.02122547659193],
          [3.9357526647546814, 51.76570722124201],
          [4.611068521688275, 51.76570722124201],
          [4.611068521688275, 52.02122547659193]]], null, false);
          
          
          
          
var startDate = ee.Date.fromYMD(2019,4,1);
var endDate = ee.Date.fromYMD(2019,4,27);

var S2 = ee.ImageCollection("COPERNICUS/S2").filterDate(startDate,endDate).filterBounds(AOI).filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 0.1)
var img = ee.Image(S2.median()).clip(AOI);


var viz = {min:0,max:3000,bands:"B4,B3,B2"};
Map.addLayer(img,viz,"True Color Netherlands 2019");



var ndwi1 = img.expression(
    '(NIR - MIR) / (NIR + MIR)', {
      'NIR': img.select('B8'),
      'MIR': img.select('B11')
}).rename('NDWI');

var ndwi2 = img.expression(
    '(GREEN - NIR) / (GREEN + NIR)', {
      'GREEN': img.select('B3'),
      'NIR': img.select('B8')
}).rename('NDWI');

var ndwiParams = {min: -1, max: 1, palette: ['purple', 'cyan', 'blue', 'black']};
Map.addLayer(ndwi1, ndwiParams, 'NDWI Gao');
Map.addLayer(ndwi2, ndwiParams, 'NDWI McFeeters');


var im1 = ndwi1.select('NDWI')
var water1 = im1.gt(0.35).rename('Water')
water1 = water1.updateMask(water1) 
 
var im2 = ndwi2.select('NDWI')
var water2 = im2.gt(0).rename('Water')
water2 = water2.updateMask(water2)  
 
var visParamsWater = {
      min: 0,
      max: 1,
      palette: ['#FFFFFF','#0000FF']
    }


Map.addLayer(water1,visParamsWater,'Mask Water Gao')
Map.addLayer(water2,visParamsWater,'Mask Water McFeeters')



      
