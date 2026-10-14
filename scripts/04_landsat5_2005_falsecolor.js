// 04 | Landsat 5 TM C2 L2, year 2005, false colour (NEW; same pattern as 03)
// Landsat 5 is preferred over Landsat 7 after 2003 (ETM+ scan-line gaps).
var boundary = ee.FeatureCollection('projects/project1-474516/assets/KNMetro_Reproj4326');
var YEAR = 2005;

var col = ee.ImageCollection('LANDSAT/LT05/C02/T1_L2')
  .filterBounds(boundary)
  .filterDate(YEAR + '-01-01', YEAR + '-12-31')
  .filter(ee.Filter.lt('CLOUD_COVER', 10));
print('Scenes ' + YEAR, col.size());

var img = col.median().clip(boundary);

Map.centerObject(boundary, 10);
Map.addLayer(img, {bands: ['SR_B4', 'SR_B3', 'SR_B2'], min: 7000, max: 18000, gamma: 1.2},
  'Landsat 5 False Colour (' + YEAR + ')');
Map.addLayer(boundary, {color: 'white'}, 'Boundary');

Export.image.toDrive({
  image: img.select(['SR_B4', 'SR_B3', 'SR_B2']),
  description: 'Landsat5_' + YEAR + '_FalseColor', folder: 'KanoResults',
  region: boundary.geometry(), scale: 30, maxPixels: 1e13, fileFormat: 'GeoTIFF'
});
