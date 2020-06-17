var AOI = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-56.28764094812431, -11.55065531003219],
          [-56.28764094812431, -12.527066920068402],
          [-54.95142878992119, -12.527066920068402],
          [-54.95142878992119, -11.55065531003219]]], null, false);

var startDate = ee.Date.fromYMD(2017,1,1);
var endDate = ee.Date.fromYMD(2017,12,31);

var collectionAlos = ee.ImageCollection('JAXA/ALOS/PALSAR/YEARLY/SAR')
                  .filter(ee.Filter.date(startDate,endDate))
                  .filterBounds(AOI);

var collectionS2 = ee.ImageCollection("COPERNICUS/S2").filterDate(startDate,endDate).filterBounds(AOI);                  
var S2 = ee.Image(collectionS2.median()).clip(AOI);                  

var HH = collectionAlos.select('HH').median().clip(AOI);
var HV = collectionAlos.select('HV').median().clip(AOI);



var rvi = HV.subtract(4).divide(HH.add(HV)).rename('RVI');

var sarHhVis = {
  min: 0.0,
  max: 10000.0
}

var rviVis = {min: 0.1, max: 0.4, palette: ['red', 'yellow', 'green']};

Map.addLayer(HH, sarHhVis, 'SAR HH');
Map.addLayer(HV, sarHhVis, 'SAR HV');
Map.addLayer(rvi, rviVis, 'SAR RVI');
Map.addLayer(S2, {min:0, max: 2000, bands:"B4,B3,B2"}, 'S2');
