// import lodash helpers.
const { keyBy, first, each, get, toString, find, filter, startsWith, mapValues, map, groupBy, pickBy, pick } = require('lodash')

// import JSON/file helpers.
const { readJSONFile, writeJSONStaticFile, prepareGeoJSON } = require('../helpers/json')

// path where the main map is located.
const countryMapPath = 'data/other/br-geo-health-regions.json'
// path where the city list with regions are located.
const cityListPath = 'data/other/br-cities-and-health-regions.json'

// read the full country map.
const countryMap = readJSONFile(countryMapPath)

// read city list.
const cityList = keyBy(readJSONFile(cityListPath), 'city_id')

// group health regions by state and pick only the ID.
const healthRegionsByState = mapValues(groupBy(cityList, 'state'), (records, stateID) => {
  return get(first(records), 'state_id')
})

// console.log(healthRegionsByState)
writeJSONStaticFile('geojson/br/country/all/health-regions.json', prepareGeoJSON(countryMap))

// loop each state
each(healthRegionsByState, (stateID, stateCode) => {
  const stateMap = {
    ...countryMap,
    features: filter(countryMap.features, (feature) => {
      return startsWith(feature.properties.id, stateID)
    })
  }

  writeJSONStaticFile(`geojson/br/state/${stateCode.toLowerCase()}/health-regions.json`, prepareGeoJSON(stateMap))
})

//
//
//
//
// const featureList = mapValues(healthRegionList, (region, id) => {
//   const cityIDs = map(region, r => toString(get(r, 'city_id')))
//
//   const initialFeatures = filter(get(countryMapByCity, 'features'), (feature) => {
//     const id = toString(get(feature, 'properties.id'))
//
//     // console.log(id)
//     return cityIDs.indexOf(id) !== -1
//   })
//
//   return map(initialFeatures, f => {
//     const geometryType = get(f, 'geometry.type')
//
//     if (geometryType === 'Polygon') {
//       return {
//         ...f,
//         geometry: {
//           type: 'MultiPolygon',
//           coordinates: [get(f, 'coordinates')]
//         }
//       }
//     }
//
//     return f
//   })
// })
//
// const maps = mapValues(featureList, (baseFeatures, id) => {
//
//   const coordinates = []
//
//   each(baseFeatures, (baseFeature) => {
//     coordinates.push(...baseFeature.geometry.coordinates)
//   })
//
//   return {
//     type: 'FeatureCollection',
//     crs: {
//       type: 'name',
//       properties: {
//         name: 'urn:ogc:def:crs:EPSG::4674'
//       }
//     },
//     features: [
//       {
//         type: 'Feature',
//         properties: {
//           id: id
//         },
//         geometry: {
//           type: 'MultiPolygon',
//           coordinates: uniq(coordinates)
//         }
//       }
//     ]
//   }
//   //return {"type":"FeatureCollection","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4674"}},"features":[
// })
// console.log(JSON.stringify(maps[52017]))
// // console.log(healthRegionList)
