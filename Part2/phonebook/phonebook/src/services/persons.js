import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    console.log('REQUEST MADE JE')
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    console.log('PERSON ADDED JE')
    return request.then(response => response.data)
}
const update = (id, newNum) => {
    const request = axios.put(`${baseUrl}/${id}`, newNum)
    return request.then(response => response.data)
}

const remove = id => {
const request = axios.delete(`${baseUrl}/${id}`)
return request.then(response => response.data)
}

export default { getAll, create, remove, update }