import { Module } from '@nestjs/common';
import { InstituteController } from './institute.controller';
import { InstituteService } from './institute.service';
import { InstituteUserService } from './institute-user.service';
import { InstituteSchema, InstituteUserSchema } from './institute.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Institute", schema: InstituteSchema }, { name: "InstituteUser", schema: InstituteUserSchema }])],
  controllers: [InstituteController],
  providers: [InstituteService, InstituteUserService]
})
export class InstituteModule { }
