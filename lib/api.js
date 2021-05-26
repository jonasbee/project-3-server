import axios from 'axios'

const geocodeUrl = 'https://nominatim.openstreetmap.org/search?q='
const geocodeFormat = 'format=json&addressdetails=1&limit=1&polygon_svg=1'

export function getCoordinates({ postalCode, city, street, streetNo, region, country }) {
  return axios.get(`${geocodeUrl}${streetNo},+${street},+${city},+${region},+${postalCode},+${country}&${geocodeFormat}`)
}