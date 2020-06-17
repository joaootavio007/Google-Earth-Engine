var AOI = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-54.80038211310513, -19.129596649022307],
          [-54.80038211310513, -19.38564500951829],
          [-54.41380069220669, -19.38564500951829],
          [-54.41380069220669, -19.129596649022307]]], null, false);
          
var mapbiomas = ee.Image('projects/mapbiomas-workspace/public/collection4_1/mapbiomas_collection41_integration_v1')
var mapbiomas_2018 =  mapbiomas.select('classification_2018')
mapbiomas_2018 = mapbiomas_2018.clip(AOI)

var palettes = require('users/gena/packages:palettes');
var vis_mapbiomas = {min: 3, max: 33,
palette: palettes.colorbrewer.Paired[12]
}
Map.centerObject(AOI)
Map.addLayer(mapbiomas_2018,vis_mapbiomas,"Mapbiomas 2018");
print(mapbiomas_2018)

var agrico = mapbiomas_2018.eq(19).or(mapbiomas_2018.eq(20))


// OPTRAM FROM COLLECTION ---------------------------------------------------

var startDate = ee.Date.fromYMD(2019,1,1);
var endDate = ee.Date.fromYMD(2019,12,30);

var S2 = ee.ImageCollection("COPERNICUS/S2").filterDate(startDate,endDate).filterBounds(AOI).filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 0.1);                  

var img = ee.Image(S2.median()).clip(AOI).divide(10000);
Map.addLayer(img, {min:0, max: 0.2, bands:"B4,B3,B2"}, 'S2');
Map.centerObject(AOI)

var SWIR = img.select('B12').rename('SWIR')

var STR = SWIR.expression(
  '((1-SWIR)**2)/(2*SWIR)',{
    'SWIR' : SWIR.select('SWIR'),
  }).rename('STR')

var NDVI = img.normalizedDifference(['B8', 'B4']).rename('NDVI');
  
var ndviParams = {min: 0, max: 0.8, palette: ['red', 'yellow', 'green']};
Map.addLayer(NDVI, ndviParams, 'ndvi');



// Parametrization --------------------------------------------------------------------------------

function collection_index(image) {
  
  function setNdviMinMax(img) {
    var minMax = img
    .select('NDVI')
    .reduceRegion({
      reducer: ee.Reducer.minMax(),
      scale: 20,
      maxPixels: 1e13
    });
  return img.set({
    'NDVI_min': minMax.get('NDVI_min'),
    'NDVI_max': minMax.get('NDVI_max'),
  });
  }  
  
  var ndvi_param = image.normalizedDifference(['B8', 'B4']);
  ndvi_param =  ndvi_param.rename('NDVI');
  var SWIR_param = image.select('B12').rename('SWIR').divide(10000);
  var STR_param = SWIR_param.expression(
  '((1-SWIR)**2)/(2*SWIR)',{
    'SWIR' : SWIR.select('SWIR'),
  }).rename('STR')
  
  ndvi_param = setNdviMinMax(ndvi_param)
  
  
  ndvi_param = ndvi_param.updateMask(agrico)
 
  return ndvi_param.addBands(STR_param) 
}

var coll = S2.map(collection_index)

print(coll)

//OPTRAM --------------------------------------------------------------------------------


var STR_full_cover = coll.map(function(image){
  var full_cover = image.select('NDVI').gte(0.5);
  return image.select('STR').updateMask(full_cover)
})

var STR_bare_soil = coll.map(function(image){
  var bare_soil = image.select('NDVI').gte(0).and(image.select('NDVI').lte(0.2));
  return image.select('STR').updateMask(bare_soil)
})


var vw_opt = ee.Number(STR_full_cover.max().reduceRegion({
reducer: ee.Reducer.max(),
geometry: AOI,
scale: 20,
maxPixels: 1e9
}).values().get(0));

print(vw_opt, 'vw_opt')

var vd_opt = ee.Number(STR_full_cover.min().reduceRegion({
  reducer: ee.Reducer.min(),
  geometry: AOI,
  scale: 20,
  maxPixels: 1e9
}).values().get(0));

print(vd_opt, 'vd_opt')


var iw_opt = ee.Number(STR_bare_soil.max().reduceRegion({
reducer: ee.Reducer.max(),
geometry: AOI,
scale: 20,
maxPixels: 1e9
}).values().get(0));

print(iw_opt,'iw_opt')


var id_opt = ee.Number(STR_bare_soil.min().reduceRegion({
  reducer: ee.Reducer.min(),
  geometry: AOI,
  scale: 20,
  maxPixels: 1e9
}).values().get(0));

print(id_opt, 'id_opt')

var sd_opt = vd_opt.subtract(id_opt)
print(sd_opt, 'sd_opt')

var sw_opt = vw_opt.subtract(iw_opt)
print(sw_opt, 'sw_opt')


// visualize OPTRAM ------------------------------------------------------------------------------------

var OPTRAM  = STR.expression(
'(id + (sd * NDVI) - STR)/((id-iw) + ((sd-sw) * NDVI))', {
 'STR' : STR.select('STR'),
 'NDVI': NDVI.select('NDVI'),
 'id'  : id_opt,
 'sd'  : sd_opt,
 'iw'  : iw_opt,
 'sw'  : sw_opt
}).rename('OPTRAM')

var OPTRAMParams = {min: 0, max: 0.3, palette: ['red','orange','yellow','green','cyan','blue']};
Map.addLayer(OPTRAM, OPTRAMParams, 'OPTRAM');

