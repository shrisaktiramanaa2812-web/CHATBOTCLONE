interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <div className={`message ${message.sender}-message`}>
      <div className="message-avatar">
        {message.sender === 'ai' ? 'AI' : 'You'}
      </div>
      <div className="message-content">
        <div className="message-bubble">
          <div className="message-text">{message.text}</div>
        </div>
        <div className="message-time">{formatTime(message.timestamp)}</div>
      </div>
    </div>
  )
}
