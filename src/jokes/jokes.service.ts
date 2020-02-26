import {Injectable} from '@nestjs/common';
import fetch from 'node-fetch';
import {categoryType, JOKE_TYPE_SINGLE, JOKE_TYPE_TWOPART, jokeType} from "./dto/Joke";
import {Flag} from "./entities/flag.entity";
import {Category} from "./entities/category.entity";

const JOKES_ENDPOINT = 'https://sv443.net/jokeapi/v2/joke/';

@Injectable()
export class JokesService {

    async retrieveJokes(size: number, category?: categoryType[], type?: jokeType[]): Promise<string[]> {
        const [categories, flags] = await Promise.all([this.getCategories(), this.getFlags()]);

        // merge categories
        let searchCategories: string[] = [];
        if (category && category.length > 0) {
            searchCategories = category.filter(el => categories.indexOf(el.toLowerCase()) >= 0)
        } else {
            searchCategories = searchCategories.concat(categories)
        }

        const promises = [];
        for (let i = 0; i < size; i++) {
            promises.push(this.retrieveJoke(searchCategories, type, flags));
        }
        const jokesRaw = await Promise.all(promises);
        const result = jokesRaw.map(this.processJoke);
        return result;
    }

    private async retrieveJoke(
        category?: string[],
        type: jokeType[] = [JOKE_TYPE_SINGLE, JOKE_TYPE_TWOPART],
        flags?: string[]
    ): Promise<any> {
        const url = `${JOKES_ENDPOINT}${category.join(',')}`
            + `/${type ? '?type=' + type.join(',') : ''}`
            + `${flags ? '?flags=' + flags.join(',') : ''}`;
        const jokeJson = await fetch(url);
        return jokeJson.json();
    }

    private processJoke(joke: any): string {
        if (!joke) {
            return 'Ooops';
        }
        if (joke.type === JOKE_TYPE_TWOPART) {
            return `${joke.setup} ${joke.delivery}`;
        }
        return joke.joke;
    }

    private async getCategories(): Promise<string[]> {
        const categories: Category[] = await Category.find({where: {isBanned: false}});
        return categories.map(el => el.name)
    }

    private async getFlags(): Promise<string[]> {
        const categories: Flag[] = await Flag.find({where: {isActive: true}});
        return categories.map(el => el.name)
    }

}
