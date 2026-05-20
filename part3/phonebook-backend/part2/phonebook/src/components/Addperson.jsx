const Addperson = (props) =>{
    return(
        <>
        <form onSubmit={props.handleAddingPerson}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange} />
        </div>
        number: <input value={props.newNumber} onChange={props.handleAddingNumber} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
        </>
    )
}

export default Addperson