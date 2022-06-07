import fs from 'fs'
import path from 'path'
import db from 'world-countries'

const PATH_DATA = './public/data/'
const PATH_SRC = './src/data'
const combining = /[\u0300-\u036F]/g

const clean = () => {
  const files = fs.readdirSync(PATH_DATA)
  for (const file of files) {
    fs.unlinkSync(path.join(PATH_DATA, file))
  }
}

const seed = () => {
  db.sort((a, b) => a.name.common.localeCompare(b.name.common))

  const countries = []
  for (const record of db) {
    if (!record.cca3) continue
    if (!record.name.common) continue
    if (!record.capital?.[0]?.length > 0) continue
    if (!record.area || record.area < 1) continue

    const ID = record.cca3
    const id = record.cca3.toLowerCase()

    const topoJson = fs.readFileSync(`./node_modules/world-countries/data/${id}.topo.json`)
    const topo = JSON.parse(topoJson)
    if (!topo.bbox) continue

    const geoJson = fs.readFileSync(`./node_modules/world-countries/data/${id}.geo.json`)
    if (!geoJson) continue

    const svg = fs.readFileSync(`./node_modules/world-countries/data/${id}.svg`)
    if (!svg) continue

    const country = {
      id: record.cca3,
      name: record.name.common.normalize('NFKD').replace(combining, ''),
      capital: record.capital[0].normalize('NFKD').replace(combining, ''),
      area: record.area,
      latlng: record.latlng,
    }
    countries.push(country)

    fs.writeFileSync(path.join(PATH_DATA, `${ID}.geo.json`), geoJson)
    fs.writeFileSync(path.join(PATH_DATA, `${ID}.svg`), svg)
    console.log(record.name.common)
  }

  const countriesJson = JSON.stringify(countries)
  fs.writeFileSync(path.join(PATH_SRC, 'countries.json'), countriesJson)
}

clean()
seed()
