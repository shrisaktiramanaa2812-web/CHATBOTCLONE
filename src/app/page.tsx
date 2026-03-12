'use client'

import { useState, useRef, useEffect } from 'react'
import ChatMessage from '@/components/ChatMessage'
import { sendMessage } from '@/lib/api'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [selectedModel, setSelectedModel] = useState('gpt-4o')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }, [inputText])

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    try {
      const response = await sendMessage(inputText.trim(), selectedModel)
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error while processing your request. Please try again.',
        sender: 'ai',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleModelChange = (model: string) => {
    setSelectedModel(model)
    
    const modelMessages = {
      'gpt-4o': "Switched to GPT-4o. I'm now using OpenAI's most capable model.",
      'claude': "Switched to Claude. I'm now using Anthropic's AI assistant.",
      'gemini': "Switched to Gemini. I'm now using Google's AI model.",
      'deepseek': "Switched to DeepSeek. I'm now using DeepSeek's AI model."
    }
    
    const systemMessage: Message = {
      id: Date.now().toString(),
      text: modelMessages[model as keyof typeof modelMessages],
      sender: 'ai',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, systemMessage])
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="header-content">
          <div className="chat-title">ChatGPT Clone</div>
          <div className="header-right">
            <select 
              value={selectedModel} 
              onChange={(e) => handleModelChange(e.target.value)}
              className="model-selector"
            >
              <option value="gpt-4o">GPT-4o</option>
              <option value="claude">Claude</option>
              <option value="gemini">Gemini</option>
              <option value="deepseek">DeepSeek</option>
            </select>
            <div className="chat-status">● Online</div>
          </div>
        </div>
      </div>
      
      <div className="chat-messages">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="message ai-message">
            <div className="message-avatar">AI</div>
            <div className="message-content">
              <div className="message-bubble">
                <div className="typing-dots">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
              <div className="message-time">
                {new Date().toLocaleTimeString('en-US', { 
                  hour: 'numeric', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input-container">
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="message-input"
            rows={1}
            disabled={isLoading}
          />
          <button 
            onClick={handleSendMessage} 
            className="send-button"
            disabled={!inputText.trim() || isLoading}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
