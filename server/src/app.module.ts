import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		PrismaModule,
		UsersModule,
		AuthModule,
		ProjectsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
