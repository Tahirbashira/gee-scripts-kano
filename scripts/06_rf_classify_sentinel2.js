// 06 | Random Forest land cover, Sentinel-2 (2025 trained, applied to 2020 and 2016)
var boundary = ee.FeatureCollection('projects/project1-474516/assets/KNMetro_Reproj4326');
var training = ee.FeatureCollection('projects/project1-474516/assets/Training_Data_exp_wgs');
var BANDS = ['B2', 'B3', 'B4', 'B8'];
var VIS = {min: 1, max: 5, palette: ['red', 'green', 'brown', 'blue', 'yellow']};

function composite(start, end, cloud) {
  return ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterBounds(boundary)
    .filterDate(start, end)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', cloud))
    .median().select(BANDS).clip(boundary);
}

var s2_2025 = composite('2025-04-01', '2025-04-30', 10);
var s2_2020 = composite('2020-04-01', '2020-04-30', 10);
var s2_2016 = composite('2016-07-01', '2016-12-31', 20);

// Train on 2025
var samples = s2_2025.sampleRegions({collection: training, properties: ['ClassValue'], scale: 10});
print('Number of sampled pixels:', samples.size());
var classifier = ee.Classifier.smileRandomForest(50).train(samples, 'ClassValue', BANDS);

// Classify, display, export
Map.centerObject(boundary, 10);
[[2025, s2_2025], [2020, s2_2020], [2016, s2_2016]].forEach(function (p) {
  var classified = p[1].classify(classifier);
  Map.addLayer(classified, VIS, 'Classified ' + p[0]);
  Export.image.toDrive({
    image: classified, description: 'classified_' + p[0], folder: 'KanoResults',
    region: boundary.geometry(), scale: 10, maxPixels: 1e13
  });
});
Map.addLayer(boundary, {color: 'white'}, 'Boundary');
