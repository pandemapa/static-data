// import axios HTTP client.
const axios = require('axios')
// import JSON file writer.
const { writeJSONFile } = require('../helpers/json')
// import state data source URL.
const { makeCOVIDInfoURL } = require('../helpers/urls')
const { map } = require('lodash')
// import states data.
const states = require('../../src/data/other/br-states')

// generate base name.
const generateTargetName = (slug) => (`covid/br-covid-${slug}.json`)

// map each state and download it's geo information.
map(states, async ({ slug, code }) => {
  const url = makeCOVIDInfoURL(code)

  const data = []

  let hasNext = true

  while (hasNext === true) {
    const response = await axios.get(url)
    if (response.data.next === null) {
      hasNext = false
    }
    data.push(...response.data.results)
  }

  writeJSONFile(generateTargetName(slug), data)
})
