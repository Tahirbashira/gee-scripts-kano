# Kano Metropolis Urban Landscape Dynamics (Google Earth Engine)

*14 October 2026*

This repository was authored by and belongs to **Tahir Bashir Aliyu**, a GIS Analyst and Registered Surveyor with a background in Surveying and Geoinformatics, currently concluding an M.Sc. in Geography (Remote Sensing and GIS) at the Nigerian Defence Academy, Kaduna, Nigeria.

It holds the Google Earth Engine scripts I wrote for my research project, *AI Prediction of Urban Landscape Dynamics in Kano Metropolis: A Geospatial-Machine Learning Approach*. The scripts cover satellite image acquisition (Landsat and Sentinel-2), Random Forest land cover classification, accuracy assessment, and change analysis.

**Contact**
- LinkedIn: [linkedin.com/in/geoTahirBashir](https://www.linkedin.com/in/geoTahirBashir)
- Email: [tahirbashira@gmail.com](mailto:tahirbashira@gmail.com)
- Phone: +234 703 229 3000

## Scripts

| Script | What it does |
|---|---|
| `01_sentinel2_composites.js` | Builds Sentinel-2 false colour composites for 2016, 2020, 2025 |
| `02_landsat4_1991_falsecolor.js` | Builds and exports a 1991 Landsat 4 false colour image |
| `03_landsat7_2000_falsecolor.js` | Builds and exports a 2000 Landsat 7 false colour image |
| `04_landsat5_2005_falsecolor.js` | Builds and exports a 2005 Landsat 5 false colour image |
| `05_landsat8_2015_falsecolor.js` | Builds and exports a 2015 Landsat 8 false colour image |
| `06_rf_classify_sentinel2.js` | Random Forest land cover classification of Sentinel-2 (2016, 2020, 2025) |
| `07_rf_classify_landsat_1995_2025.js` | Random Forest land cover classification of Landsat (1995, 2025) |
| `08_spectral_indices.js` | Computes NDVI, NDBI and MNDWI |
| `09_accuracy_assessment.js` | Confusion matrix, overall accuracy and kappa |
| `10_area_and_change.js` | Class area per year and from-to change matrix |
