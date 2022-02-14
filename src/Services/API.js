import axios from "axios";

const URL = "/api/persons"

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