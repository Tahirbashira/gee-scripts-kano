// 07 | Random Forest land cover, Landsat 1995 and 2025 (each with its own training samples)
var img1995 = ee.Image('projects/project1-474516/assets/LT95_GCS1');
var img2025 = ee.Image('projects/project1-474516/assets/Landsat_2025_FebMay_FalseColor_Reflectance');
var train1995 = ee.FeatureCollection('projects/project1-474516/assets/Training_data_1995');
var train2025 = ee.FeatureCollection('projects/project1-474516/assets/Training_data_2025');
var BANDS = ['b1', 'b2', 'b3'];
var VIS = {min: 1, max: 4, palette: ['red', 'brown', 'blue', 'green']};

function classify(img, fc) {
  var numeric = fc.map(function (f) {
    return f.set('ClassNum', ee.Number.parse(f.get('class')));   // string -> number
  });
  var samples = img.select(BANDS).sampleRegions({collection: numeric, properties: ['ClassNum'], scale: 30});
  var rf = ee.Classifier.smileRandomForest(50)
    .train({features: samples, classProperty: 'ClassNum', inputProperties: BANDS});
  return img.select(BANDS).classify(rf);
}

var classified1995 = classify(img1995, train1995);
var classified2025 = classify(img2025, train2025);

Map.centerObject(img1995, 10);
Map.addLayer(classified1995, VIS, '1995 Class');
Map.addLayer(classified2025, VIS, '2025 Class');

Export.image.toDrive({image: classified1995, description: 'Class1995', scale: 30, region: img1995.geometry(), maxPixels: 1e9});
Export.image.toDrive({image: classified2025, description: 'Class2025', scale: 30, region: img2025.geometry(), maxPixels: 1e9});
