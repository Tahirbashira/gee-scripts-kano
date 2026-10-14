// 02 | Landsat 4 TM (1991-01-07), uploaded bands -> false colour composite
var boundary = ee.FeatureCollection('projects/project1-474516/assets/KNMetro_Reproj4326');
var P = 'projects/project1-474516/assets/LT04_L1TP_188052_19910107_20200915_02_T1_';

var image = ee.Image.cat([ee.Image(P + 'B4'), ee.Image(P + 'B3'), ee.Image(P + 'B2')])
  .rename(['B4', 'B3', 'B2'])   // NIR, Red, Green
  .clip(boundary);

Map.centerObject(boundary, 10);
Map.addLayer(image, {bands: ['B4', 'B3', 'B2'], min: 0, max: 120, gamma: 1.2},
  'Landsat 4 False Colour (1991-01-07)');
Map.addLayer(boundary, {color: 'white'}, 'Boundary');
print('Image bands:', image.bandNames());

Export.image.toDrive({
  image: image, description: 'Kano_1991_01_07_FalseColor', folder: 'KanoResults',
  region: boundary.geometry(), scale: 30, maxPixels: 1e13, fileFormat: 'GeoTIFF'
});
