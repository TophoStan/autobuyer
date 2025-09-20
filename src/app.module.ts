import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExecuteOrderController } from './execute-order/execute-order.controller';

@Module({
  imports: [],
  controllers: [AppController, ExecuteOrderController],
  providers: [AppService],
})
export class AppModule {}
