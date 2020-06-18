var TL = 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-51.82881158831856, -20.666937492714013],
                  [-51.82881158831856, -20.9352468637325],
                  [-51.56101984027168, -20.9352468637325],
                  [-51.56101984027168, -20.666937492714013]]], null, false),
            {
              "system:index": "0"
            })]);
            
var startDate = ee.Date.fromYMD(2020,1,1);
var endDate = ee.Date.fromYMD(2020,1,30);

var S2 = ee.ImageCollection("COPERNICUS/S2").filterDate(startDate,endDate).filterBounds(TL)

var img = ee.Image(S2.median()).clip(TL);

var viz = {min:0,max:4000,bands:"B4,B3,B2"};
Map.addLayer(img,viz,"True Color");


var viz = {min:0,max:4000,bands:"B8,B5,B4"};
Map.addLayer(img,viz,"RGB(8,5,4)");

var viz = {min:0,max:4000,bands:"B11,B8,B2"};
Map.addLayer(img,viz,"Agriculture)");

var viz = {min:0,max:4000,bands:"B8,B6,B4"};
Map.addLayer(img,viz,"RGB(8,6,4)");

var viz = {min:0,max:4000,bands:"B8,B4,B3"};
Map.addLayer(img,viz,"False Color");
  
