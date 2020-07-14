// import axios HTTP client.
const axios = require('axios')
// import lodash helpers.
const { map } = require('lodash')

// import state data source URL.
const { makeGeoStateURL, makeGeoCountryRegionURL, makeGeoStateRegionURL, makeGeoCityAllURL, makeGeoStateRegionAllURL, makeGeoCityURL } = require('../helpers/urls')
// import JSON/file helpers.
const { writeJSONStaticFile, prepareGeoJSON } = require('../helpers/json')

// import states data.
const states = require('../../src/data/other/br-states')

// generate base name.
const generateTargetName = (code, type = 'cities') => (`geojson/br/${type}/br-${code}.json`)
const generateDivisionTargetName = (countryCode, divisionType = 'state', code, type = 'cities') => (`geojson/${countryCode}/${divisionType}/${code}/${type}.json`)

const precisionDigits = null

// define links that the app will load geoJSON from.
// const links = {
//   q1: 'https://servicodados.ibge.gov.br/api/v2/malhas?resolucao=5&qualidade=1&formato=application/vnd.geo+json',
//   q4: 'https://servicodados.ibge.gov.br/api/v2/malhas?resolucao=5&qualidade=4&formato=application/vnd.geo+json'
// }

// map each state and download it's geo information.
map(states, ({ id, code, slug }) => {
  return axios.get(makeGeoCityURL(id))
    .then(({ data }) => prepareGeoJSON(data, precisionDigits))
    .then(data => {
      writeJSONStaticFile(generateDivisionTargetName('br', 'state', slug, 'cities'), data)
    })
    .then(() => {
      console.log('Downloaded', generateDivisionTargetName('br', 'state', slug, 'cities'))
    })
})

// map each state and download it's geo information.
map(states, ({ id, code, slug }) => {
  return axios.get(makeGeoStateRegionURL(id))
    .then(({ data }) => prepareGeoJSON(data, precisionDigits))
    .then(data => {
      writeJSONStaticFile(generateDivisionTargetName('br', 'state', slug, 'state-regions'), data)
    })
    .then(() => {
      console.log('Downloaded', generateDivisionTargetName('br', 'state', slug, 'state-regions'))
    })
})

// get country geoJSON (Brasil).
axios
  .get(makeGeoCountryRegionURL())
  .then(({ data }) => prepareGeoJSON(data, null, true))
  .then(data => {
    writeJSONStaticFile(generateDivisionTargetName('br', 'country', 'all', 'regions'), data)
  })
  .then(() => {
    console.log('Downloaded', generateDivisionTargetName('br', 'country', 'all', 'regions'))
  })

// get country geoJSON (Brasil).
axios
  .get(makeGeoStateRegionAllURL())
  .then(({ data }) => prepareGeoJSON(data, null, false))
  .then(data => {
    writeJSONStaticFile(generateDivisionTargetName('br', 'country', 'all', 'state-regions'), data)
  })
  .then(() => {
    console.log('Downloaded', generateDivisionTargetName('br', 'country', 'all', 'state-regions'))
  })

axios
  .get(makeGeoStateURL())
  .then(({ data }) => prepareGeoJSON(data, null))
  .then(data => {
    writeJSONStaticFile(generateDivisionTargetName('br', 'country', 'all', 'states'), data)
  })
  .then(() => {
    console.log('Downloaded', generateDivisionTargetName('br', 'country', 'all', 'states'))
  })
axios
  .get(makeGeoCityAllURL())
  .then(({ data }) => prepareGeoJSON(data, null))
  .then(data => {
    writeJSONStaticFile(generateDivisionTargetName('br', 'country', 'all', 'cities'), data)
  })
  .then(() => {
    console.log('Downloaded', generateDivisionTargetName('br', 'country', 'all', 'cities'))
  })
//
// map(links, (link, quality) => {
//   axios
//     .get(link)
//     .then(({ data }) => prepareGeoJSON(data, precisionDigits))
//     .then(preparedData => writeJSONStaticFile(generateTargetName(`all-${quality}`), preparedData))
//     .then(() => {
//       console.log('Downloaded', `all-${quality}`)
//     })
// })
