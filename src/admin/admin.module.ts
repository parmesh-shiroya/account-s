import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import * as bcrypt from 'bcryptjs';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminUserSchema, AdminUser } from './admin.schema'
import * as mongoose from 'mongoose';
@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: AdminUser.name,
    useFactory: () => {
      const schema = AdminUserSchema;
      schema.pre('save', async function (next: mongoose.HookNextFunction) {
        if (this['password'] && this.isModified('password')) {
          this['password'] = await bcrypt.hash(this['password'], +process.env.SALT_ROUND)
        }
        next();
      });
      return schema;
    }
    // schema: AdminUserSchema
  }])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule { }
