import { useEffect, useState } from "react";
import Search from "./components/search";
import Notification from "./components/Notification"
import Addperson from "./components/Addperson";
import DisplayingContacts from "./components/DisplayingContacts";
import axios from "axios";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchVaule, setSearchValue] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [message,setMessage]= useState(null);

  const fetchPersons = () => {
    personServices.getAll().then((persons) => {
      setPersons(persons);
    });
  };
  useEffect(fetchPersons, []);

  const handleAddingPerson = (event) => {
    event.preventDefault();

    if (newName === "" || newNumber === "") {
      alert(`Please enter a valid contact information`);
      return;
    }

    const existingPerson = persons.find(p => p.name === newName)
    const newObject = { name: newName, number: newNumber };
    if (existingPerson){
      const changedPerson = {...existingPerson, number:newNumber} 
      if (
        window.confirm(
          newName +
            "is already added to phonebook, replace the old number with a new one ?",
        )
      ) {
        personServices.update(changedPerson,existingPerson.id)
        .then(fetchPersons)
        .catch( () =>
          {setMessage("Information of "+existingPerson.name + " have already been removed from the server")
          fetchPersons}
        )
      }
    }
    else
      {personServices
      .add(newObject)
      .then(
        (newPerson) => 
          { setMessage("Added "+newPerson.name)
            console.log(message)
            setPersons(persons.concat(newPerson))
          
          setTimeout(()=>{
            setMessage(null)
          },3000)}
      );
}
    setNewNumber("");
    setNewName("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleAddingNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    if (event.target.value === "") {
      setSearchValue("");
      setShowSearch(false);
    } else {
      setSearchValue(event.target.value);
      setShowSearch(true);
    }
  };

  const searchResult = showSearch
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchVaule.toLowerCase()),
      )
    : persons;

  const handledelete = (name, id) => {
    if (window.confirm("Delete " + name + "?")) {
      personServices.Delete(id).then(fetchPersons);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}></Notification>
      <Search handleSearch={handleSearch} searchVaule={searchVaule} />
      <h3>Add a new contact</h3>
      <Addperson
        handleAddingPerson={handleAddingPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleAddingNumber={handleAddingNumber}
      />
      <h2>Numbers</h2>
      <DisplayingContacts
        handledelete={handledelete}
        searchResult={searchResult}
        newName={newName}
      />
    </div>
  );
};

export default App;
