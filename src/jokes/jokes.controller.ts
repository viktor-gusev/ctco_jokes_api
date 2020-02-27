import {Body, Controller, Get, HttpCode, Post, UseGuards, UsePipes, ValidationPipe, Put} from "@nestjs/common";
import {SearchRequestDto} from "./dto/SearchRequestDto";
import {SearchResponseDto} from "./dto/SearchResponseDto";
import {JokesService} from "./jokes.service";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {CategoryUpdateRequestDto} from "./dto/CategoryUpdateRequestDto";
import {FlagUpdateRequestDto} from "./dto/FlagUpdateRequestDto";

@Controller()
export class JokesController {
    constructor(private readonly  jokesService: JokesService) {
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

    @Get('/categories')
    @UseGuards(JwtAuthGuard)
    async getCategories() {
        return this.jokesService.searchCategories();
    }

    @Get('/flags')
    @UseGuards(JwtAuthGuard)
    async getFlags() {
        return this.jokesService.searchFlags();
    }

    @Put('/category')
    @HttpCode(204)
    @UsePipes(ValidationPipe)
    async updateCategory(@Body() request: CategoryUpdateRequestDto) {
        await this.jokesService.updateCategory(request.id, request.isBanned);
    }

    @Put('/flag')
    @HttpCode(204)
    @UsePipes(ValidationPipe)
    async updateFlag(@Body() request: FlagUpdateRequestDto) {
        await this.jokesService.updateFlag(request.id, request.isActive);
    }

}
