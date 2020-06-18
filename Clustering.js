var AOI = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[28.810475806993974, 30.925459481851814],
          [28.810475806993974, 30.749767735577866],
          [29.14418552379085, 30.749767735577866],
          [29.14418552379085, 30.925459481851814]]], null, false);
          
var startDate = ee.Date.fromYMD(2019,4,1);
var endDate = ee.Date.fromYMD(2019,6,30);

var S2 = ee.ImageCollection("COPERNICUS/S2").filterDate(startDate,endDate).filterBounds(AOI);

var img = ee.Image(S2.median()).clip(AOI);

var viz = {min:0,max:4000,bands:"B4,B3,B2"};

Map.addLayer(img,viz,"AOI");
Map.centerObject(AOI)

img = img.select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7','B8','B8A','B11','B12'])

var training = img.sample({
  region: AOI,
  scale: 20,
  numPixels: 50000
});

var wekaKmeans = ee.Clusterer.wekaKMeans(5).train(training);
var wekaCascadeKmeans = ee.Clusterer.wekaCascadeKMeans({minClusters:5, maxClusters:5 ,maxIterations: 50}).train(training);
var wekaLVQ = ee.Clusterer.wekaLVQ(5).train(training);
var wekaXMeans = ee.Clusterer.wekaXMeans({minClusters:5, maxClusters:5 ,maxIterations: 50}).train(training);

var result_Kmeans = img.cluster(wekaKmeans);
var result_CascadeKmeans = img.cluster(wekaCascadeKmeans);
var result_LVQ = img.cluster(wekaLVQ);
var result_XMeans = img.cluster(wekaXMeans);


Map.addLayer(result_Kmeans.randomVisualizer(), {}, 'Kmeans');
Map.addLayer(result_CascadeKmeans.randomVisualizer(), {}, 'CascadeKmeans');
Map.addLayer(result_LVQ.randomVisualizer(), {}, 'LVQ');
Map.addLayer(result_XMeans.randomVisualizer(), {}, 'XMeans');
