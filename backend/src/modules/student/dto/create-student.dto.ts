import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateStudentDto {

@IsString()
@IsNotEmpty()
FirstName : string;

@IsString()
@IsNotEmpty()
LastName : string;

@IsString()
@IsNotEmpty()
Class : string;

@IsString()
@IsNotEmpty()
City : string;

@IsDate()
@Type(() => Date)
DOB : Date;

@IsString()
@IsNotEmpty()
Grade : string
}


  