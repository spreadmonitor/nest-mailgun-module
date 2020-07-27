import { Injectable, Inject } from '@nestjs/common';
import * as Mailgun from 'mailgun-js';

import { InternalModuleInjectionTokens } from '../injection-tokens.enum';
import { BaseEmailTemplate } from '../base-template.class';
import { TemplateService } from './template.service';
import { MailgunModuleOptions } from '../module-options.class';

@Injectable()
export class MailService {
  constructor(
    @Inject(InternalModuleInjectionTokens.MailgunClient)
    private readonly mailgunClient: Mailgun.Mailgun,
    private readonly moduleOptions: MailgunModuleOptions,
    private readonly templateService: TemplateService,
  ) {}

  async send<T extends BaseEmailTemplate>(
    recipient: string,
    template: new () => T,
    locals?: T['templateParametersType'],
  ): Promise<Mailgun.messages.SendResponse> {
    const data: Mailgun.messages.SendData = {
      from: this.moduleOptions.sender,
      to: recipient,
      subject: this.templateService.renderTitle(template, locals),
      html: this.templateService.renderMessage(template, locals),
    };

    return await this.mailgunClient.messages().send(data);
  }
}
