import { useState } from 'react'

const CountryChild = ({ country, setShowCountry }) => {
    return (
        <div> {country.name.common} <button onClick={() => setShowCountry(country)}>show</button> </div>
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
    return (
        <div>
            <h1> {country.name.common} </h1>
            <div> capital {country.capital} </div>
            <div> area {country.area} </div>
            <h3> languages: </h3>
            <LanguageBulletPoints data={country.languages} />
            <div>
                <img src={country.flags.png} alt="Image" />
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