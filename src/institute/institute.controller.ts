import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards, Get, Param, Patch } from '@nestjs/common';
import { InstituteUserService } from './institute-user.service';
import { InstituteService } from './institute.service';
import { LoginInstituteDTO, UpdateInstituteDTO, InsertInstituteDTO, InsertInstituteUserDTO, UpdateInstituteUserDTO } from './institute.dto';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { ROLES, ID_TYPE } from 'src/shared/constants';
import { CheckAccess, Roles } from 'src/shared/roles.decorator';

@Controller('institute')
export class InstituteController {
    constructor(
        private readonly instituteService: InstituteService, private readonly instituteUserService: InstituteUserService) { }


    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() loginInstituteDTO: LoginInstituteDTO) {
        return await this.instituteUserService.login(loginInstituteDTO)
    }

    @Post(':insId/user')

    @Roles(ROLES.ADMIN, ROLES.INSTITUTE_ADMIN)
    @CheckAccess("params.insId", ID_TYPE.INSTITUTE)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async registerInstituteUser(@Param("insId") insId: string, @Body() insertInstituteUserDTO: InsertInstituteUserDTO) {
        insertInstituteUserDTO.instituteId = insId;
        return await this.instituteUserService.insert(insertInstituteUserDTO)
    }

    @Patch(':insId/user/:id')

    @CheckAccess("params.insId", ID_TYPE.INSTITUTE)
    @Roles(ROLES.ADMIN, ROLES.INSTITUTE_ADMIN)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async updateInstituteUser(@Param("insId") insId: string, @Param('id') id: string, @Body() updateInstituteUserDTO: UpdateInstituteUserDTO) {
        return await this.instituteUserService.update({ _id: id, instituteId: insId }, updateInstituteUserDTO);
    }


    @Post()
    @Roles(ROLES.ADMIN)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async register(@Body() insertInstituteDTO: InsertInstituteDTO) {
        let institute = await this.instituteService.insert(insertInstituteDTO)
        this.instituteUserService.insert({ instituteId: institute._id, ...insertInstituteDTO })
        return institute;
    }

    @Get()
    @Roles(ROLES.ADMIN)
    @UseGuards(AuthGuard)
    async getAll() {
        return await this.instituteService.getAll();
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    async getOne(@Param('id') id: string) {
        // TODO:Remove field that should not be visible
        return await this.instituteService.getOne({ _id: id })
    }

    @Patch(":id")
    @CheckAccess("params.id", ID_TYPE.INSTITUTE)
    @Roles(ROLES.ADMIN, ROLES.INSTITUTE_ADMIN)
    @UseGuards(AuthGuard)
    async update(@Param('id') id: string, @Body() updateInstituteDto: UpdateInstituteDTO) {
        return await this.instituteService.update(id, updateInstituteDto)
    }



}
