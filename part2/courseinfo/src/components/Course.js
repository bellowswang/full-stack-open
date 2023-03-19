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
  
    const Content = () => {
      return (
        <div>
          {course.parts.map((cr, i) => 
              <Part key={i} part={cr.name} exercise={cr.exercises} />
          )}
        </div>
      )
    }
  
    return (
      <div>
        <Header name={course.name} />
        <Content />
      </div>
    )
  }

export default Course