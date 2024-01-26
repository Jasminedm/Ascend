import React, { useState, useEffect } from 'react';


function App() {
    const [searchInput, setSearchInput] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      const searchCountry = async () => {
          try {
              const response = await fetch(`https://restcountries.com/v2/name/${searchInput}`);

              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }

              const data = await response.json();
              setResults(data);
              setError(null); // Reset error state if the request is successful
          } catch (error) {
              console.error('Error:', error.message);
              setError('An error occurred while fetching data.'); // Set an error message
          }
      };

      // Perform the search when searchInput changes
      if (searchInput.trim() !== '') {
          searchCountry();
      } else {
          // Handle the case where searchInput is empty (if needed)
          setResults([]);
          setError(null);
      }
  }, [searchInput]); // useEffect will run whenever searchInput changes

  const displayResults = () => {
      if (results.length > 10) {
          return <p>Too many matches. Please make your query more specific.</p>;
      } else if (results.length > 1) {
          return (
              <ul>
                  {results.map((country, index) => (
                      <li key={index}>{country.name}</li>
                  ))}
              </ul>
          );
      } else if (results.length === 1) {
          const country = results[0];
          return (
              <div>
                  <h2>{country.name}</h2>
                  <p>Capital: {country.capital}</p>
                  <p>Area: {country.area} sq km</p>
                  <p>Languages: {country.languages.map(lang => lang.name).join(', ')}</p>
                  <img src={country.flags[0]} alt={`${country.name} Flag`} />
              </div>
          );
      } else {
          return <p>No matching countries found.</p>;
      }
  };

  return (
      <div className="App">
          <h1>Country Information App</h1>
          <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter country name"
          />
          <div id="results">{displayResults()}</div>
      </div>
  );
}

export default App;
