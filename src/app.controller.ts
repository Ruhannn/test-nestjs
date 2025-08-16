import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getRoot(): string {
    return 'hello ;3';
  }

  @Post('/fix-ai')
  @HttpCode(HttpStatus.OK)
  async askAi(@Body() body: { token: string; sentence: string }) {
    if (!body?.token || body.token !== process.env.TOKEN) {
      throw new HttpException(
        { success: false, message: 'Haha, who are you? 😼' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!body.sentence) {
      throw new HttpException(
        { success: false, message: 'No sentence provided' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const enhanced = await this.appService.askAI(body.sentence);

    return {
      success: true,
      message: 'Successfully fixed',
      enhanced,
    };
  }
}
