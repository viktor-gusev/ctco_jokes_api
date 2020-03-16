import { IsNumber, IsBoolean } from "class-validator";
export class FlagUpdateRequestDto {
  @IsNumber()
  id: number;
  @IsBoolean()
  isActive: boolean;
}
