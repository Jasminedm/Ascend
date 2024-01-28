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
  person.name.toLowerCase().includes(search.toLowerCase()))
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

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }
  const style = {
    color: isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}



const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null);


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
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        successNotification(`Person with id ${id} removed successfully!`);
      })
      .catch(error => {
        console.error("Error deleting person:", error)
        successNotification('Error deleting person', true);
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault();
  
    const existingPerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());
  
    if (existingPerson) {
      const confirmed = window.confirm(
        `${newName} is already added to the phonebook. Do you want to update the number?`
      );
  
      if (confirmed) {
        // Check if the person still exists on the server
        personService.getById(existingPerson.id)
          .then(() => {
            const updatedPerson = { ...existingPerson, number: newNumber };
  
            personService
              .update(existingPerson.id, updatedPerson)
              .then(() => {
                setPersons(persons.map((person) =>
                  person.id === existingPerson.id ? updatedPerson : person
                ));
                setNewName('');
                setNewNumber('');
                successNotification(`Contact '${existingPerson.name}' updated successfully!`);
              })
              .catch((error) => {
                console.error('Error updating person:', error);
                successNotification('Error updating person', true);
              });
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              // Handle 404 error (person not found on the server)
              successNotification('Person not found on the server. Unable to update.', true);
            } else {
              // Handle other errors
              console.error('Error checking person existence:', error);
              successNotification('Error checking person existence', true);
            }
          });
      }
      
    } else {
      const newPerson = { name: newName, number: newNumber, id: (persons.length + 1).toString() };

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons([...persons, newPerson]);
          setNewName('');
          setNewNumber('');
          successNotification(`Person '${newPerson.name}' added successfully!`);
        })
        .catch(error => {
          console.error('Error adding person:', error);
          successNotification('Error adding person', true);
        });
    }
  };

  const successNotification = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };
    
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification?.message} isError={notification?.isError} />
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