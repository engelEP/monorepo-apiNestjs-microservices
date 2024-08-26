import { IsArray, IsString, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    lastName: string;

    @IsString()
    @MinLength(1)
    email: string;

    @IsString()
    @MinLength(1)
    userName: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsArray()
    rolesId: number[];
}
