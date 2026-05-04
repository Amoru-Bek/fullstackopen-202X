import axios from "axios";

const baseurl = "https://studies.cs.helsinki.fi/restcountries/api/all"

const Fetch = ()=>{
    return axios.get(baseurl).then(response => response.data)
}

export default {Fetch}