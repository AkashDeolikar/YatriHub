import { IsString, IsArray, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";

class FoodOrderItemDto {
  @IsString()
  name!: string;        

  @IsNumber()
  price!: number;       

  @IsNumber()
  quantity!: number;    
}

export class CreateFoodOrderDto {
  @IsString()
  userId!: string;      

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FoodOrderItemDto)
  items!: FoodOrderItemDto[];   
}