import { Injectable } from "@nestjs/common";
import { openAIService } from "src/openAI/open-ai.service";
import { PostPromptBody } from "./dto/monte.dto";
import { ChatCompletion } from "openai/resources";

@Injectable()
export class MonteService {
    constructor(private readonly openaiService: openAIService) {}

    async postPrompt(body: PostPromptBody): Promise<ChatCompletion> {
        const response = await this.openaiService.generateText(body.prompt);
        return response;
    }
}