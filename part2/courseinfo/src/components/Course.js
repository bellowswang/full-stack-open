const Course = (props) => {

    const {course} = props

    const Header = (props) => {
      const {name} = props
      return (
        <h1>{name}</h1>
      )
    }
  
    const Part = (props) => {
      const {part, exercise} = props
      return (
        <p> {part} {exercise} </p>
      )
    }
  
    const Content = (props) => {
      const {parts} = props
      return (
        <div>
          {parts.map((cr, i) => 
              <Part key={i} part={cr.name} exercise={cr.exercises} />
          )}
        </div>
      )
    }

    const Total = (props) => {
      const {parts} = props
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
        <Header name={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }

export default Course