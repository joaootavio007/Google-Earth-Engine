var AOI = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-48.575533977748535, -10.06146519705222],
          [-48.575533977748535, -10.377378941301345],
          [-48.14741050362744, -10.377378941301345],
          [-48.14741050362744, -10.06146519705222]]], null, false);

var L8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.filterDate('2019-07-15','2019-09-30')
.filterBounds(AOI);

var viz = {min:0,max:3000,bands:"B4,B3,B2"};


var img = ee.Image(L8.median()).clip(AOI);

Map.addLayer(img,viz,"Landsat 8 - Palmas/TO");
Map.centerObject(AOI)

var ndvi = img.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndviParams = {min: 0, max: 0.8, palette: ['red', 'yellow', 'green']};
Map.addLayer(ndvi, ndviParams, 'ndvi');


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


var Temperature = B10.expression(
'(TB/(1 + (0.00115* (TB / 1.438))*log(em)))-273.15', {
 'TB': B10.select('B10'),
'em': em.select('em')
}).rename('LST');
var vis = {min: 25, max:40, palette: ['white', 'yellow', 'orange', 'red', 'maroon', 'black']}
Map.addLayer(Temperature,vis,'LST');




function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}


var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});


var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});

var legendTitle = ui.Label({
  value: 'Land Surface Temperature (C°)',
  style: {fontWeight: 'bold'}
});


var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
Map.add(legendPanel);

