function Content(props){
  return (
    <>
      {props.parts.map((item) => {
        return <p key={item.id}>{item.name} {item.exercises}</p>
      })}
    </>
  );
}

export default Content