// import axios HTTP client.
const axios = require('axios')
// import JSON file writer.
const { writeJSONStaticFile, prepareGeoJSON } = require('../helpers/json')
// import state data source URL.
const { makeGeoCityURL } = require('../helpers/urls')
// import lodash helpers.
const { map } = require('lodash')
// import states data.
const states = require('../../src/data/other/br-states')

// generate base name.
const generateTargetName = (code) => (`geojson/br-state-${code}.json`)

// map each state and download it's geo information.
map(states, ({ id, code, slug }) => {
  return axios.get(makeGeoCityURL(id))
    .then(({ data }) => prepareGeoJSON(data))
    .then(data => {
      writeJSONStaticFile(generateTargetName(slug), data)
    })
})
