import {Injectable} from '@nestjs/common';
import fetch from 'node-fetch';
import {categoryType, JOKE_TYPE_TWOPART, jokeType} from "./dto/Joke";

const JOKES_ENDPOINT = 'https://sv443.net/jokeapi/v2/joke/';

@Injectable()
export class AppService {

    async retrieveJokes(size: number, category?: categoryType[], type?: jokeType[]): Promise<string[]> {
        const promises = [];
        for (let i = 0; i < size; i++) {
            promises.push(this.retrieveJoke(category, type));
        }
        const jokesRaw = await Promise.all(promises);
        const result = jokesRaw.map(this.processJoke);
        return result;
    }

    private async retrieveJoke(category?: categoryType[], type?: jokeType[]): Promise<any> {
        const url = `${JOKES_ENDPOINT}${category.join(',')}/${type ? '?type=' + type : ''}`;
        const jokeJson = await fetch(url);
        return jokeJson.json();
    }

    private processJoke(joke: any): string {
        console.log(joke)
        if (!joke) {
            return 'Ooops';
        }
        if (joke.type === JOKE_TYPE_TWOPART) {
            return `${joke.setup} ${joke.delivery}`;
        }
        return joke.joke;
    }

}
