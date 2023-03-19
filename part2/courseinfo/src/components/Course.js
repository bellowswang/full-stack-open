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
                {parts.map((cr, i) =>
                    <Part key={i} part={cr.name} exercise={cr.exercises} />
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
            <h1>Web development curriculum</h1>
            {courses.map((course, j, k, l) =>
                <div>
                    <Header key={j} name={course.name} />
                    <Content key={k} parts={course.parts} />
                    <Total key={l} parts={course.parts} />
                </div>
            )}
        </div>
    )
}

export default Course