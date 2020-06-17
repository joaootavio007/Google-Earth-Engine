var EGY = ee.FeatureCollection("users/joaootavionf007/Egypt");



var collectionEGY = ee.ImageCollection("WorldPop/GP/100m/pop").filterDate('2019').filter(ee.Filter.inList('country', ['EGY']))
var PopEGY = collectionEGY.select('population');

var nightlights = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG').filter(ee.Filter.date('2019-12-01', '2019-12-31'))
var nightEGY = nightlights.select('avg_rad').mean().clip(EGY);




var Vispop = {min: 0.0,max: 50.0,palette: ['24126c', '1fff4f', 'd4ff50']};
Map.addLayer(PopEGY, Vispop, 'Population');

var Visnig = {min: 0.0, max: 60.0};
Map.addLayer(nightEGY, Visnig, 'Nighttime');


var startDate = ee.Date.fromYMD(2019,1,1);
var endDate = ee.Date.fromYMD(2019,5,30);

var EGY_s2 = ee.ImageCollection("COPERNICUS/S2").filterDate(startDate,endDate).filterBounds(EGY)

var img_EGY = ee.Image(EGY_s2.median()).clip(EGY);

var viz_s2 = {min:0,max:3000,bands:"B4,B3,B2"};
Map.addLayer(img_EGY,viz_s2,"True Color");
