var AOI = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-54.74949092944635, -16.23279140099617],
          [-54.74949092944635, -16.430473134380698],
          [-54.3787023552276, -16.430473134380698],
          [-54.3787023552276, -16.23279140099617]]], null, false);

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

var L8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.filterDate('2018-1-1','2018-12-28')
.filterBounds(AOI)
.filter(ee.Filter.lt('CLOUD_COVER', 1));

print(L8)
var viz = {min:0,max:2000,bands:"B4,B3,B2"};

var img = ee.Image(L8.max()).clip(AOI);
Map.addLayer(img,viz,"Landsat 8 - Chapadão do Sul/MS");

var agrico = mapbiomas_2018.eq(19).or(mapbiomas_2018.eq(20))


var ndvi = img.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndviParams = {min: 0, max: 0.8, palette: ['red', 'yellow', 'green']};
Map.addLayer(ndvi, ndviParams, 'ndvi_max');

var B10 = img.select('B10').multiply(0.1);

var min = ee.Number(ndvi.reduceRegion({
reducer: ee.Reducer.min(),
geometry: AOI,
scale: 30,
maxPixels: 1e9
}).values().get(0));


var max = ee.Number(ndvi.reduceRegion({
  reducer: ee.Reducer.max(),
  geometry: AOI,
  scale: 30,
  maxPixels: 1e9
}).values().get(0));



var Pv =(ndvi.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('Pv'); 


var a= ee.Number(0.004);
var b= ee.Number(0.986);
var em=Pv.multiply(a).add(b).rename('em');


var LST = B10.expression(
'(TB/(1 + (0.00115* (TB / 1.438))*log(em)))', {
 'TB': B10.select('B10'),
 'em': em.select('em')
}).rename('LST');
var vis = {min: 293, max:320, palette: ['white', 'yellow', 'orange', 'red', 'maroon', 'black']}
Map.addLayer(LST ,vis,'LST_max');



// Parametrization --------------------------------------------------------------------------------

function collection_index(image) {
  
  function setNdviMinMax(img) {
    var minMax = img
    .select('NDVI')
    .reduceRegion({
      reducer: ee.Reducer.minMax(),
      scale: 30,
      maxPixels: 1e13
    });
  return img.set({
    'NDVI_min': minMax.get('NDVI_min'),
    'NDVI_max': minMax.get('NDVI_max'),
  });
  }  
  
  var ndvi_param = image.normalizedDifference(['B5', 'B4']);
  ndvi_param =  ndvi_param.rename('NDVI');
  var B10_param = image.select('B10').multiply(0.1).rename('B10');

  
  ndvi_param = setNdviMinMax(ndvi_param)
  var min_ndvi = ee.Image(ndvi_param.getNumber('NDVI_min')).toFloat();
  var max_ndvi = ee.Image(ndvi_param.getNumber('NDVI_max')).toFloat();

 
  var Pv_param =(ndvi_param.subtract(min_ndvi).divide(max_ndvi.subtract(min_ndvi))).pow(ee.Number(2)).rename('Pv'); 

  var a_param= ee.Number(0.004);
  var b_param= ee.Number(0.986);
  var em_param=Pv_param.multiply(a_param).add(b_param).rename('em');

  var LST_param = B10_param.expression(
  '(TB/(1 + (0.00115* (TB / 1.438))*log(em)))', {
   'TB': B10_param.select('B10'),
  'em': em_param.select('em')
  }).rename('LST');
  
  
  ndvi_param = ndvi_param.updateMask(agrico)
 
  return ndvi_param.addBands(LST_param) 
}

var coll = L8.map(collection_index)

print(coll)




//TOTRAM ----------------------------------------------------------------------

var LST_full_cover = coll.map(function(image){
  var full_cover = image.select('NDVI').gte(0.5);
  return image.select('LST').updateMask(full_cover)
})

var LST_bare_soil = coll.map(function(image){
  var bare_soil = image.select('NDVI').gte(0).and(image.select('NDVI').lte(0.2));
  return image.select('LST').updateMask(bare_soil)
})


var vw_tot = ee.Number(LST_full_cover.min().reduceRegion({
reducer: ee.Reducer.min(),
geometry: AOI,
scale: 30,
maxPixels: 1e9
}).values().get(0));

//print(vw_tot, 'vw_tot')

var vd_tot = ee.Number(LST_full_cover.max().reduceRegion({
  reducer: ee.Reducer.max(),
  geometry: AOI,
  scale: 30,
  maxPixels: 1e9
}).values().get(0));

//print(vd_tot, 'vd_tot')


var iw_tot = ee.Number(LST_bare_soil.min().reduceRegion({
reducer: ee.Reducer.min(),
geometry: AOI,
scale: 30,
maxPixels: 1e9
}).values().get(0));

//print(iw_tot,'iw_tot')


var id_tot = ee.Number(LST_bare_soil.max().reduceRegion({
  reducer: ee.Reducer.max(),
  geometry: AOI,
  scale: 30,
  maxPixels: 1e9
}).values().get(0));

//print(id_tot, 'id_tot')

var sd_tot = id_tot.subtract(vd_tot).multiply(-1)
//print(sd_tot, 'sd_tot')

var sw_tot = iw_tot.subtract(vw_tot).multiply(-1)
//print(sw_tot, 'sw_tot')

var TOTRAM  = LST.expression(
'(id + (sd * NDVI) - LST)/((id-iw) + ((sd-sw) * NDVI))', {
 'LST' : LST.select('LST'),
 'NDVI': ndvi.select('NDVI'),
 'id'  : id_tot,
 'sd'  : sd_tot,
 'iw'  : iw_tot,
 'sw'  : sw_tot
}).rename('TOTRAM')

var TOTRAMParams = {min: 0, max: 1, palette: ['red','orange','yellow','green','cyan','blue']};
Map.addLayer(TOTRAM, TOTRAMParams, 'TOTRAM');



