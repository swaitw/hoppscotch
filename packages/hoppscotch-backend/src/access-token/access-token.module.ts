import { Module } from '@nestjs/common';
import { AccessTokenController } from './access-token.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AccessTokenService } from './access-token.service';
import { TeamCollectionModule } from 'src/team-collection/team-collection.module';
import { TeamEnvironmentsModule } from 'src/team-environments/team-environments.module';
import { TeamModule } from 'src/team/team.module';

@Module({
  imports: [
    PrismaModule,
    TeamCollectionModule,
    TeamEnvironmentsModule,
    TeamModule,
  ],
  controllers: [AccessTokenController],
  providers: [AccessTokenService],
  exports: [AccessTokenService],
})
export class AccessTokenModule {}
