import { OpenRouter } from '@openrouter/agent';
import { tool } from '@openrouter/agent';
import { z } from 'zod';

export type Message = {
    role: "user" | "agent" | "assistant",
    content: string
}

export const createAgent = (agentName: string, instructions: string) => {
    return tool({
        name: agentName,
        description: instructions,
        inputSchema: z.object({ query: z.string() }),
        execute: async ({ query }) => {
            // Your search implementation
            return { results: ['...'] };
        },
    });
};

export const executeAgentChat = async (
    name: string,
    instruction: string,
    messages: Message[]
): Promise<string[]> => {
    const agent = createAgent(name, instruction);
    const openrouter = new OpenRouter();
    const results: string[] = [];

    for (const msg of messages) {
        const result = await openrouter.callModel({
            model: 'anthropic/claude-sonnet-4',
            input: msg.content,
            tools: [agent],
        });

        const text = await result.getText();
        results.push(text);
        console.log(text);
    }

    return results;
};