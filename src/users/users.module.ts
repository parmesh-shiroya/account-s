import { Module, Global } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema, UserRefrenceSchema, UserRefrence } from './users.schema';
import { FirebaseService } from 'src/shared/firebase';
import * as jwt from 'jsonwebtoken';
import { ROLES } from 'src/shared/constants';
@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: User.name,

    useFactory: () => {
      const schema = UserSchema;
      schema.methods.generateJWT = function (extra = {}): string {
        return jwt.sign(
          {
            _id: this.id,
            mobile: this.mobile,
            email: this.email,
            instituteId: this.instituteId,
            ...extra,
            role: ROLES.USER,

          },
          process.env.SECRET,
          { expiresIn: '365d' }
        );
      }
      return schema;
    }
  },
  { name: UserRefrence.name, useFactory: () => UserRefrenceSchema }])],
  controllers: [UsersController],
  providers: [UsersService, FirebaseService],
  exports: [UsersService]
})
export class UsersModule { }
