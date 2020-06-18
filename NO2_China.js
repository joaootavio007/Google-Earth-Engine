var China = ee.FeatureCollection("users/joaootavionf007/China");

var text = require('users/gena/packages:text')

var collection = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('NO2_column_number_density')
  .filterBounds(China);


var week1 = collection.filterDate('2019-12-02', '2019-12-06').reduce(ee.Reducer.mean()).clip(China).set('system:time_start', '2019-12-02').set('system:time_end', '2019-12-06')
var week2 = collection.filterDate('2019-12-09', '2019-12-13').reduce(ee.Reducer.mean()).clip(China).set('system:time_start', '2019-12-09').set('system:time_end', '2019-12-13')
var week3 = collection.filterDate('2019-12-16', '2019-12-20').reduce(ee.Reducer.mean()).clip(China).set('system:time_start', '2019-12-16').set('system:time_end', '2019-12-20')
var week4 = collection.filterDate('2019-12-23', '2019-12-27').reduce(ee.Reducer.mean()).clip(China).set('system:time_start', '2019-12-23').set('system:time_end', '2019-12-27')
var week5 = collection.filterDate('2019-12-30', '2020-01-03').reduce(ee.Reducer.mean()).clip(China).set('system:time_start', '2019-12-30').set('system:time_end', '2020-01-03')
var week6 = collection.filterDate('2020-01-06', '2020-01-10').reduce(ee.Reducer.mean()).clip(China).set('system:time_start', '2020-01-06').set('system:time_end', '2020-01-10')
var week7 = collection.filterDate('2020-01-13', '2020-01-17').reduce(ee.Reducer.mean()).clip(China).set('system:time_start', '2020-01-13').set('system:time_end', '2020-01-17')
var week8 = collection.filterDate('2020-01-20', '2020-01-24').reduce(ee.Reducer.mean()).clip(China).set('system:time_start', '2020-01-20').set('system:time_end', '2020-01-24')
var week9 = collection.filterDate('2020-01-27', '2020-01-31').reduce(ee.Reducer.mean()).clip(China).set('system:time_start', '2020-01-27').set('system:time_end', '2020-01-31')
var week10 = collection.filterDate('2020-02-03', '2020-02-07').reduce(ee.Reducer.mean()).clip(China).set('system:time_start', '2020-02-03').set('system:time_end', '2020-02-07')
var week11 = collection.filterDate('2020-02-10', '2020-02-14').reduce(ee.Reducer.mean()).clip(China).set('system:time_start', '2020-02-10').set('system:time_end', '2020-02-14')
var week12 = collection.filterDate('2020-02-17', '2020-02-21').reduce(ee.Reducer.mean()).clip(China).set('system:time_start', '2020-02-17').set('system:time_end', '2020-02-21')
var week13 = collection.filterDate('2020-02-24', '2020-02-28').reduce(ee.Reducer.mean()).clip(China).set('system:time_start', '2020-02-24').set('system:time_end', '2020-02-28')
var week14 = collection.filterDate('2020-03-02', '2020-03-06').reduce(ee.Reducer.mean()).clip(China).set('system:time_start', '2020-03-02').set('system:time_end', '2020-03-06')


var band_viz = {
  min: 0,
  max: 0.0004,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

var centre = China.geometry().centroid();


Map.addLayer(week1, band_viz, 'N02 12/02/2019 - 12/06/2019');
Map.addLayer(week3, band_viz, 'N02 12/16/2019 - 12/20/2019');
Map.addLayer(week6, band_viz, 'N02 01/06/2020 - 01/10/2020');
Map.addLayer(week9, band_viz, 'N02 01/27/2020 - 01/31/2020');
Map.addLayer(week12, band_viz, 'N02 02/17/2020 - 02/21/2020');
Map.addLayer(week14, band_viz, 'N02 03/02/2020 - 03/06/2020');
Map.setCenter(ee.Number(centre.coordinates().get(0)).getInfo(), 
              ee.Number(centre.coordinates().get(1)).getInfo(), 4);
              
              

var collectionFromImages = ee.ImageCollection.fromImages(
  [week1, week2, week3, week4, week5, week6, week7, week8, week9, week10, week11, week12, week13, week14]);


var NO_video =  collectionFromImages.map(function(image){
  var start = ee.Date(image.get('system:time_start'))
  var end = ee.Date(image.get('system:time_end'))
  var label = start.format('YYYY-MM-dd').cat(' - ').cat(end.format('YYYY-MM-dd'))
  return image.visualize({
    forceRgbOutput: true,
    palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
    min: 0,
    max: 0.0004
  }).set({label: label});
});

var annotations = [
  {
    position: 'left', 
    offset: '1%',
    margin: '1%', 
    property: 'label', 
    scale: Map.getScale() * 1
  }
]

NO_video = NO_video.map(function(image) {
  return text.annotateImage(image, {}, China.geometry(), annotations)
})

  
  Export.video.toDrive({
  collection: NO_video,
  description: 'China_NO2_emission',
  dimensions: 360,
  framesPerSecond: 2,
  region: China.geometry()
});

