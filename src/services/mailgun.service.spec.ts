import { Test, TestingModule } from '@nestjs/testing';

import { MailService } from './mailgun.service';
import { BaseEmailTemplate } from '../base-template.class';
import { InternalModuleInjectionTokens } from '../injection-tokens.enum';
import { TemplateService } from './template.service';
import { MailgunModuleOptions } from '../module-options.class';

describe('MailService', () => {
  let app: TestingModule;
  let sendFnMock = jest.fn();
  let mailgunClientMock = {
    messages: () => ({ send: sendFnMock }),
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [
        {
          provide: MailgunModuleOptions,
          useValue: {
            templates: {},
            mailgunDomain: 'sandboxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.mailgun.org',
            mailgunApiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxx-xxxxxxxx',
          },
        },
        TemplateService,
        MailService,
        {
          provide: InternalModuleInjectionTokens.MailgunClient,
          useValue: mailgunClientMock,
        },
      ],
    }).compile();
  });

  describe('send', () => {
    it('should call Mailgun client with correct properties', async () => {
      const service = app.get(MailService);
      const recipient = 'blackhole@spreadmonitor.com';

      class SimpleEmailTemplate extends BaseEmailTemplate<{ name: string; date: Date }> {
        public title: string = 'Subject';
        public body: string = `
h1 Dear #{name}

div.message-body
  p Your order has been successfully shipped on #{date}.
`;
      }

      await service.send('blackhole@spreadmonitor.com', SimpleEmailTemplate, {
        name: 'John Snow',
        date: new Date('2019-08-21T16:32:42Z'),
      });

      expect(sendFnMock.mock.calls.length).toBe(1);
      expect(sendFnMock.mock.calls[0][0].to).toBe(recipient);
    });
  });
});
