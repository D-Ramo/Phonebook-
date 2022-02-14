import axios from "axios";

const URL = "http://localhost:3001/api/persons"

const getAll = () =>  {
    return axios.get(URL)
}

const add = (PersonObj) =>{
    return axios.post(URL, PersonObj)

}

const remove = (id) => {
 return axios.delete(`${URL}/${id}`)
}

export default {getAll, add, remove}