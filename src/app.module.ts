import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonteController } from './monte/monte.controller';
import { MonteService } from './monte/monte.service';
import { openAIService } from './openAI/open-ai.service';
import OpenAI from 'openai';

@Module({
  imports: [],
  controllers: [AppController, MonteController],
  providers: [
    AppService, 
    MonteService, 
    openAIService,
    {
      provide: OpenAI,
      useFactory: () => {
        return new OpenAI();
      },
    },
  ],
})
export class AppModule {}
