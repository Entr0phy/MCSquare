import { BadRequestException, Body, Controller, Logger, Post } from "@nestjs/common";
import { PostPromptBody } from "./dto/monte.dto";
import { ChatCompletion } from "openai/resources";
import { MonteService } from "./monte.service";

@Controller('/monte')
export class MonteController {
    private readonly logger = new Logger(MonteController.name);
    constructor(private readonly monteService: MonteService) {}

    @Post()
    postPrompt(@Body() body: PostPromptBody): Promise<ChatCompletion> {
        try {
            return this.monteService.postPrompt(body);
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(error);
        }
    }

}