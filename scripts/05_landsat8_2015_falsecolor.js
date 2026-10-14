// 05 | Landsat 8 OLI C2 L2, year 2015, false colour (NEW)
// OLI band numbers shift by one: NIR=SR_B5, Red=SR_B4, Green=SR_B3.
var boundary = ee.FeatureCollection('projects/project1-474516/assets/KNMetro_Reproj4326');
var YEAR = 2015;

var col = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .filterBounds(boundary)
  .filterDate(YEAR + '-01-01', YEAR + '-12-31')
  .filter(ee.Filter.lt('CLOUD_COVER', 10));
print('Scenes ' + YEAR, col.size());

var img = col.median().clip(boundary);

Map.centerObject(boundary, 10);
Map.addLayer(img, {bands: ['SR_B5', 'SR_B4', 'SR_B3'], min: 7000, max: 18000, gamma: 1.2},
  'Landsat 8 False Colour (' + YEAR + ')');
Map.addLayer(boundary, {color: 'white'}, 'Boundary');

Export.image.toDrive({
  image: img.select(['SR_B5', 'SR_B4', 'SR_B3']),
  description: 'Landsat8_' + YEAR + '_FalseColor', folder: 'KanoResults',
  region: boundary.geometry(), scale: 30, maxPixels: 1e13, fileFormat: 'GeoTIFF'
});
