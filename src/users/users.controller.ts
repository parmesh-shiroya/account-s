import { Controller, Post, UsePipes, ValidationPipe, Get, Query, UseGuards, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { InsertUserDTO, UserLoginDTO, UpdateUserDTO } from './users.dto';
import { FirebaseService } from '../shared/firebase';
import { ROLES } from 'src/shared/constants';
import { AuthGuard } from 'src/shared/auth.gaurd';
@Controller()
export class UsersController {

    constructor(private readonly firebaseService: FirebaseService, private readonly userService: UsersService) { }

    @Post('institute/:insId/users')
    @UsePipes(new ValidationPipe())
    @UseGuards(new AuthGuard([ROLES.INSTITUTE_ADMIN]))
    async registerUser(@Param('insId') insId: string, insertUserDTO: InsertUserDTO) {
        insertUserDTO.instituteId = insId
        return await this.userService.insert(insertUserDTO)
    }

    @Post('users/login')
    @UsePipes(new ValidationPipe())
    async loginUser(userLoginDTO: UserLoginDTO) {
        let fAccountData = await this.firebaseService.verifyGoogleLoginToken(userLoginDTO.fToken)
        return await this.userService.login(fAccountData.phone_number, userLoginDTO.fToken)
    }

    @Get('users/isUserExist')
    @UsePipes(new ValidationPipe())
    async checkUserExist(@Query('mobile') mobile: string) {
        let user = await this.userService.getOne({ mobile, isActive: true, isBlocked: false });
        return { msg: "User Exist with" }
    }

    @Get('institute/:insId/users')
    @UseGuards(new AuthGuard([ROLES.INSTITUTE_ADMIN, ROLES.ADMIN]))
    async getUsers(@Param('insId') insId: string) {
        return await this.userService.getAll({ instituteId: insId })
    }
    @Patch('institute/:insId/users/:id')
    @UseGuards(new AuthGuard([ROLES.INSTITUTE_ADMIN, ROLES.ADMIN]))
    async updateUsers(@Param('insId') insId: string, @Param('id') id: string, updateUserDto: UpdateUserDTO) {
        return await this.userService.update(id, updateUserDto)
    }

}
