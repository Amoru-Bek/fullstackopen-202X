const Search = (props)=>{
    return (
    <>
    search: <input value={props.searchVaule} onChange={props.handleSearch}/>
    </>)
}
export default Search