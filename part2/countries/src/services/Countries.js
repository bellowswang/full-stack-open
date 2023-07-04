import axios from 'axios'
const baseUrlAll = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
    return axios.get(baseUrlAll)
}

const getWeather = (lat, lon, unit, api_key) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${api_key}`)
}

export default {
    getAll: getAll,
    getWeather: getWeather
}
