import { Module, DynamicModule } from '@nestjs/common';
import * as Mailgun from 'mailgun-js';

import { MailgunModuleOptions } from './module-options.class';
import { TemplateService, MailService } from './services';
import { InternalModuleInjectionTokens } from './injection-tokens.enum';

@Module({
  providers: [MailService, TemplateService],
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
        {
          provide: InternalModuleInjectionTokens.MailgunClient,
          useValue: Mailgun({
            apiKey: options.mailgunApiKey,
            domain: options.mailgunDomain,
            host: options.mailgunBaseUrl ? options.mailgunBaseUrl : 'api.mailgun.net',
          }),
        },
      ],
      exports: [MailService, TemplateService],
    };
  }
}
