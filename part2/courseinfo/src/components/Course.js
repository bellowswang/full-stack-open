const Course = (props) => {

    const { courses } = props

    const Header = (props) => {
        const { name } = props
        return (
            <h2>{name}</h2>
        )
    }

    const Part = (props) => {
        const { part, exercise } = props
        return (
            <p> {part} {exercise} </p>
        )
    }

    const Content = (props) => {
        const { parts } = props
        return (
            <div>
                {parts.map((cr) =>
                    <Part key={cr.id} part={cr.name} exercise={cr.exercises} />
                )}
            </div>
        )
    }

    const Total = (props) => {
        const { parts } = props
        const sum = parts.reduce(
            (accumulator, currentValue) => accumulator + currentValue.exercises,
            0,
        );
        return (
            <p>
                <b>
                    total of {sum} exercises
                </b>
            </p>
        )
    }

    return (
        <div>
            <Header name={courses.name} />
            <Content parts={courses.parts} />
            <Total parts={courses.parts} />
        </div>
    )
}

export default Course