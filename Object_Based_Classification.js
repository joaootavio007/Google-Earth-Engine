var AOI = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-91.1028433068419, 40.82444972968615],
          [-91.1028433068419, 40.810549087005384],
          [-91.0761499627257, 40.810549087005384],
          [-91.0761499627257, 40.82444972968615]]], null, false),
    Water = /* color: #1d0eff */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-91.09747915623863, 40.82261728893838]),
            {
              "Class": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.0838749921151, 40.823153134693335]),
            {
              "Class": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.08693551905478, 40.81914439467666]),
            {
              "Class": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.09468939143663, 40.815177544999976]),
            {
              "Class": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.09784366923815, 40.81529122236175]),
            {
              "Class": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.07695966989472, 40.81513368494296]),
            {
              "Class": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.09329357026846, 40.813171919511994]),
            {
              "Class": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.09419479249746, 40.811076909929405]),
            {
              "Class": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.0828007686022, 40.822152102441386]),
            {
              "Class": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.0889387353087, 40.81868521386235]),
            {
              "Class": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.08959136038222, 40.8232415992054]),
            {
              "Class": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.09454808264174, 40.81296236215646]),
            {
              "Class": 0,
              "system:index": "11"
            })]),
    Urban = /* color: #ed420f */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-91.09632219836631, 40.81208691982327]),
            {
              "Class": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.08651604220786, 40.81099880453375]),
            {
              "Class": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.08299600617615, 40.81146456170063]),
            {
              "Class": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.09878250519002, 40.81279138638638]),
            {
              "Class": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.09941550651753, 40.81089937365139]),
            {
              "Class": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.1010408623839, 40.814950189692055]),
            {
              "Class": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.10177042323595, 40.8158596062488]),
            {
              "Class": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.10230686503893, 40.81090638298232]),
            {
              "Class": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.10116853593618, 40.81273343460807]),
            {
              "Class": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.08865871309072, 40.81481215216066]),
            {
              "Class": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.0956209662477, 40.81575561418741]),
            {
              "Class": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.09980521231093, 40.82028627871785]),
            {
              "Class": 1,
              "system:index": "11"
            })]),
    Grass = /* color: #0eed34 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-91.08606492136093, 40.81146943879265]),
            {
              "Class": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.08451996896835, 40.812606267181174]),
            {
              "Class": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.08709488962265, 40.81072236953161]),
            {
              "Class": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.08582888696762, 40.81064928621743]),
            {
              "Class": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.08921919916244, 40.81125831137589]),
            {
              "Class": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.09994621390659, 40.81212920652476]),
            {
              "Class": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.07807895134476, 40.81657738723119]),
            {
              "Class": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.08295097230703, 40.8201548070251]),
            {
              "Class": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.08813223867811, 40.81203666548113]),
            {
              "Class": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.08775672941603, 40.8165838232891]),
            {
              "Class": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.08506379156508, 40.818451315672554]),
            {
              "Class": 2,
              "system:index": "10"
            })]),
    Forest = /* color: #22ba1f */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-91.0853633199983, 40.82227546091054]),
            {
              "Class": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.0897406851106, 40.81813466730718]),
            {
              "Class": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.10182662744695, 40.82070098819096]),
            {
              "Class": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.09102336821444, 40.81362047916684]),
            {
              "Class": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.07847415860176, 40.812396031711515]),
            {
              "Class": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.0957800659628, 40.82319324360253]),
            {
              "Class": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.08828060955716, 40.82298215349503]),
            {
              "Class": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.10009672481065, 40.81860401992086]),
            {
              "Class": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.0875194997645, 40.817405111728206]),
            {
              "Class": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.08623203943735, 40.81825765856586]),
            {
              "Class": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.07646563631212, 40.81265223338188]),
            {
              "Class": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.10113558798231, 40.824313276298255]),
            {
              "Class": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.09688696890272, 40.82428080148926]),
            {
              "Class": 3,
              "system:index": "12"
            })]),
    Agriculture = /* color: #c2be30 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-91.08095465196568, 40.811165828180876]),
            {
              "Class": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.0816412974735, 40.81244882467698]),
            {
              "Class": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.08253844254764, 40.8167075972762]),
            {
              "Class": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.08319435600492, 40.812322910681814]),
            {
              "Class": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.08228240493986, 40.813898204550966]),
            {
              "Class": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.08086957811147, 40.81921297205979]),
            {
              "Class": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.08164205430776, 40.81549421716611]),
            {
              "Class": 4,
              "system:index": "6"
            })]);

// Prepare data ------------------------------------------------------------------------------

var train_points = Water.merge(Grass).merge(Urban).merge(Forest).merge(Agriculture)

var dataset = ee.ImageCollection('USDA/NAIP/DOQQ')
                  .filter(ee.Filter.date('2017-01-01', '2018-12-31'))
                  .filterBounds(AOI);
                  
                  
                  
var img = dataset.mean().clip(AOI);
var trueColorVis = {
  min: 0.0,
  max: 255.0, 
  bands:"R,G,B"
};
Map.centerObject(AOI);
Map.addLayer(img, trueColorVis, 'True Color');

var ndvi = img.normalizedDifference(["N", "R"]).rename('NDVI')

Map.addLayer(ndvi, {min:-1, max:0.8, palette: ["red", "orange", "yellow", "green"]}, "NDVI")
Map.addLayer(ndvi.gt([0, 0.2, 0.40, 0.60, 0.80]).reduce('sum'), {min:0, max: 4, palette: ["red", "orange", "yellow", "green", "darkgreen"]}, "NDVI steps")

var ndviGradient = ndvi.gradient().pow(2).reduce('sum').sqrt().rename('NDVI_GRAD')
Map.addLayer(ndviGradient, {min:0, max:0.01}, "NDVI gradient")

// Compute entropy and display.
var square = ee.Kernel.square({radius: 4});


var entropy = img.select('N').toByte().entropy(square);
Map.addLayer(entropy,
             {min: 1, max: 5, palette: ['0000CC', 'CC0000']},
             'entropy');

var glcm = img.select('N').toByte().glcmTexture({size: 4});
print(glcm)
var contrast = glcm.select('N_contrast');
Map.addLayer(contrast, {min: 0, max: 1500, palette: ['0000CC', 'CC0000']}, 'contrast');
var asm = glcm.select('N_asm');
Map.addLayer(asm, {}, 'asm');


var bands = ['R', 'G', 'B', 'N'];
var FullImage = img.select(bands).float().divide(255);


// Segmentation -----------------------------------------------------------------------------

var seeds = ee.Algorithms.Image.Segmentation.seedGrid(35);

var snic = ee.Algorithms.Image.Segmentation.SNIC({
  image: FullImage, 
  compactness: 0,
  connectivity: 4,
  neighborhoodSize: 128,
  size: 2,
  seeds: seeds
})

var clusters_snic = snic.select("clusters")

var vectors = clusters_snic.reduceToVectors({
  geometryType: 'polygon',
  reducer: ee.Reducer.countEvery(),
  scale: 1,
  maxPixels: 1e13,
  geometry: AOI,
});


var empty = ee.Image().byte();


var outline = empty.paint({
  featureCollection: vectors,
  color: 1,
  width: 1
});
Map.addLayer(outline, {palette: 'FF0000'}, 'segments');



// Select train polygons from points -------------------------------------------------------

var FullImage = FullImage.addBands(ndvi).addBands(ndviGradient)
                         .addBands(glcm.select(['N_contrast','N_asm',"N_corr"]).float())
                         .addBands(entropy);
                         

print(FullImage)

var train_polys = vectors.map(function(feat){
  feat = ee.Feature(feat);
  var point = feat.geometry();

  var mappedPolys = train_points.map(function(poly){
    var cls = poly.get("Class")
    var intersects = poly.intersects(point, ee.ErrorMargin(1));
    var property = ee.String(ee.Algorithms.If(intersects, 'TRUE', 'FALSE'));
    return feat.set('belongsTo',  property).set('Class', cls);
  });
  return mappedPolys;
}).flatten().filter(ee.Filter.neq('belongsTo', 'FALSE'));




//extract features from train polygons --------------------------------------------- 

var train_areas = train_polys
  .reduceToImage({
    properties: ['Class'],
    reducer: ee.Reducer.first()
}).rename('Class').toInt();



// Extract features from image ------------------------------------------------------------------------------------------
var predict_image = vectors
  .reduceToImage({
    properties: ['label'],
    reducer: ee.Reducer.first()
}).rename('id').toInt();


FullImage = FullImage.addBands(predict_image)


var FullImage_mean = FullImage.reduceConnectedComponents({
  reducer: ee.Reducer.mean(),
  labelBand: 'id'
});


var FullImage_std = FullImage.reduceConnectedComponents({
  reducer: ee.Reducer.stdDev(),
  labelBand: 'id'
});

var FullImage_median = FullImage.reduceConnectedComponents({
  reducer: ee.Reducer.median(),
  labelBand: 'id'
});

var FullImage_area = ee.Image.pixelArea().addBands(FullImage.select('id')).reduceConnectedComponents(ee.Reducer.sum(), 'id')
var FullImage_sizes = ee.Image.pixelLonLat().addBands(FullImage.select('id')).reduceConnectedComponents(ee.Reducer.minMax(), 'id')
var FullImage_width = FullImage_sizes.select('longitude_max').subtract(FullImage_sizes.select('longitude_min')).rename('width')
var FullImage_height = FullImage_sizes.select('latitude_max').subtract(FullImage_sizes.select('latitude_min')).rename('height')


// join features in an image

var Pred_bands = ee.Image.cat([
  FullImage_mean,
  FullImage_std,
  FullImage_median,
  FullImage_area,
  FullImage_width,
  FullImage_height
]).float();

var clip_Image = Pred_bands.clip(train_polys)

train_areas = train_areas.addBands(clip_Image)

var predictionBands = Pred_bands.bandNames();


var classifierTraining = train_areas.select(predictionBands).sampleRegions({collection: train_polys, properties: ['Class'], scale: 2 });

var RF = ee.Classifier.randomForest(50).train({features:classifierTraining, classProperty:'Class', inputProperties: predictionBands});


var classified_RF = Pred_bands.select(predictionBands).classify(RF);
var vis_RF = {min: 0, max: 4,
palette: [ 'blue' //0
,'red' //1
,'orange' //2
,'green' //3
,'yellow']//4
}
Map.addLayer(classified_RF,vis_RF,"OBIA_RF");


