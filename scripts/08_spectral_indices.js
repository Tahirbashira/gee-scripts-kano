// 08 | NDVI, NDBI, MNDWI from Sentinel-2 (NEW). Useful as extra classifier bands.
var boundary = ee.FeatureCollection('projects/project1-474516/assets/KNMetro_Reproj4326');

var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(boundary)
  .filterDate('2025-04-01', '2025-04-30')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
  .median().clip(boundary);

var ndvi  = s2.normalizedDifference(['B8', 'B4']).rename('NDVI');    // vegetation
var ndbi  = s2.normalizedDifference(['B11', 'B8']).rename('NDBI');   // built-up
var mndwi = s2.normalizedDifference(['B3', 'B11']).rename('MNDWI');  // water

Map.centerObject(boundary, 10);
Map.addLayer(ndvi,  {min: -0.2, max: 0.8, palette: ['brown', 'yellow', 'green']}, 'NDVI 2025');
Map.addLayer(ndbi,  {min: -0.5, max: 0.5, palette: ['green', 'white', 'red']}, 'NDBI 2025');
Map.addLayer(mndwi, {min: -0.5, max: 0.5, palette: ['white', 'blue']}, 'MNDWI 2025');

Export.image.toDrive({
  image: ndvi.addBands(ndbi).addBands(mndwi), description: 'indices_2025', folder: 'KanoResults',
  region: boundary.geometry(), scale: 10, maxPixels: 1e13
});
