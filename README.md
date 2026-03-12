# ChatGPT Clone

A ChatGPT-style chat interface built with Next.js, featuring real-time streaming responses and multiple AI model support.

## Features

- 🎨 **ChatGPT-style UI** - Dark theme with message bubbles
- 🤖 **Multiple AI Models** - GPT-4o, Claude, Gemini, DeepSeek
- 📡 **Streaming Responses** - Real-time text streaming like ChatGPT
- 🎯 **Model Selector** - Switch between different AI models
- 📱 **Responsive Design** - Works on desktop and mobile
- ⚡ **Next.js Powered** - Modern React framework

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
4. Add your OpenRouter API key to `.env.local`:
   ```
   NEXT_PUBLIC_API_KEY=your_openrouter_api_key_here
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variable:
     - Name: `NEXT_PUBLIC_API_KEY`
     - Value: Your OpenRouter API key
   - Click "Deploy"

3. **Alternative: Vercel CLI**
   ```bash
   npm install -g vercel
   vercel
   ```
   Follow the prompts and add your API key when asked.

### Environment Variables

- `NEXT_PUBLIC_API_KEY` - Your OpenRouter API key

## Available Models

- **GPT-4o** - OpenAI's most capable model
- **Claude** - Anthropic's AI assistant  
- **Gemini** - Google's AI model
- **DeepSeek** - DeepSeek's AI model

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Main chat page
│   ├── components/
│   │   └── ChatMessage.tsx  # Message component
│   └── lib/
│       └── api.ts          # API integration
├── public/                 # Static assets
├── .env.local             # Environment variables (local)
├── .env.example           # Environment variables template
├── vercel.json            # Vercel configuration
└── package.json           # Dependencies and scripts
```

## API Integration

The app uses OpenRouter API to access multiple AI models. You need an API key from [OpenRouter](https://openrouter.ai).

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **OpenRouter API** - AI model access

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License
