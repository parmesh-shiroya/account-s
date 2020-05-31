import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

import { MongooseModule } from '@nestjs/mongoose';
import { AdminUserSchema, AdminRoleSchema } from './admin.schema'
@Module({
  imports: [MongooseModule.forFeature([{ name: "AdminRole", schema: AdminRoleSchema }, { name: "AdminUser", schema: AdminUserSchema }])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule { }
