const PersonChild = (props) => {
    return (
        <div>{props.person.name} {props.person.number} <button onClick={() => props.deletePerson(props.person.id)}>delete</button></div>
    )
}

const Person = (props) =>{
    const personsFiltered = props.persons.filter(person => person.name.toLowerCase().includes(props.newFilter))
    return (
        <div>
            {personsFiltered.map(person =>
                <PersonChild key={person.name} person={person} deletePerson={props.deletePerson} />)}
        </div>
    )
}

export default Person