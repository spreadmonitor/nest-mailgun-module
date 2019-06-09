# nest-mailgun-module

[![Build Status](https://travis-ci.com/spreadmonitor/nest-mailgun-module.svg?token=vtTA9yuf6Qfrwwgxq3tZ&branch=master)](https://travis-ci.com/spreadmonitor/nest-mailgun-module)

Re-usable [NestJS](https://github.com/nestjs/nest) module for [Mailgun](https://www.mailgun.com/).

## Installation

```bash
$ npm install @spreadmonitor/nest-mailgun-module
```

## Usage

```ts
import { Module } from '@nestjs/common';
import { MailgunModule } from '@spreadmonitor/nest-mailgun-module';

import * as TEMPLATES from './email-templates';

@Module({
  imports: [
    MailgunModule.forRoot({
      templates: TEMPLATES,
      mailgunApiKey: process.env['MAILGUN_API_KEY'],
      mailgunDomain: process.env['MAILGUN_DOMAIN'],
    }),
  ],
  exports: [MailgunModule],
})
export class CoreModule {}
```

```ts
import { SignupService } from '@app/auth/services';
import { MailService } from '@spreadmonitor/nest-mailgun-module';
import { WelcomeTemplate } from '@app/auth/email-templates';

@Controller('auth')
export class SignupController {
  constructor(private readonly signupService: SignupService, private readonly mailService: MailService) {}

  @Post('signup')
  async createAccount(@Body() payload: SignupPayload): string {
    await this.signupService.createAccount();

    await this.mailService.send(payload.email, WelcomeTemplate, {
      name: payload.name,
    });

    return { message: 'Yay! Account created!' };
  }
}
```

For detailed usage please read the [documentation][docs/readme.md].

## Contact

- Author - [Attila Olah](https://twitter.com/NoNameProvided_)
- Repository - [spreadmonitor/nest-mailgun-module](https://github.com/spreadmonitor/nest-mailgun-module)
