import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const remove = id => {
    console.log(baseUrl + '/' + id)
    return axios.delete(baseUrl + '/' + id)
}

const update = (id, name, num) => {
    return axios.put(baseUrl + '/' + id, {
        name: name,
        number: num
    })
}

export default {
    getAll: getAll,
    create: create,
    remove: remove,
    update: update
}