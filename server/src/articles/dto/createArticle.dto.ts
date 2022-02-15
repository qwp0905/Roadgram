import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateArticleDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  
  @IsNotEmpty()
  @IsArray()
  road: [];

  @IsNotEmpty()
  @IsArray()
  tag: [];

  @IsNotEmpty()
  @IsString() 
  content: string;

  @IsNotEmpty()
  @IsString() 
  thumbnail: string;
  
  @IsNotEmpty()
  @IsNumber()
  loginmethod: number;
}