// import { SetMetadata } from "@nestjs/common";

// export const ROLES_KEY = "roles";

// export const Roles = (...roles: string[]) =>
//   SetMetadata(ROLES_KEY, roles);
import { SetMetadata } from "@nestjs/common";
import { Role } from "src/modules/auth/role.enum";

export const ROLES_KEY = "roles";
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
