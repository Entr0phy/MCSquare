import { Injectable, OnModuleInit } from "@nestjs/common";
import OpenAI from "openai";

@Injectable()
export class openAIService implements OnModuleInit {
    private openai: OpenAI;

    onModuleInit() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async generateText(prompt: string): Promise<OpenAI.Chat.Completions.ChatCompletion> {
        const response = await this.openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
        });
        return response;
    }
}