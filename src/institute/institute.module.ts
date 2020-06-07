import { Module } from '@nestjs/common';
import { InstituteController } from './institute.controller';
import { InstituteService } from './institute.service';
import { InstituteUserService } from './institute-user.service';
import { InstituteSchema, InstituteUserSchema, Institute, InstituteUser } from './institute.schema';
import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';
@Module({
  imports: [MongooseModule.forFeatureAsync([
    {
      name: Institute.name,
      useFactory: () => InstituteSchema
    },
    {
      name: InstituteUser.name,
      useFactory: () => {
        const schema = InstituteUserSchema;
        schema.pre('save', async function (next: mongoose.HookNextFunction) {
          if (this['password'] && this.isModified('password')) {
            this['password'] = await bcrypt.hash(this['password'], +process.env.SALT_ROUND)
          }
          next();
        });
        return schema;
      }
    }
  ])],
  controllers: [InstituteController],
  providers: [InstituteService, InstituteUserService]
})
export class InstituteModule { }
