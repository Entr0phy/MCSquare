import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import OpenAI from "openai";

export class PostPromptBody {
    @IsString()
    @IsNotEmpty()
    prompt: string;

    @IsString()
    @IsNotEmpty()
    instruction: string;

    @IsNumber()
    @IsNotEmpty()
    numberOfStimulation: number;
}

export class token {
    @IsNumber()
    @IsNotEmpty()
    inputTokens: number;

    @IsNumber()
    @IsNotEmpty()
    outputTokens: number;
}

export class openAiResponse {
    @IsString()
    @IsNotEmpty()
    response: string;

    @IsNotEmpty()
    @Type(() => token)
    @ValidateNested({ each: true })
    usage: token;
}

export class PostPromptResult {
    @IsString()
    @IsNotEmpty()
    instruction: string;

    @IsString()
    @IsNotEmpty()
    input: string;

   @IsNotEmpty()
   @Type(() => openAiResponse)
   @ValidateNested({ each: true })
   openAiResponse: openAiResponse[];
}