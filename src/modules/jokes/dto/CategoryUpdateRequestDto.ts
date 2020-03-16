import { IsNumber, IsBoolean } from "class-validator";
export class CategoryUpdateRequestDto {
  @IsNumber()
  id: number;
  @IsBoolean()
  isBanned: boolean;
}
