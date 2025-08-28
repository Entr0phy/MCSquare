import { IsNotEmpty, IsString } from "class-validator";

export class PostPromptBody {
    @IsString()
    @IsNotEmpty()
    prompt: string;
}