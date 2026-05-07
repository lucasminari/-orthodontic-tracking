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
        const isProduction = configService.get('NODE_ENV') === 'production';

        if (isProduction) {
          return {
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            entities: [Unit, Lead, Conversation, StageTransition, AttentionItem, User],
            synchronize: false,
            logging: false,
          };
        }

        return {
          type: 'sqlite',
          database: configService.get('DB_PATH') || './orthodontic.db',
          entities: [Unit, Lead, Conversation, StageTransition, AttentionItem, User],
          synchronize: true,
          logging: true,
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
