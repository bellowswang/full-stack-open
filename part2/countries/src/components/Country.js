const CountryChild = ( {country} ) => {
    return (
        <div> {country.name.common} </div>
    )
}

const LanguageBulletPoints = ({ data }) => {
    return (
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              {value}
            </li>
          ))}
        </ul>
      );
    };

const CountryProfile = ( {country} ) => {
    return (
        <div>
            <h1> {country.name.common} </h1>
            <div> capital {country.capital} </div>
            <div> area {country.area} </div>
            <h3> languages: </h3>
            <LanguageBulletPoints data={country.languages}/>
            <div>
                <img src={country.flags.png} alt="Image" />
            </div>
        </div>
    )
}

const Country = ( {countries, newFilter} ) => {
    const countriesFiltered = countries.filter(country => country.name.common.toLowerCase().includes(newFilter))
    const countriesNum = countriesFiltered.length
    if (countriesNum == 1) {
        return (
            <div>
                <CountryProfile country={countriesFiltered[0]} />
            </div>
        )
    } else if (countriesNum > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else {
        return (
            <div>
                {countriesFiltered.map(country =>
                    <CountryChild key={country.name.common} country={country}/>)}
            </div>
        )
    }
}

export default Country