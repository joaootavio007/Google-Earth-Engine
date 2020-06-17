var AOI = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-53.01263806980192, -18.535806828643242],
          [-53.01263806980192, -18.94578255938212],
          [-52.33526227634489, -18.94578255938212],
          [-52.33526227634489, -18.535806828643242]]], null, false);

var startDate = ee.Date.fromYMD(2020,3,5);
var endDate = ee.Date.fromYMD(2020,3,10);

var collectionVV = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filterBounds(AOI)
    .filterDate(startDate,endDate)
    .select(['VV']);
    
print(collectionVV)

var collectionVH = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filterBounds(AOI)
    .filterDate(startDate,endDate)
    .select(['VH']);

var collectionS2 = ee.ImageCollection("COPERNICUS/S2").filterDate(startDate,endDate).filterBounds(AOI);



function toNatural(img) {
return ee.Image(10.0).pow(img.select(0).divide(10.0));
}
function toDB(img) {
return ee.Image(img).log10().multiply(10.0);
}
 
 
function RefinedLee(img) {

var myimg = toNatural(img);
 
var weights3 = ee.List.repeat(ee.List.repeat(1,3),3);
var kernel3 = ee.Kernel.fixed(3,3, weights3, 1, 1, false);
 
var mean3 = myimg.reduceNeighborhood(ee.Reducer.mean(), kernel3);
var variance3 = myimg.reduceNeighborhood(ee.Reducer.variance(), kernel3);
 

var sample_weights = ee.List([[0,0,0,0,0,0,0], [0,1,0,1,0,1,0],[0,0,0,0,0,0,0], [0,1,0,1,0,1,0], [0,0,0,0,0,0,0], [0,1,0,1,0,1,0],[0,0,0,0,0,0,0]]);
 
var sample_kernel = ee.Kernel.fixed(7,7, sample_weights, 3,3, false);
 
var sample_mean = mean3.neighborhoodToBands(sample_kernel);
var sample_var = variance3.neighborhoodToBands(sample_kernel);
 
var gradients = sample_mean.select(1).subtract(sample_mean.select(7)).abs();
gradients = gradients.addBands(sample_mean.select(6).subtract(sample_mean.select(2)).abs());
gradients = gradients.addBands(sample_mean.select(3).subtract(sample_mean.select(5)).abs());
gradients = gradients.addBands(sample_mean.select(0).subtract(sample_mean.select(8)).abs());
 
var max_gradient = gradients.reduce(ee.Reducer.max());
 
var gradmask = gradients.eq(max_gradient);
 
gradmask = gradmask.addBands(gradmask);
 
var directions = sample_mean.select(1).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(7))).multiply(1);
directions = directions.addBands(sample_mean.select(6).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(2))).multiply(2));
directions = directions.addBands(sample_mean.select(3).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(5))).multiply(3));
directions = directions.addBands(sample_mean.select(0).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(8))).multiply(4));

directions = directions.addBands(directions.select(0).not().multiply(5));
directions = directions.addBands(directions.select(1).not().multiply(6));
directions = directions.addBands(directions.select(2).not().multiply(7));
directions = directions.addBands(directions.select(3).not().multiply(8));
 

directions = directions.updateMask(gradmask);
 
directions = directions.reduce(ee.Reducer.sum());
 
var sample_stats = sample_var.divide(sample_mean.multiply(sample_mean));
 
var sigmaV = sample_stats.toArray().arraySort().arraySlice(0,0,5).arrayReduce(ee.Reducer.mean(), [0]);
 
var rect_weights = ee.List.repeat(ee.List.repeat(0,7),3).cat(ee.List.repeat(ee.List.repeat(1,7),4));
 
var diag_weights = ee.List([[1,0,0,0,0,0,0], [1,1,0,0,0,0,0], [1,1,1,0,0,0,0],
[1,1,1,1,0,0,0], [1,1,1,1,1,0,0], [1,1,1,1,1,1,0], [1,1,1,1,1,1,1]]);
 
var rect_kernel = ee.Kernel.fixed(7,7, rect_weights, 3, 3, false);
var diag_kernel = ee.Kernel.fixed(7,7, diag_weights, 3, 3, false);
 

var dir_mean = myimg.reduceNeighborhood(ee.Reducer.mean(), rect_kernel).updateMask(directions.eq(1));
var dir_var = myimg.reduceNeighborhood(ee.Reducer.variance(), rect_kernel).updateMask(directions.eq(1));
 
dir_mean = dir_mean.addBands(myimg.reduceNeighborhood(ee.Reducer.mean(), diag_kernel).updateMask(directions.eq(2)));
dir_var = dir_var.addBands(myimg.reduceNeighborhood(ee.Reducer.variance(), diag_kernel).updateMask(directions.eq(2)));
 
for (var i=1; i<4; i++) {
dir_mean = dir_mean.addBands(myimg.reduceNeighborhood(ee.Reducer.mean(), rect_kernel.rotate(i)).updateMask(directions.eq(2*i+1)));
dir_var = dir_var.addBands(myimg.reduceNeighborhood(ee.Reducer.variance(), rect_kernel.rotate(i)).updateMask(directions.eq(2*i+1)));
dir_mean = dir_mean.addBands(myimg.reduceNeighborhood(ee.Reducer.mean(), diag_kernel.rotate(i)).updateMask(directions.eq(2*i+2)));
dir_var = dir_var.addBands(myimg.reduceNeighborhood(ee.Reducer.variance(), diag_kernel.rotate(i)).updateMask(directions.eq(2*i+2)));
}
 
dir_mean = dir_mean.reduce(ee.Reducer.sum());
dir_var = dir_var.reduce(ee.Reducer.sum());
 
var varX = dir_var.subtract(dir_mean.multiply(dir_mean).multiply(sigmaV)).divide(sigmaV.add(1.0));
 
var b = varX.divide(dir_var);
 
var result = dir_mean.add(b.multiply(myimg.subtract(dir_mean)));

return(img.addBands(ee.Image(toDB(result.arrayGet(0))).rename("filter")));
}


var collectionVH = collectionVH.map(RefinedLee);
var collectionVV = collectionVV.map(RefinedLee);

var S2 = ee.Image(collectionS2.median()).clip(AOI);
var VV = ee.Image(ee.ImageCollection(collectionVV.select("filter")).median()).clip(AOI);
var VH = ee.Image(ee.ImageCollection(collectionVH.select("filter")).median()).clip(AOI);



var ndvi = S2.expression(
    '((NIR - RED) / (NIR + RED))', {
      'NIR': S2.select('B8'),
      'RED': S2.select('B4')
}).rename('NDVI');


var nrpb = VH.subtract(VV).divide(VH.add(VV)).rename('NRPB');

Map.addLayer(VH, {min: -20, max: -7}, 'VH');
Map.addLayer(VV, {min: -20, max: -7}, 'VV');
Map.addLayer(S2, {min:0, max: 2000, bands:"B4,B3,B2"}, 'S2');
var ndviParams = {min: 0, max: 1, palette: ['red', 'yellow', 'green']};
var nrpbParams = {min: 0.1, max: 0.4, palette: ['red', 'yellow', 'green']};
Map.addLayer(ndvi, ndviParams, 'NDVI');
Map.addLayer(nrpb, nrpbParams, 'NRPB');
