const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  const baseStyle = {
    backgroundColor: "darkgray",
    borderRadius: "3px",
    margin: "3px"
    }
    const isSuccess = String(message).includes("Added")
    const messageStyle = {...baseStyle,
      color: isSuccess ? "darkgreen" : "darkred",
      border: isSuccess ?  "3px solid green ":"3px solid red",
    }
  return (
    <div style={messageStyle}>
      <h1>{message}</h1>
    </div>
  );
}
export default Notification;
