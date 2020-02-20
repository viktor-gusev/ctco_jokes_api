import {Body, Controller, HttpCode, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {AppService} from './app.service';
import {SearchRequestDto} from "./dto/SearchRequestDto";
import {SearchResponseDto} from "./dto/SearchResponseDto";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Post()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async main(@Body() searchRequest: SearchRequestDto): Promise<SearchResponseDto> {
        const size = Math.min(searchRequest.size, 50);
        const category = Array.isArray(searchRequest.category) ? searchRequest.category : [searchRequest.category];
        const type = Array.isArray(searchRequest.type) ? searchRequest.type : [searchRequest.type];

        const jokes = await this.appService.retrieveJokes(size, category, type);
        return {jokes};
    }
}
