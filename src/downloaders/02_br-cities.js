// import axios HTTP client.
const axios = require('axios')
// import JSON file writer.
const { writeJSONFile } = require('../helpers/json')
// import state data source URL.
const { makeCitiesURL } = require('../helpers/urls')
// import lodash helpers.
const { map } = require('lodash')
// import states data.
const states = require('../../src/data/other/br-states')
const urlSlug = require('url-slug')

// city mapper function.
const cityMapper = (state) => ({ id, nome }) => ({ id, state: state.slug, name: nome, slug: urlSlug(nome) })

// map wrapper for receiving the states array.
const mapCities = (state) => (cities) => map(cities, cityMapper(state))

// generate base name.
const generateTargetName = (code) => (`other/br-cities-${code}.json`)
// const maps = {}
// map each state and download it's geo information.
/* const pending = */ map(states, ({ id, code, slug }) => {
  // download geo-data.
  return axios.get(makeCitiesURL(id))
    .then(({ data }) => mapCities({ slug })(data))
    .then((data) => writeJSONFile(generateTargetName(slug), data))
    // .then((data) => set(maps, slug, data))
})

// write big file.
// Promise.all(pending).finally(() => writeJSONFile('geo/br-states.json', maps))
