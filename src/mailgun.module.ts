import { Module, DynamicModule } from '@nestjs/common';
import { MailgunService } from './services/mailgun.service';
import { MailgunModuleOptions } from './module-options.class';

@Module({
  providers: [MailgunService],
})
export class MailgunModule {
  static forRoot(options: MailgunModuleOptions): DynamicModule {
    return {
      module: MailgunModule,
      providers: [
        {
          provide: MailgunModuleOptions,
          useValue: options,
        },
      ],
      exports: [MailgunService],
    };
  }
}
