import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { HttpService } from '@nestjs/axios';
import * as bcryptjs from "bcryptjs";
import { catchError, firstValueFrom } from 'rxjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const { email, password, ...rest } = createAuthDto;

    const { data } = await firstValueFrom(this.httpService.get(`${process.env.URLUSER}/users/${email}`,
    ).pipe(catchError(({ response: { data } }) => {
        throw data;
      }))
    );

    if (data) {
      throw new BadRequestException("Email already exists");
    }


    const hashedPassword = await bcryptjs.hash(password, 10);

    const { status, data: newUser } = await firstValueFrom(this.httpService.post(`${process.env.URLUSER}/users`, {
      ...rest,
      password: hashedPassword,
      email
    }
    ).pipe(catchError(({ response: { data } }) => {
        throw data;
      }))
    );

    if(status === 201)
      return {
        message: "User created successfully",
        id: newUser.id, 
        status
      };

    return {
      message: "Error create User",
      status
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const { data } = await firstValueFrom(this.httpService.get(`${process.env.URLUSER}/users/${email}`,
    ).pipe(catchError(({ response: { data } }) => {
        throw data;
      }))
    );

    if (!data) {
      throw new UnauthorizedException("Invalid email");
    }

    const isPasswordValid = await bcryptjs.compare(password, data.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password");
    }

    const payload = { 
      email: data.email,
      roles: data.roles.map(rol => rol.name)
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      email: data.email,
    };
  }
}
