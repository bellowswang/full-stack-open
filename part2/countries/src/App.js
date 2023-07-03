import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import countryService from './services/Countries'
import Country from './components/Country'

function App() {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response.data)
        console.log(countries)
      })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <div>
        <Country countries={countries} newFilter={newFilter.toLowerCase()}/>
      </div>
    </div>
  );
}

export default App;
