import "dotenv/config";
import { Agent } from "@xmtp/agent-sdk";

const SYSTEM_PROMPT =
  process.env.SYSTEM_PROMPT || "You are a helpful assistant.";
const AI_PROVIDER = process.env.AI_PROVIDER || "claude";

async function think(input: string): Promise<string> {
  if (AI_PROVIDER === "openai") {
    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI();
    const r = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: input },
      ],
    });
    return r.choices[0]?.message?.content ?? "Sorry, I couldn't process that.";
  }

  const Anthropic = (await import("@anthropic-ai/sdk")).default;
  const anthropic = new Anthropic();
  const r = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: input }],
  });
  const block = r.content[0];
  return block?.type === "text"
    ? block.text
    : "Sorry, I couldn't process that.";
}

const agent = await Agent.createFromEnv();

agent.on("text", async (ctx) => {
  const response = await think(ctx.message.content);
  await ctx.conversation.sendText(response);
});

agent.on("start", () => console.log(`Agent online: ${agent.address}`));
agent.on("unhandledError", (error) => console.error("Error:", error));
await agent.start();
