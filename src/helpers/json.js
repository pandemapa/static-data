// import FS.
const fs = require('fs')
// import path.
const path = require('path')
// import lodash utils.
const { get, map, toNumber } = require('lodash')

// generate target path based on relative path input.
const generatePath = (relativePath) => (path.resolve(__dirname, '../../src/data', relativePath))
const generateStaticPath = (relativePath) => (path.resolve(__dirname, '../../src/statics', relativePath))
const generateDataPath = (relativePath) => (path.resolve(__dirname, '../../src/data', relativePath))
const generateSrcPath = (relativePath) => (path.resolve(__dirname, '../../src', relativePath))

// define a function to write the downloaded JSON content into disk.
exports.readJSONFile = (relativeSrcPath) => {
  return require(generateSrcPath(relativeSrcPath))
}

// define a function to write the downloaded JSON content into disk.
exports.writeJSONFile = (relativePath, data, stringify = true) => {
  // what to write.
  const content = stringify ? JSON.stringify(data) : data
  // do write.
  const dirName = path.dirname(generatePath(relativePath))
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true })
  }
  // do write.
  fs.writeFileSync(generatePath(relativePath), content)
  // return original data.
  return data
}

// define a function to write the downloaded JSON content into disk.
exports.writeJSONStaticFile = (relativePath, data, stringify = true) => {
  // what to write.
  const content = stringify ? JSON.stringify(data) : data
  // do write.
  const dirName = path.dirname(generateStaticPath(relativePath))
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true })
  }
  fs.writeFileSync(generateStaticPath(relativePath), content)
  // return original data.
  return data
}

const mapPolygon = (coordinates, fixedDigits = 3) => {
  return map(coordinates, (c) => {
    return map(c, cc => {
      return map(cc, ccc => {
        return fixedDigits ? toNumber(ccc.toFixed(fixedDigits)) : ccc
      })
    })
  })
}

const prepareGeoJSON = (data, fixedDigits = null, fixId = false) => {
  // get source elements
  const sourceFeatures = get(data, 'features', [])

  const features = map(sourceFeatures, (feature, index) => {
    if (feature.type !== 'Feature') {
      console.error('Not a Feature')
      process.abort()
    }
    // console.log(feature.geometry.type)

    let coordinates = []

    if (feature.geometry.type === 'Polygon') {
      coordinates = mapPolygon(feature.geometry.coordinates, fixedDigits)
    }
    if (feature.geometry.type === 'MultiPolygon') {
      coordinates = map(feature.geometry.coordinates, p => mapPolygon(p, fixedDigits))
    }

    const fixedId = index + 1

    return {
      type: feature.type,
      properties: {
        id: fixId ? fixedId : get(feature, 'properties.codarea', get(feature, 'properties.id', get(feature, 'properties.Id')))
      },
      geometry: {
        type: feature.geometry.type,
        coordinates
      }
    }
  })

  return {
    ...data,
    features
  }
}

exports.generatePath = generatePath
exports.generateStaticPath = generateStaticPath
exports.generateDataPath = generateStaticPath
exports.generateSrcPath = generateSrcPath
exports.mapPolygon = mapPolygon
exports.prepareGeoJSON = prepareGeoJSON
