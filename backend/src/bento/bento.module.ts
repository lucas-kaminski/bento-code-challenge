import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BentoService } from './bento.service';

@Module({
  imports: [HttpModule],
  providers: [BentoService],
  exports: [BentoService],
})
export class BentoModule {}
