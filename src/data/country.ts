import countries from '../data/countries.json'

export type Country = {
  id: string
  name: string
  capital: string
  area: number
  latlng: number[]
}

export const selectCountryItems = countries.map((c) => ({ label: c.name, value: c }))

export const selectCapitalItems = countries.map((c) => ({ label: c.capital, value: c }))

export const getCountryRandom = () => {
  const countryRandom = countries[Math.floor(Math.random() * countries.length)]
  return countryRandom
}
