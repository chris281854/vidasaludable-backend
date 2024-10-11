import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "./roles.decoratos";
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Role } from "../../common/enums/rol.enums";



export function Auth(role: Role) {
    return applyDecorators(Roles([role]), UseGuards(AuthGuard, RolesGuard));
  }