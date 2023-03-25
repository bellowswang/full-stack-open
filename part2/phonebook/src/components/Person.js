const PersonChild = (props) => {
    const { person } = props
    return (
        <div>{person.name} {person.number}</div>
    )
}

const Person = (props) =>{
    const personsFiltered = props.persons.filter(person => person.name.toLowerCase().includes(props.newFilter))
    return (
        <div>
            {personsFiltered.map(person =>
                <PersonChild key={person.name} person={person} />)}
        </div>
    )
}

export default Person