import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/users.model';
import { JwtModule } from '@nestjs/jwt';

import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './models/roles.model';
import { RolesRepository } from './roles.repository';

@Module({
	providers: [RolesService, RolesRepository],
	controllers: [RolesController],
	imports: [SequelizeModule.forFeature([Role, User]), JwtModule],
	exports: [RolesService],
})
export class RolesModule {}
