import { IsString, IsInt, IsNumber } from "class-validator";
import { categoryType, jokeType } from "./Joke";

export class SearchRequestDto {
  @IsNumber()
  size: number;

  category: categoryType | categoryType[];
  type: jokeType;
}
