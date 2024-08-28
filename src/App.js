import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isValid, setisValid] = useState(true);
 
  useEffect(() => {
    // Fetch country data
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching the country data:', error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm)
    
  

  );

  return (
    <div>
     
      <input 
        type="text"
        placeholder="Search for countries..."
        value={searchTerm}
        onChange={handleSearch}
      />
  {filteredCountries.length > 0 ? (
 <div className="countryCard"> 
        {filteredCountries.map(country => (

              <div  className="countryCard" key={country.cca3}     style={{
                flexDirection:"column",
                padding:"10px",
                margin:"10px",
                border:"1px solid black",
                borderRadius:"8px",
                width:"200px",
                height:"200px"
            }}>
          <img 
              src={country.flags.png}
              alt={country.flags.alt} 
              style={{width:"100px",height:"100px"}}
             
             />
            
            {country.name.common}
           
         
          </div>
        ))}
         </div>
        
      ) : (
        <div>No countries found</div>
      )}
      
    
    </div>
  );
}

export default App;
