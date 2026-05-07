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
        const databaseUrl = configService.get('DATABASE_URL');

        // Use Postgres if DATABASE_URL is set (production with database)
        if (databaseUrl) {
          const url = new URL(databaseUrl);
          return {
            type: 'postgres',
            host: url.hostname,
            port: parseInt(url.port || '5432', 10),
            username: url.username,
            password: url.password,
            database: url.pathname.slice(1),
            entities: [Unit, Lead, Conversation, StageTransition, AttentionItem, User],
            synchronize: true,
            logging: false,
            ssl: { rejectUnauthorized: false },
            extra: {
              connectionTimeoutMillis: 10000,
            },
          };
        }

        // Fallback: SQLite (works in production and development without external DB)
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
