import axios from 'axios'
const baseUrlAll = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
    return axios.get(baseUrlAll)
}

export default {
    getAll: getAll
}