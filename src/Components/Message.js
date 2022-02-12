const Message = ({ messege, setMessege }) => {
    setTimeout(() => {
        setMessege(null)
    }, 5000);
    return (
        <div className="message">
            {messege}
        </div>)
}
export default Message