// 03 | Landsat 7 ETM+ C2 L2, year 2000, false colour (change YEAR as needed)
var boundary = ee.FeatureCollection('projects/project1-474516/assets/KNMetro_Reproj4326');
var YEAR = 2000;

var img = ee.ImageCollection('LANDSAT/LE07/C02/T1_L2')
  .filterBounds(boundary)
  .filterDate(YEAR + '-01-01', YEAR + '-12-31')
  .filter(ee.Filter.lt('CLOUD_COVER', 10))
  .median()
  .clip(boundary);

Map.centerObject(boundary, 10);
Map.addLayer(img, {bands: ['SR_B4', 'SR_B3', 'SR_B2'], min: 7000, max: 18000, gamma: 1.2},
  'Landsat 7 False Colour (' + YEAR + ')');
Map.addLayer(boundary, {color: 'white'}, 'Boundary');

Export.image.toDrive({
  image: img.select(['SR_B4', 'SR_B3', 'SR_B2']),
  description: 'Landsat7_' + YEAR + '_FalseColor', folder: 'KanoResults',
  region: boundary.geometry(), scale: 30, maxPixels: 1e13, fileFormat: 'GeoTIFF'
});
