import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { AppConfigModule } from './config/config.module'
import { UsersModule } from './modules/users/users.module'

@Module({
	imports: [AppConfigModule, PrismaModule, UsersModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
