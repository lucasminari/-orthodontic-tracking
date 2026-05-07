import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  Unit,
  Lead,
  Conversation,
  StageTransition,
  AttentionItem,
  User,
} from './database/entities';
import { KommoModule } from './kommo/kommo.module';
import { LeadsModule } from './leads/leads.module';
import { AttentionModule } from './attention/attention.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // Use SQLite in all environments for simpler deployment
        // Data is ephemeral on Railway (lost on each deploy) but no external DB required
        return {
          type: 'sqlite',
          database: configService.get('DB_PATH') || './orthodontic.db',
          entities: [Unit, Lead, Conversation, StageTransition, AttentionItem, User],
          synchronize: true,
          logging: false,
        };
      },
    }),
    TypeOrmModule.forFeature([Unit, Lead, Conversation, StageTransition, AttentionItem, User]),
    AuthModule,
    KommoModule,
    LeadsModule,
    AttentionModule,
    DashboardModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
