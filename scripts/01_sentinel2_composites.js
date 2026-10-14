// 01 | Sentinel-2 annual median composites (2016, 2020, 2025), false colour (NIR-R-G)
var boundary = ee.FeatureCollection('projects/project1-474516/assets/KNMetro_Reproj4326');
Map.centerObject(boundary, 10);

function getS2(year) {
  var col = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterBounds(boundary)
    .filterDate(year + '-01-01', year + '-12-31')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10));
  print('S2 scenes ' + year, col.size());   // 0 = no data for that year
  return col.select(['B8', 'B4', 'B3']).median().clip(boundary);
}

var visParams = {min: 0, max: 3000, bands: ['B8', 'B4', 'B3']};

[2016, 2020, 2025].forEach(function (y) {
  Map.addLayer(getS2(y), visParams, 'Sentinel-2 ' + y);
});

Map.addLayer(boundary.style({color: 'red', fillColor: '00000000', width: 2}), {}, 'Study Area Boundary');
