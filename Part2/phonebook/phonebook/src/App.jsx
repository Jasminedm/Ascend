import { useState } from 'react'

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

const Persons = ({ persons, search }) => {
  const filteredPersons = persons.filter((person) =>
  person.name.toLowerCase().includes(search.toLowerCase())
)

return(
  <ul>
    {filteredPersons.map((person) => (
      <li key={person.name}>{person.name} - {person.number}</li>
    ))}
  </ul>
)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {name: newName, number: newNumber, id: persons.length + 1};
    
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook.`);
    } else {
      setPersons([...persons, newPerson]);
      setNewName('');
      setNewNumber('')
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
      <Persons persons={persons} search={search} />
    </div>
  )
}

export default App