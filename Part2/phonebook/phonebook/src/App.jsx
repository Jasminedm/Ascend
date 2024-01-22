import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = ({ search, handleSearchChange }) => {
  return(
    <div>
      Search: <input value={search} onChange={handleSearchChange} />
    </div>
  )
}

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson}) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Persons = ({ persons, search, handleRemove }) => {
  const filteredPersons = persons.filter((person) =>
  person.name.toLowerCase().includes(search.toLowerCase())
)



return(
  <ul>
    {filteredPersons.map((person) => (
      <li key={person.name}>{person.name} - {person.number}
      <button onClick={() => handleRemove(person.id)}>Delete</button>
      </li>
    ))}
  </ul>
)
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleRemove = (id) => {
    console.log('Removing person with id:', id);
    if(window.confirm("Are you Sure?")) {
      personService.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.error("Error deleting person:", error)
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault();
  
    const existingPerson = persons.find((person) => person.name === newName);
  
    if (existingPerson) {
      const confirmed = window.confirm(
        `${newName} is already added to the phonebook. Do you want to update the number?`
      );
  
      if (confirmed) {
        const updatedPerson = { ...existingPerson, number: newNumber };
  
        personService.update(existingPerson.id, updatedPerson).then(() => {
          setPersons(persons.map((person) =>
            person.id === existingPerson.id ? updatedPerson : person
          ));
          setNewName('')
          setNewNumber('')
        });
      }
    } else {
      const newPerson = { name: newName, number: newNumber, id: (persons.length + 1).toString() };
  
      personService.create(newPerson).then(returnedPerson => {
        setPersons([...persons, newPerson]);
        setNewName('')
        setNewNumber('')
      });
    }
  };
    
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <PersonForm 
      newName={newName}
      newNumber={newNumber}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} handleRemove={handleRemove} />
    </div>
  )
}

export default App