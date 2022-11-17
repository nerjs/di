import { Module } from '../di/decorators/module.decorator'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    UserModule,
    {
      predicate: true,
      module: AuthModule,
    },
  ],
})
export class AppModule {}
