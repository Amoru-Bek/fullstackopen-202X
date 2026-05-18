import axios from "axios";

const baseurl="/api/persons"

const add = (newObject) =>{
   return axios.post(baseurl, newObject).then(response => response.data)
}

const getAll = () => {
    return axios.get(baseurl).then(response => response.data)
}
const Delete = (id) => {
    return axios.delete(baseurl+"/"+id).then(response => response.data);
}

const update = (changedPerson,id)=>{
    return axios.put(baseurl +"/"+id,changedPerson).then(response => response.data)
}

export default {getAll,add,Delete,update}