import { useEffect, useState } from "react"
import searchServices from "../services/services"
import Weather from "./Weather"

const Search = () => {

    const [search,setSearch] = useState("")
    const [Allcountries,setAllcountries] = useState([])
    const[searchedCountries,setSearchedCountries] = useState([])


    const divStyle ={
        display: "flex",
        alignItems: "center",
        gap : "10px",
        marginTop : "6px"
    }
    
    
    const handleChange = (e)=>{
        setSearch(e.target.value)

    }

    const handleShow = (c) =>{setSearch(c)}
       

    useEffect(()=>{
        searchServices
        .Fetch()
        .then(data => {
        // console.log("useEffect is used");
        // console.log(data);
        setAllcountries(data)
        })
        .catch(err=> console.log("Fetch err",err))
    },[])

    useEffect ( ()=>{
        if (search === ""){
            setSearchedCountries([])
            return
        }
        else{
        setSearchedCountries(Allcountries.filter(country => country.name.common.toLowerCase().includes(search.toLocaleLowerCase())))
        // console.log(searchedCountries);
        }
        
        
    }, [search]) 

    

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return(
        <>
            <form action={handleSubmit}>
                <input onChange={handleChange} value={search} type="text" />
            </form>

            {searchedCountries.length > 10 &&(<h3>To many matches, specify another filter</h3>)}

            {searchedCountries.length < 10 && searchedCountries.length >= 2  && (
            searchedCountries.map(country => {
                    return(
                    <>
                        <div key={country != null && country.name.common} style={divStyle}>
                            <span >{country.name.common}</span>
                            <button onClick={()=>handleShow(country.name.common)}>Show</button>
                        </div>
                    </>)
            }))
            }
            {searchedCountries.length === 1  ? (
                <>
                    <h1>{searchedCountries[0].name.common}</h1>
                    <h3>Capital: {searchedCountries[0].capital}</h3>
                    <h3>Area: {searchedCountries[0].area}</h3>
                    <b><h2>Languages</h2></b>
                    <ul>
                        {Object.values(searchedCountries[0].languages).map(language =>{
                            return(<li key={language}>{language}</li>)
                        })}
                    </ul>
                    <img src={searchedCountries[0].flags.png} alt="" />
                    <Weather searchedCountries={searchedCountries}></Weather>
                </>
            ):null}
        </>
    )
}

export default Search