import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards, Get, Param, Patch } from '@nestjs/common';
import { InstituteUserService } from './institute-user.service';
import { InstituteService } from './institute.service';
import { LoginInstituteDTO, UpdateInstituteDTO, InsertInstituteDTO, InsertInstituteUserDTO, UpdateInstituteUserDTO } from './institute.dto';
import { AuthGuard } from 'src/shared/auth.gaurd';
import { ROLES } from 'src/shared/constants';

@Controller('institute')
export class InstituteController {
    constructor(
        private readonly instituteService: InstituteService, private readonly instituteUserService: InstituteUserService) { }


    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() loginInstituteDTO: LoginInstituteDTO) {
        return await this.instituteUserService.login(loginInstituteDTO)
    }

    @Post('user')
    @UsePipes(new ValidationPipe())
    @UseGuards(new AuthGuard([ROLES.INSTITUTE_ADMIN]))
    async registerInstituteUser(@Body() insertInstituteUserDTO: InsertInstituteUserDTO) {
        // TODO: Attach institute id
        return await this.instituteUserService.insert(insertInstituteUserDTO)
    }

    @Patch('user/:id')
    @UsePipes(new ValidationPipe())
    @UseGuards(new AuthGuard([ROLES.INSTITUTE_ADMIN]))
    async updateInstituteUser(@Param('id') id: string, @Body() updateInstituteUserDTO: UpdateInstituteUserDTO) {
        return await this.instituteUserService.update(id, updateInstituteUserDTO);
    }


    @Post()
    @UsePipes(new ValidationPipe())
    @UseGuards(new AuthGuard([ROLES.ADMIN]))
    async register(@Body() insertInstituteDTO: InsertInstituteDTO) {
        let institute = await this.instituteService.insert(insertInstituteDTO)
        this.instituteUserService.insert({ instituteId: institute._id, ...insertInstituteDTO })
        return institute;
    }

    @Get()
    @UseGuards(new AuthGuard([ROLES.ADMIN]))
    async getAll() {
        return await this.instituteService.getAll();
    }

    @Get(":id")
    @UseGuards(new AuthGuard())
    async getOne(@Param('id') id: string) {
        return await this.instituteService.getOne({ _id: id })
    }

    @Patch(":id")
    @UseGuards(new AuthGuard([ROLES.ADMIN, ROLES.INSTITUTE_ADMIN]))
    async update(@Param('id') id: string, @Body() updateInstituteDto: UpdateInstituteDTO) {
        return await this.instituteService.update(id, updateInstituteDto)
    }



}
