// 10 | Class area (ha) per year and from-to change matrix (NEW)
// EDIT: asset IDs of the classified rasters (upload the Drive exports as assets first).
// Both maps must use the same class legend and the same pixel grid.
var boundary = ee.FeatureCollection('projects/project1-474516/assets/KNMetro_Reproj4326');
var early = ee.Image('projects/project1-474516/assets/classified_2016');
var late  = ee.Image('projects/project1-474516/assets/classified_2025');
var SCALE = 10;

function areaHa(img, label) {
  var stats = ee.Image.pixelArea().divide(10000).addBands(img.rename('class'))
    .reduceRegion({
      reducer: ee.Reducer.sum().group({groupField: 1, groupName: 'class'}),
      geometry: boundary.geometry(), scale: SCALE, maxPixels: 1e13
    });
  print(label, stats.get('groups'));
}

areaHa(early, 'Area by class, early (ha)');
areaHa(late,  'Area by class, late (ha)');

// From-to code: 14 = class 1 -> class 4
var change = early.multiply(10).add(late).rename('class');
areaHa(change, 'From-to change (ha)');

Map.centerObject(boundary, 10);
Map.addLayer(early.neq(late).selfMask(), {palette: ['red']}, 'Changed pixels');
