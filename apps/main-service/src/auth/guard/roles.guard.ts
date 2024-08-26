import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Role } from "../../constants/roles.enum.ts";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    let permission: boolean = false;
    const { user } = context.switchToHttp().getRequest();
    const handlerName = context.getHandler().name;
    const controllerName = context.getClass().name;

    if(user.roles?.includes(Role.ADMIN))
    return true

    const { data } = await firstValueFrom(this.httpService.get(`${process.env.URLUSER}/assets/${controllerName}`
    ).pipe(catchError(({ response: { data } }) => {
        throw data;
      }))
    );
    
    const [ roles ] = data?.filter((asset) => asset.name === handlerName)?.map((asset) => asset.roles);

    roles?.forEach(rol => {
      if(user.roles?.includes(rol.name))
        permission = true;
    });
    
    return permission;
  }
}