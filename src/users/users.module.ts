import { Module, Global } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema, UserRefrenceSchema, UserRefrence } from './users.schema';
import { FirebaseService } from 'src/shared/firebase';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: UserRefrence.name, schema: UserRefrenceSchema }])],
  controllers: [UsersController],
  providers: [UsersService, FirebaseService],
  exports: [UsersService]
})
export class UsersModule { }
