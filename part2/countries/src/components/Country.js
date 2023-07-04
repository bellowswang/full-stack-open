import Weather from './Weather'

const CountryChild = ({ country, setShowCountry }) => {
    const countryName = country.name.common
    return (
        <div> {countryName} <button onClick={() => setShowCountry(country)}>show</button> </div>
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

const CountryProfile = ({ country }) => {
    const countryName = country.name.common
    const capital = country.capital
    const countryArea = country.area
    const countryLanguage = country.languages
    const countryFlagPng = country.flags.png
    const countryCapital = country.capital
    const countryCapitalLat = country.capitalInfo.latlng[0]
    const countryCapitalLon = country.capitalInfo.latlng[1]
    return (
        <div>
            <h1> {countryName} </h1>
            <div> capital {capital} </div>
            <div> area {countryArea} </div>
            <h3> languages: </h3>
            <LanguageBulletPoints data={countryLanguage} />
            <div>
                <img src={countryFlagPng} alt="Image" />
            </div>
            <h2> Weather in {countryCapital} </h2>
            <div>
                <Weather lat={countryCapitalLat} lon={countryCapitalLon} />
            </div>
        </div>
    )
}

const Country = ({ countries, newFilter, showCountry, setShowCountry }) => {
    const countriesFiltered = countries.filter(country => country.name.common.toLowerCase().includes(newFilter))
    const countriesNum = countriesFiltered.length
    if (Object.keys(showCountry).length > 0) {
        console.log('condition1')
        return(
            <CountryProfile country={showCountry} />
        )
    } else if (countriesNum <= 10 && countriesNum > 1 && Object.keys(showCountry).length === 0) {
        console.log('condition2')
        return (
            <div>
                {countriesFiltered.map(country =>
                    <CountryChild
                        key={country.name.common}
                        country={country}
                        setShowCountry={setShowCountry}
                    />
                )}
             </div>
        )
    } else if (countriesNum === 1 && Object.keys(showCountry).length === 0) {
        console.log('condition3')
        return (
            <CountryProfile country={countriesFiltered[0]} />
        )
    } else {
        console.log(showCountry)
        console.log(countriesNum)
        console.log('condition4')
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
}

export default Country