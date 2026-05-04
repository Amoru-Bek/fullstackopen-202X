const Total = (props) => {
    const total = props.exercises.reduce((sum,item) => sum + item.exercises ,0 )
    return (
        <h4>Total of {total} exercises</h4>
    )
}
export default Total