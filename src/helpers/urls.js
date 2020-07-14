// base states list data URL.
exports.stateDataURL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'

// generate URL for GEO data on each state.
exports.makeGeoStateURL = () => {
  return 'https://servicodados.ibge.gov.br/api/v2/malhas?resolucao=2&qualidade=4&formato=application/vnd.geo+json'
}

// generate URL for GEO data on each state.
exports.makeGeoCountryRegionURL = () => {
  return 'https://servicodados.ibge.gov.br/api/v2/malhas?resolucao=1&qualidade=4&formato=application/vnd.geo+json'
}

// generate URL for GEO data on each state.
exports.makeGeoCityURL = (stateID) => {
  // return `https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-${stateID}-mun.json`
  return `https://servicodados.ibge.gov.br/api/v2/malhas/${stateID}?resolucao=5&qualidade=4&formato=application/vnd.geo+json`
}

// generate URL for GEO data on each state.
exports.makeGeoStateRegionURL = (stateID) => {
  // return `https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-${stateID}-mun.json`
  return `https://servicodados.ibge.gov.br/api/v2/malhas/${stateID}?resolucao=4&qualidade=4&formato=application/vnd.geo+json`
}

// generate URL for GEO data on each state.
exports.makeGeoStateRegionAllURL = () => {
  // return `https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-${stateID}-mun.json`
  return 'https://servicodados.ibge.gov.br/api/v2/malhas?resolucao=4&qualidade=4&formato=application/vnd.geo+json'
}

// generate URL for GEO data on each state.
exports.makeGeoCityAllURL = () => {
  // return `https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-${stateID}-mun.json`
  return 'https://servicodados.ibge.gov.br/api/v2/malhas?resolucao=5&qualidade=3&formato=application/vnd.geo+json'
}

// generate URL for GEO data on each state.
exports.makeCitiesURL = (stateID) => {
  // return `https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-${stateID}-mun.json`
  return `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateID}/municipios`
}

// generate URL for GEO data on each state.
exports.makeCitiesURLNoState = () => {
  // return `https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-${stateID}-mun.json`
  return 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios'
}

exports.makeCOVIDInfoURL = (stateCODE, onlyLast = true, format = 'json') => {
  const baseURL = 'https://brasil.io/api/dataset/covid19/caso/data'
  const lastFlag = onlyLast ? 'true' : 'false'
  return `${baseURL}?format=${format}&place_type=city&is_last=${lastFlag}&state=${stateCODE.toUpperCase()}`
}
