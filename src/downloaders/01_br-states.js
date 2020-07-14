// import lodash helpers.
const { map, keyBy } = require('lodash')
// import axios HTTP client.
const axios = require('axios')
// import JSON file writer.
const { writeJSONFile } = require('../helpers/json')
// import state data source URL.
const { stateDataURL } = require('../helpers/urls')

// state mapper function.
const stateMapper = ({ id, sigla, nome }) => ({
  id,
  code: sigla,
  slug: sigla.toLowerCase(),
  name: nome
})

// map wrapper for receiving the states array.
const mapStates = (states) => (map(states, stateMapper))

// get state info from URL
axios.get(stateDataURL)
  // then write on br-states.json file.
  .then(({ data }) => data)
  .then(mapStates)
  // .then(data => writeJSONFile('other/br-states.json', data))
  .then(data => writeJSONFile('other/br-states.json', keyBy(data, 'slug')))
  // .then(data => writeJSONFile('other/br-states-key-id.json', keyBy(data, 'id')))
