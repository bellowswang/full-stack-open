import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import countryService from './services/Countries'
import Country from './components/Country'

function App() {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountry, setShowCountry] = useState({})

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    setShowCountry({})
  }

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <div>
        <Country
          countries={countries}
          newFilter={newFilter.toLowerCase()}
          showCountry={showCountry}
          setShowCountry={setShowCountry}/>
      </div>
    </div>
  );
}

export default App;
