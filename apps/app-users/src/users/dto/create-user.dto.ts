import { IsArray, IsString, MinLength } from "class-validator";

export class CreateUserDto {
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

    @IsString()
    avatar: string;

    @IsArray()
    rolesId: number[];
}
