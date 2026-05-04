import Content from "./Content"
import Header from "./Header"
import Total from "./Total"



const Course = (props) => {
    const {course} = props
    
    return ( 
    <>

    {course.map((items) => {
        return (
        <div key={items.id}>
            <Header name={items.name} />
            <Content parts={items.parts} />
            <Total exercises={items.parts}/>
        </div>
        );
    })}
        </>
)
    
}
export default Course