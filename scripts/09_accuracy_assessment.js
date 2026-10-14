// 09 | Accuracy assessment: 70/30 split, confusion matrix, overall accuracy, kappa (NEW)
var boundary = ee.FeatureCollection('projects/project1-474516/assets/KNMetro_Reproj4326');
var training = ee.FeatureCollection('projects/project1-474516/assets/Training_Data_exp_wgs');
var BANDS = ['B2', 'B3', 'B4', 'B8'];

var img = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(boundary)
  .filterDate('2025-04-01', '2025-04-30')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
  .median().select(BANDS).clip(boundary);

var samples = img.sampleRegions({collection: training, properties: ['ClassValue'], scale: 10})
  .randomColumn('r', 42);
var train = samples.filter(ee.Filter.lt('r', 0.7));
var test  = samples.filter(ee.Filter.gte('r', 0.7));

var rf = ee.Classifier.smileRandomForest(50).train(train, 'ClassValue', BANDS);
var cm = test.classify(rf).errorMatrix('ClassValue', 'classification');

print('Confusion matrix', cm);
print('Overall accuracy', cm.accuracy());
print('Kappa', cm.kappa());
print('Producer\'s accuracy', cm.producersAccuracy());
print('User\'s accuracy', cm.consumersAccuracy());
