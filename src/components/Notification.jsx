const Notification = ({ message, className }) => (
  !message
    ? null
    : <p className={className}>{message}</p>
)

export default Notification