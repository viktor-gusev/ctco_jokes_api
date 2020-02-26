import {Body, Controller, Get, HttpCode, Request, Post, UseGuards, UsePipes, ValidationPipe} from "@nestjs/common";
import {SearchRequestDto} from "./dto/SearchRequestDto";
import {SearchResponseDto} from "./dto/SearchResponseDto";
import {JokesService} from "./jokes.service";
import {AuthService} from "../auth/auth.service";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {LocalAuthGuard} from "../auth/guards/local-auth.guard";

@Controller()
export class JokesController {
    constructor(private readonly authService: AuthService, private readonly  jokesService: JokesService) {
    }

    @Post()
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async main(@Body() searchRequest: SearchRequestDto): Promise<SearchResponseDto> {
        const size = Math.min(searchRequest.size, 50);
        const category = Array.isArray(searchRequest.category) ? searchRequest.category : [searchRequest.category];
        const type = Array.isArray(searchRequest.type) ? searchRequest.type : [searchRequest.type];

        const categoryArr = category.filter(el => el && el.toLowerCase() !== 'any');
        const typeArr = type.filter(el => el);

        const jokes = await this.jokesService.retrieveJokes(size, categoryArr, typeArr);
        return {jokes};
    }

    @Post('auth/login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getTest(@Request() req) {
        return req.user;
    }
}