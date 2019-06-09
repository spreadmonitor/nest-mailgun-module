import { Injectable, Inject } from '@nestjs/common';
import * as Mailgun from 'mailgun-js';

import { InternalModuleInjectionTokens } from '../injection-tokens.enum';
import { BaseEmailTemplate } from '../base-template.class';
import { TemplateService } from './template.service';

@Injectable()
export class MailService {
  constructor(
    @Inject(InternalModuleInjectionTokens.MailgunClient)
    private readonly mailgunClient: Mailgun.Mailgun,
    private templateService: TemplateService,
  ) {}

  async send<T extends BaseEmailTemplate>(recipient: string, template: new () => T, locals?: T['templateParameters']) {
    const message: string = this.templateService.render(template, locals);

    const data: Mailgun.messages.SendData = {
      from: 'Spreadmonitor <no-reply@spreadmonitor.com>',
      to: recipient,
      subject: undefined,
      html: message,
    };

    return await this.mailgunClient.messages().send(data);
  }
}
