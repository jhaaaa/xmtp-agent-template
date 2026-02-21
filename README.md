# XMTP Agent Template

A generic XMTP agent that reads its personality from environment variables. Designed to be deployed via [Agent Launcher](https://github.com/jhaaaa/agent-launcher) — no code changes needed.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `SYSTEM_PROMPT` | No | The agent's personality (default: "You are a helpful assistant.") |
| `AI_PROVIDER` | No | `"claude"` or `"openai"` (default: `"claude"`) |
| `ANTHROPIC_API_KEY` | If claude | Your Anthropic API key |
| `OPENAI_API_KEY` | If openai | Your OpenAI API key |
| `XMTP_WALLET_KEY` | Yes | Private key for the agent's XMTP identity |
| `XMTP_DB_ENCRYPTION_KEY` | Yes | Encryption key for local message database |
| `XMTP_ENV` | Yes | XMTP network (`production` or `dev`) |
| `XMTP_DB_DIRECTORY` | No | Path for persistent data (default: current dir) |

## Local Development

```bash
npm install
cp .env.example .env  # fill in your keys
npm run dev
```

## How It Works

The agent connects to the XMTP network and listens for messages. When a message arrives, it sends the text to the configured AI provider along with the system prompt, then replies with the AI's response.
