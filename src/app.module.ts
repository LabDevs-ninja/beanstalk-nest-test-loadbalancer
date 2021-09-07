import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TerminusModule } from '@nestjs/terminus';
import { HealthcheckController } from './healthcheck/healthcheck.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TerminusModule, HttpModule, ConfigModule.forRoot()],
  controllers: [AppController, HealthcheckController],
  providers: [AppService],
})
export class AppModule {}
