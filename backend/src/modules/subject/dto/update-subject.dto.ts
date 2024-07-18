import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UpdateSubjectDto {

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    Maths?: number;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    Chemistry?: number;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    Physics?: number;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    ComputerScience?: number;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    StudentID?: number

}
