import { Injectable, OnModuleInit } from "@nestjs/common";
import OpenAI from "openai";
import { PostPromptBody } from "../monte/dto/monte.dto";

@Injectable()
export class openAIService implements OnModuleInit {
    private openai: OpenAI;

    onModuleInit() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    private async generateText(prompt: string, instruction: string): Promise<OpenAI.Responses.Response> {
        const response = await this.openai.responses.create({
            model: 'gpt-4o-mini',
            instructions: instruction,
            input: prompt,
        });
        return response;
    }

    async runStimulation(body: PostPromptBody): Promise<OpenAI.Responses.Response[]> {
        const { prompt, instruction, numberOfStimulation } = body;
        const concurrency = 10;
        const results: OpenAI.Responses.Response[] = [];
        
        // Process in batches to control concurrency
        for (let i = 0; i < numberOfStimulation; i += concurrency) {
            const batchSize = Math.min(concurrency, numberOfStimulation - i);
            const batch = Array.from({ length: batchSize }, () => 
                this.generateText(prompt, instruction)
            );
            
            const batchResults = await Promise.all(batch);
            results.push(...batchResults);
            
            // Optional: Add small delay between batches to respect rate limits
            if (i + concurrency < numberOfStimulation) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
        
        return results;
    }
}