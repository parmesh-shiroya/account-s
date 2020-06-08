import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
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
      schema.methods.generateJWT = function (extra = {}): string {
        return jwt.sign(
          {
            _id: this.id,
            email: this.email,
            role: this.role,
            ...extra
          },
          process.env.SECRET,
          { expiresIn: '365d' }
        );
      }
      schema.methods.comparePassword = async function (password): Promise<boolean> {
        return bcrypt.compare(password, this.password)
      }
      return schema;
    }
    // schema: AdminUserSchema
  }])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule { }
