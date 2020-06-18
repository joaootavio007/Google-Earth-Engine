var AOI = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-112.76180653486738, 33.46339832031827],
          [-112.76180653486738, 33.251193890839986],
          [-112.37556843672284, 33.251193890839986],
          [-112.37556843672284, 33.46339832031827]]], null, false),
    water = 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-112.57610605840792, 33.345643982898835],
          [-112.57580565099825, 33.34682703077755],
          [-112.58074091558565, 33.34747232284535],
          [-112.58117006902803, 33.34589493379206]]]),
    veg = 
    /* color: #0b4a8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-112.4972705710422, 33.38610942628233],
          [-112.49744223241915, 33.387614420663766],
          [-112.50284956579317, 33.38768608641299],
          [-112.50284956579317, 33.385679423102346]]]),
    soil = 
    /* color: #ffc82d */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-112.64987753515352, 33.44578755077313],
          [-112.6485042441379, 33.45237613683407],
          [-112.65365408544649, 33.453450315366965],
          [-112.65468405370821, 33.44657534284125]]]);



var startDate = ee.Date.fromYMD(2019,4,1);
var endDate = ee.Date.fromYMD(2019,11,1);

var img = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA").filterDate(startDate,endDate).filterBounds(AOI).sort('CLOUD_COVER').first();
var img = ee.Image(img.clip(AOI));

var viz = {min:0,max:0.4,bands:"B5,B6,B4"};
Map.addLayer(img,viz,"RGB 564");
Map.centerObject(AOI)

img = img.select(['B2','B3','B4','B5','B6','B7'])



var veget = img.reduceRegion({reducer: ee.Reducer.mean(),
                            geometry:veg, 
                            scale: 30, 
                            maxPixels: 1e8});
var veg_val = veget.values();


var wat = img.reduceRegion({reducer: ee.Reducer.mean(),
                            geometry:water, 
                            scale: 30, 
                            maxPixels: 1e8});
var water_val = wat.values();
 

var sol = img.reduceRegion({reducer: ee.Reducer.mean(),
                            geometry:soil, 
                            scale: 30, 
                            maxPixels: 1e8});
var soil_val = sol.values();

var fra_veg = img.unmix([soil_val,veg_val,water_val]);



Map.addLayer(fra_veg, {bands:'band_0'}, 'Fract Vegetation');
Map.addLayer(fra_veg, {bands:'band_1'}, 'Fract Soil');
Map.addLayer(fra_veg, {bands:'band_2'}, 'Fract Water');

Map.addLayer(fra_veg, {}, 'RGB unmixed Soi/Veg/Wat');
