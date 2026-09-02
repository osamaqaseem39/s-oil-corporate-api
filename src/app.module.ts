import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { BlogModule } from './blog/blog.module';
import { CatalogModule } from './catalog/catalog.module';
import { UploadsModule } from './uploads/uploads.module';
import { EnquiriesModule } from './enquiries/enquiries.module';
import { SeedModule } from './seed/seed.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.getOrThrow<string>('MONGODB_URI'),
        family: 4,
        serverSelectionTimeoutMS: 20000,
      }),
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    BlogModule,
    CatalogModule,
    UploadsModule,
    EnquiriesModule,
    SeedModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
