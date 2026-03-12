class ChatInterface {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.modelSelector = document.getElementById('modelSelector');
        
        this.apiKey = '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';
        this.baseUrl = 'https://openrouter.ai/api/v1/chat/completions';
        
        this.initEventListeners();
        this.autoResizeTextarea();
    }
    
    initEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        this.messageInput.addEventListener('input', () => {
            this.autoResizeTextarea();
            this.updateSendButton();
        });
        
        document.addEventListener('DOMContentLoaded', () => {
            this.messageInput.focus();
        });
        
        this.modelSelector.addEventListener('change', () => {
            this.onModelChange();
        });
    }
    
    autoResizeTextarea() {
        this.messageInput.style.height = 'auto';
        this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
    }
    
    updateSendButton() {
        const hasText = this.messageInput.value.trim().length > 0;
        this.sendButton.disabled = !hasText;
    }
    
    sendMessage() {
        const message = this.messageInput.value.trim();
        
        if (!message) return;
        
        this.addUserMessage(message);
        this.messageInput.value = '';
        this.autoResizeTextarea();
        this.updateSendButton();
        
        setTimeout(() => {
            this.showTypingIndicator();
            this.callAIAPI(message);
        }, 500);
    }
    
    addUserMessage(text) {
        const messageDiv = this.createMessageElement('user', text);
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addAIResponse(text) {
        const messageDiv = this.createMessageElement('ai', text);
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    createMessageElement(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'ai' ? 'AI' : 'You';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = text;
        
        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = this.getCurrentTime();
        
        bubble.appendChild(messageText);
        content.appendChild(bubble);
        content.appendChild(time);
        
        if (sender === 'ai') {
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(content);
        } else {
            messageDiv.appendChild(content);
            messageDiv.appendChild(avatar);
        }
        
        return messageDiv;
    }
    
    showTypingIndicator() {
        const existingIndicator = document.querySelector('.typing-indicator');
        if (existingIndicator) {
            existingIndicator.classList.add('active');
            return;
        }
        
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator active';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = 'AI';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        
        const dots = document.createElement('div');
        dots.className = 'typing-dots';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            dots.appendChild(dot);
        }
        
        bubble.appendChild(dots);
        content.appendChild(bubble);
        
        typingIndicator.appendChild(avatar);
        typingIndicator.appendChild(content);
        
        this.chatMessages.appendChild(typingIndicator);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.classList.remove('active');
            setTimeout(() => {
                typingIndicator.remove();
            }, 300);
        }
    }
    
    generateAIResponse(userMessage) {
        const responses = [
            "That's an interesting question! Let me think about that...",
            "I understand what you're asking. Here's my perspective on that topic.",
            "Great point! I'd be happy to help you with that.",
            "That's a thoughtful observation. Let me share some insights with you.",
            "I see what you mean. Here's how I would approach that situation.",
            "Thanks for sharing that with me. Let me provide you with some information.",
            "That's a valid concern. Let me help you work through that.",
            "I appreciate you asking! Here's what I think about that."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
            return "Hello! It's great to hear from you. How can I assist you today?";
        } else if (userMessage.toLowerCase().includes('how are you')) {
            return "I'm doing well, thank you for asking! I'm here and ready to help you with any questions or tasks you might have.";
        } else if (userMessage.toLowerCase().includes('bye') || userMessage.toLowerCase().includes('goodbye')) {
            return "Goodbye! It was nice chatting with you. Feel free to come back anytime you need assistance!";
        } else if (userMessage.toLowerCase().includes('help')) {
            return "I'm here to help! You can ask me questions, have conversations, or discuss various topics. What would you like to know?";
        }
        
        return randomResponse;
    }
    
    onModelChange() {
        const selectedModel = this.modelSelector.value;
        console.log(`Model changed to: ${selectedModel}`);
        
        const modelResponses = {
            'gpt-4o': "Switched to GPT-4o. I'm now using OpenAI's most capable model.",
            'claude': "Switched to Claude. I'm now using Anthropic's AI assistant.",
            'gemini': "Switched to Gemini. I'm now using Google's AI model.",
            'deepseek': "Switched to DeepSeek. I'm now using DeepSeek's AI model."
        };
        
        this.addSystemMessage(modelResponses[selectedModel]);
    }
    
    async callAIAPI(userMessage) {
        try {
            const selectedModel = this.modelSelector.value;
            const modelMapping = {
                'gpt-4o': 'openai/gpt-4o',
                'claude': 'anthropic/claude-3-5-sonnet',
                'gemini': 'google/gemini-pro',
                'deepseek': 'deepseek/deepseek-chat'
            };
            
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'ChatGPT Clone'
                },
                body: JSON.stringify({
                    model: modelMapping[selectedModel],
                    messages: [
                        {
                            role: 'user',
                            content: userMessage
                        }
                    ],
                    max_tokens: 1000,
                    temperature: 0.7,
                    stream: true
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.hideTypingIndicator();
            await this.handleStreamingResponse(response);
            
        } catch (error) {
            console.error('API Error:', error);
            this.hideTypingIndicator();
            this.addAIResponse('Sorry, I encountered an error while processing your request. Please try again.');
        }
    }
    
    async handleStreamingResponse(response) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        
        // Create initial message element
        const messageDiv = this.createStreamingMessageElement();
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        
        const messageTextElement = messageDiv.querySelector('.message-text');
        
        try {
            while (true) {
                const { done, value } = await reader.read();
                
                if (done) break;
                
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';
                
                for (const line of lines) {
                    if (line.trim() === '') continue;
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') return;
                        
                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices?.[0]?.delta?.content;
                            if (content) {
                                messageTextElement.textContent += content;
                                this.scrollToBottom();
                            }
                        } catch (e) {
                            // Ignore parsing errors for malformed chunks
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Streaming error:', error);
            messageTextElement.textContent += '\n\nError: Stream interrupted. Please try again.';
        }
    }
    
    createStreamingMessageElement() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai-message';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = 'AI';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = '';
        
        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = this.getCurrentTime();
        
        bubble.appendChild(messageText);
        content.appendChild(bubble);
        content.appendChild(time);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        return messageDiv;
    }
    
    addSystemMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'system-message';
        messageDiv.style.cssText = 'text-align: center; color: #6b7280; font-size: 12px; margin: 16px 0; font-style: italic;';
        messageDiv.textContent = text;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

const chatInterface = new ChatInterface();
