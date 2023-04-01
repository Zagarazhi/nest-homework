import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './profiles.model';
import { User } from 'src/users/users.model';
import { AuthModule } from 'src/auth/auth.module';

// Генарация модуля
// nest generate module profiles
@Module({
    providers: [ProfilesService],
    controllers: [ProfilesController],
    imports: [
        SequelizeModule.forFeature([User, Profile]),
        AuthModule,
    ],
    exports: [
        ProfilesService,
    ],
})
export class ProfilesModule {}
