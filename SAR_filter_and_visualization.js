var AOI = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-54.795603064312104, -19.243613348674195],
          [-54.795603064312104, -19.57325442595859],
          [-54.38567569614804, -19.57325442595859],
          [-54.38567569614804, -19.243613348674195]]], null, false);
          
          
var startDate = ee.Date.fromYMD(2020,3,5);
var endDate = ee.Date.fromYMD(2020,3,10);

var collectionVV = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filterBounds(AOI)
    .filterDate(startDate,endDate)
    .select(['VV']);

var collectionVH = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filterBounds(AOI)
    .filterDate(startDate,endDate)
    .select(['VH']);

var collectionS2 = ee.ImageCollection("COPERNICUS/S2").filterDate(startDate,endDate).filterBounds(AOI);

var S2 = ee.Image(collectionS2.median()).clip(AOI);
var VV = ee.Image(collectionVV.median()).clip(AOI);
var VH = ee.Image(collectionVH.median()).clip(AOI);

function eds(image) {

  var dir1 = ee.List([[0, 0, 0], [0.5, 0, 0.5], [0, 0, 0]]);
  var dir2 = ee.List([[0, 0.5, 0], [0, 0, 0], [0, 0.5, 0]]);
  var dir3 = ee.List([[0, 0, 0.5], [0, 0, 0], [0.5, 0, 0]]);
  var dir4 = ee.List([[0.5, 0, 0], [0, 0, 0], [0, 0, 0.5]]);

  var d1 = image.convolve(ee.Kernel.fixed(3, 3, dir1, -1, -1));
  var d2 = image.convolve(ee.Kernel.fixed(3, 3, dir2, -1, -1));
  var d3 = image.convolve(ee.Kernel.fixed(3, 3, dir3, -1, -1));
  var d4 = image.convolve(ee.Kernel.fixed(3, 3, dir4, -1, -1));

  var D1=(d1.subtract(image)).abs();
  var D2=(d2.subtract(image)).abs();
  var D3=(d3.subtract(image)).abs();
  var D4=(d4.subtract(image)).abs();

  var Dd=ee.ImageCollection([[D1,d1],[D2,d2],[D3,d3],[D4,d4]]);
  var reducer =ee.Reducer.min(2);

  var v = Dd.reduce(reducer).select('min1');
  return v;
}

var image_VV = eds(VV).rename('VV');
var image_VH = eds(VH).rename('VH');

var Ratio = VV.select('VV').divide(VH.select('VH')).rename('Ratio')
var image_Ratio = eds(Ratio).rename('Ratio');
var RGB = image_VV.addBands(image_VH.select('VH')).addBands(image_Ratio.select('Ratio'))

Map.addLayer(RGB, {min: [-25,-30,0.2], max: [3,-2,1],gamma: 0.6}, 'RGB');
Map.addLayer(Ratio, {min: 0.2, max: 1, gamma: 0.6}, 'Ratio');
Map.addLayer(VH, {min: -20, max: -7}, 'VH');
Map.addLayer(VV, {min: -20, max: -7}, 'VV');
Map.addLayer(S2, {min:0, max: 2000, bands:"B4,B3,B2"}, 'S2');
    
