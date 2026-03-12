# ChatGPT Clone

A ChatGPT-style chat interface with streaming responses, multiple AI models, and dark theme.

## Features

- 🎨 **Dark Theme** - Modern ChatGPT-inspired design
- 🤖 **Multiple AI Models** - GPT-4o, Claude, Gemini, DeepSeek
- 📱 **Responsive Design** - Works on desktop and mobile
- ⚡ **Streaming Responses** - Real-time typewriter effect
- 🔄 **Model Switching** - Switch between AI models instantly
- 💬 **Message History** - Full conversation context

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **API**: OpenRouter API
- **Styling**: Custom CSS with animations
- **Deployment**: Vercel

## Quick Start

1. Clone the repository
2. Open `index.html` in your browser
3. Start chatting!

For local development:
```bash
python -m http.server 3000
```

## Deployment to Vercel

### Option 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Option 2: Vercel Dashboard
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Option 3: Direct Upload
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Upload your project files
4. Deploy

## Configuration

The app uses OpenRouter API for AI responses. Update the API key in `script.js`:

```javascript
this.apiKey = 'your-api-key-here';
```

## Available Models

- **GPT-4o** - OpenAI's most capable model
- **Claude** - Anthropic's AI assistant
- **Gemini** - Google's AI model
- **DeepSeek** - DeepSeek's AI model

## Environment Variables (Optional)

Create `.env` file for production:
```
VITE_API_KEY=your-openrouter-api-key
```

## Project Structure

```
chatbot-clone/
├── index.html          # Main HTML file
├── styles.css          # Styling and animations
├── script.js          # Main JavaScript logic
├── vercel.json        # Vercel configuration
├── package.json        # Dependencies (for Next.js version)
└── README.md          # This file
```

## Features in Detail

### Streaming Responses
- Real-time text generation
- Typewriter effect
- Auto-scrolling
- Error handling

### Model Selection
- Dropdown selector in header
- Instant model switching
- Confirmation messages
- Model-specific responses

### Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Adaptive layouts
- Smooth animations

## License

MIT License - feel free to use this project for your own chat applications!
