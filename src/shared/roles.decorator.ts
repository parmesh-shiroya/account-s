import { SetMetadata } from '@nestjs/common';
import { ROLES, ID_TYPE } from './constants';

export const Roles = (...roles: ROLES[]) => SetMetadata('roles', roles);
export const CheckAccess = (idPath: string, idRole: ID_TYPE) => SetMetadata('check_access', { idPath, idRole });