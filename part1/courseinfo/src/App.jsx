function Header(props) {
  return <h1>{props.name}</h1> ;
}
function Content(props){
  return (
    <>
      {/* {console.log(props)} */}
      {props.items.map((item) => {
        return <p key={item.name}>{item.name} {item.exercises}</p>
      })}
    </>
  );
}
const Total = (props) => {
  const total = props.exercises.reduce((sum,item) => sum + item.exercises, 0)
  // console.log(total)
  return <p>The number of exercises is {total}</p>
}

const App = () => {
  const course = { 
  name :'Half Stack application development',
  parts : [
  {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises:7
  },
  {
    name: 'State of component',
    exercises: 14
  }]}

  return (
    <div>
      <Header name={course.name} />
      <Content items={course.parts} />
      <Total exercises={course.parts} />
    </div>
  )
}

export default App