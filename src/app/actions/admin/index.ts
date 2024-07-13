'use server';

import data from './geoJson.json';
import { FeatureCollection, Feature, GeometryCollection } from 'geojson';

export default async function getZipcodeDataFromDb() {
    // const zipcodeData = await db.zipcode.findAll();

    // if (!zipcodeData) {
    //     throw new Error("Could not fetch zipcode data");
    // }

    // return zipcodeData;
}

// Function to load shapefiles from the filesystem
export async function loadShapeFile(): Promise<FeatureCollection> {
    const geoJson: FeatureCollection = {
      type: 'FeatureCollection',
      features: []
    };
  
    (data.geometries as GeometryCollection).forEach((geometry: Feature) => {
      geoJson.features.push(geometry);
    });
  
    return geoJson;
  }