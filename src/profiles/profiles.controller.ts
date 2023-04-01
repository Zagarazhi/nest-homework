import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfilesService } from './profiles.service';

// Генарация контроллера
// nest generate controller profiles
@Controller('profiles')
export class ProfilesController {

    // Инъекция зависимости
    constructor(private profilesService: ProfilesService) {}

    // Эндпоинты

    @Post()
    @Roles("USER")
    @UseGuards(RolesGuard)
    create(@Body() dto: CreateProfileDto, @Request() req: any) {
        const id = Number(req.user['id']);
        return this.profilesService.createProfile(dto, id);
    }

    @Post("/admin")
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    createByAdmin(@Body() dto: CreateProfileDto) {
        const id = dto.userId;
        return this.profilesService.createProfile(dto, id);
    }

    @Get()
    @Roles("USER")
    @UseGuards(RolesGuard)
    get(@Request() req: any) {
        const id = Number(req.user['id']);
        return this.profilesService.getProfile(id);
    }

    @Get("/:userId")
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    getByAdmin(@Param('userId') userId: number) {
        return this.profilesService.getProfile(userId);
    }

    @Get("/admin/all")
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    getAllByAdmin() {
        return this.profilesService.getAllProfiles();
    }

    @Put()
    @Roles("USER")
    @UseGuards(RolesGuard)
    update(@Body() dto: CreateProfileDto, @Request() req: any) {
        const id = Number(req.user['id']);
        return this.profilesService.updateProfile(dto, id);
    }

    @Put("/admin")
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    updateByAdmin(@Body() dto: CreateProfileDto) {
        const id = dto.userId;
        return this.profilesService.updateProfile(dto, id);
    }

    @Delete()
    @Roles("USER")
    @UseGuards(RolesGuard)
    delete(@Request() req: any) {
        const id = Number(req.user['id']);
        return this.profilesService.deleteProfile(id);
    }

    @Delete("/admin/:userId")
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    deleteByAdmin(@Param('userId') userId: number) {
        return this.profilesService.deleteProfile(userId);
    }
}
