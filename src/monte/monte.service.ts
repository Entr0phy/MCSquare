import { Injectable } from "@nestjs/common";
import { openAIService } from "src/openAI/open-ai.service";
import { PostPromptBody, PostPromptResult } from "./dto/monte.dto";
import OpenAI from "openai";

@Injectable()
export class MonteService {
    constructor(private readonly openaiService: openAIService) {}

    async postPrompt(body: PostPromptBody): Promise<PostPromptResult> {
        const response = await this.openaiService.runStimulation(body);
        const openAiResult = response.map((res) => {
            return {
                response: res.output_text,
                usage: {
                    inputTokens: res.usage?.input_tokens || 0,
                    outputTokens: res.usage?.output_tokens || 0,
                }
            }
        });
        return {
            instruction: body.instruction,
            input: body.prompt,
            openAiResponse: openAiResult,
        }
    }
}