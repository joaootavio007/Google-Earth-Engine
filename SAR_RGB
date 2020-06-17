var AOI = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[30.784832349749557, 31.55092417369537],
          [30.784832349749557, 31.276676333019722],
          [31.299816480608932, 31.276676333019722],
          [31.299816480608932, 31.55092417369537]]], null, false);
          
          
          
var startDate1 = ee.Date.fromYMD(2019,4,1);
var endDate1 = ee.Date.fromYMD(2019,4,27);

var startDate2 = ee.Date.fromYMD(2019,6,1);
var endDate2 = ee.Date.fromYMD(2019,6,27);

var startDate3 = ee.Date.fromYMD(2019,8,1);
var endDate3 = ee.Date.fromYMD(2019,8,27);

var S2 = ee.ImageCollection("COPERNICUS/S2").filterDate(startDate1,endDate1).filterBounds(AOI).filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 0.1)
var img = ee.Image(S2.median()).clip(AOI).divide(10000);


var viz = {min:0,max:0.3,bands:"B4,B3,B2"};
Map.addLayer(img,viz,"True Color Delta Nile 2019");


var collectionVV1 = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filterBounds(AOI)
    .filterDate(startDate1,endDate1)
    .select(['VV']);


var collectionVV2 = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filterBounds(AOI)
    .filterDate(startDate2,endDate2)
    .select(['VV']);


var collectionVV3 = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filterBounds(AOI)
    .filterDate(startDate3,endDate3)
    .select(['VV']);



var VV1 = ee.Image(collectionVV1.median()).clip(AOI);
var VV2 = ee.Image(collectionVV2.median()).clip(AOI);
var VV3 = ee.Image(collectionVV3.median()).clip(AOI);


var RGBVV = VV1.addBands(VV2).addBands(VV3)


Map.addLayer(RGBVV, {min: -25, max: 5}, 'RGB VV');


var collectionVH1 = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filterBounds(AOI)
    .filterDate(startDate1,endDate1)
    .select(['VH']);


var collectionVH2 = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filterBounds(AOI)
    .filterDate(startDate2,endDate2)
    .select(['VH']);


var collectionVH3 = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filterBounds(AOI)
    .filterDate(startDate3,endDate3)
    .select(['VH']);



var VH1 = ee.Image(collectionVH1.median()).clip(AOI);
var VH2 = ee.Image(collectionVH2.median()).clip(AOI);
var VH3 = ee.Image(collectionVH3.median()).clip(AOI);


var RGBVH = VH1.addBands(VH2).addBands(VH3)


Map.addLayer(RGBVH, {min: -25, max: 5}, 'RGB VH');

          
