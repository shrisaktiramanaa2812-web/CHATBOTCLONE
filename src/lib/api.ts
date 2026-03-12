const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'your_api_key_here'
const BASE_URL = 'https://openrouter.ai/api/v1/chat/completions'

const modelMapping = {
  'gpt-4o': 'openai/gpt-4o',
  'claude': 'anthropic/claude-3-5-sonnet',
  'gemini': 'google/gemini-pro',
  'deepseek': 'deepseek/deepseek-chat'
}

export async function sendMessage(message: string, model: string): Promise<string> {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : '',
        'X-Title': 'ChatGPT Clone'
      },
      body: JSON.stringify({
        model: modelMapping[model as keyof typeof modelMapping],
        messages: [
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
