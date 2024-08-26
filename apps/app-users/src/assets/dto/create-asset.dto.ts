import { IsArray, IsString } from "class-validator";

export class CreateAssetDto {
    @IsString()
    name: string;

    @IsString()
    url: string;
    
    @IsArray()
    rolesId: number[];
}
