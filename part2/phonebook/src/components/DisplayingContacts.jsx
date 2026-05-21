const DisplayingContacts = (props) => {
  

  return (
    <>
      {props.searchResult.map((person) => (
        <div
          key={person.id}
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <h3>
            {person.name} {person.number}
          </h3>
          <button onClick={() => props.handledelete(person.name,person.id)}>Delete</button>
        </div>
      ))}
    </>
  );
};
export default DisplayingContacts;
