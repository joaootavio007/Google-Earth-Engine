var AOI = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[35.317130309839754, 36.965876643046066],
          [35.317130309839754, 36.561018891032845],
          [36.001029235621004, 36.561018891032845],
          [36.001029235621004, 36.965876643046066]]], null, false);

var coefficients = ee.Array([
  [0.3037  , 0.2793   , 0.4743   , 0.5585 ,0.5082  , 0.1863],  //brightness
  [-0.2848 , - 0.2435 , - 0.5436 , 0.7243 , 0.084  , 0.18  ],  //greenness
  [0.1509  , 0.1973   , 0.3279   , 0.3406 , 0.7112 , 0.4572]])  //wetness
  
  
var startDate = ee.Date.fromYMD(2020,4,1);
var endDate = ee.Date.fromYMD(2020,4,30);

var S2 = ee.ImageCollection("COPERNICUS/S2").filterDate(startDate,endDate).filterBounds(AOI).filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 0.1)
var img = ee.Image(S2.median()).clip(AOI).divide(10000);

var viz = {min:0,max:0.2,bands:"B4,B3,B2"};

Map.addLayer(img,viz,"AOI");


var img_TSC = img.select(['B2', 'B3', 'B4', 'B8', 'B11', 'B12']);

var arrayImage1D = img_TSC.toArray();
var arrayImage2D = arrayImage1D.toArray(1);


var componentsImage = ee.Image(coefficients)
  .matrixMultiply(arrayImage2D)
  .arrayProject([0])
  .arrayFlatten(
    [['brightness', 'greenness', 'wetness']]);
    
var vizParams = {
  bands: ['brightness', 'greenness', 'wetness'],
  min: 0, max: [0.5, 0.1, 0.1]
};
Map.centerObject(AOI);
Map.addLayer(componentsImage, vizParams, 'components');
    

