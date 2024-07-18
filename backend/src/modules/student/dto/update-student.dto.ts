import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";

export class UpdateStudentDto {

  @IsString()
  @IsOptional()
  FirstName?: string;

  @IsString()
  @IsOptional()
  LastName?: string;

  @IsString()
  @IsOptional()
  Class?: string;

  @IsString()
  @IsOptional()
  City?: string;

  @IsDate()
  @Type(()=>Date)
  @IsOptional()
  DOB?: Date;

  @IsString()
  @IsOptional()
  Grade?: string;
}
