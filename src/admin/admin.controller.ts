import { Controller, Post, UsePipes, Get, UseGuards, Param, Patch, Body } from '@nestjs/common';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { InsertAdminDTO, LoginAdminDTO, UpdateAdminDTO } from "./admin.dto"
import { AdminService } from "./admin.service"
import { AuthGuard } from 'src/shared/auth.gaurd';
import { ROLES } from 'src/shared/constants';

@Controller('admin')
export class AdminController {


    constructor(private readonly adminService: AdminService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    async insert(@Body() insertAdminDTO: InsertAdminDTO) {
        return this.adminService.insert(insertAdminDTO)
    }

    @Post("login")
    @UsePipes(new ValidationPipe())
    async login(@Body() loginAdminDTO: LoginAdminDTO) {
        return this.adminService.login(loginAdminDTO)
    }

    @Get()
    @UseGuards(new AuthGuard([ROLES.ADMIN]))
    async getAll() {
        return this.adminService.getAll();
    }

    @Get(":id")
    @UseGuards(new AuthGuard([ROLES.ADMIN]))
    async getOne(@Param('id') adminId: string) {
        return await this.adminService.getOne({ _id: adminId })
    }

    @Patch(":id")
    @UseGuards(new AuthGuard([ROLES.ADMIN]))
    async updateAdmin(@Param('id') adminId: string, @Body() updateAdminDto: UpdateAdminDTO) {
        return await this.adminService.update(adminId, updateAdminDto)
    }


}
